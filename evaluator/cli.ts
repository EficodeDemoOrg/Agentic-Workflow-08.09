#!/usr/bin/env node
import { Command, Argument } from "commander";
import { glob } from "glob";
import fs from "node:fs";
import path from "node:path";
import { evaluateAgentDefinition, evaluateSkillDefinition } from "./evaluate.js";
import { generateBadgeSvg, type BadgeEntry } from "./badge.js";

const program = new Command();

function normalizeExplicitFiles(files: string[]) {
    return files
        .flatMap((entry) => entry.split(","))
        .map((entry) => entry.trim())
        .filter(Boolean);
}

function resolveExplicitPath(inputPath: string) {
    const candidates = new Set<string>();
    const raw = inputPath.trim();
    candidates.add(raw);

    const normalized = raw.replace(/\\/g, "/");
    const aliasPatterns = [
        normalized.replace(/(^|\/)agents\//, "$1.agents/"),
        normalized.replace(/(^|\/)github\//, "$1.github/"),
        normalized.replace(/(^|\/)agents$/, "$1.agents"),
        normalized.replace(/(^|\/)github$/, "$1.github"),
    ];

    for (const candidate of aliasPatterns) {
        if (candidate) {
            candidates.add(candidate);
        }
    }

    return [...candidates];
}

async function validateExplicitInputs(files: string[], options: { json: boolean }) {
    const agentFiles: string[] = [];
    const skillDirectories: string[] = [];
    const invalidEntries: string[] = [];
    const normalizedFiles = normalizeExplicitFiles(files);

    for (const file of normalizedFiles) {
        const pathCandidates = resolveExplicitPath(file);
        const resolvedPath = pathCandidates
            .map((candidate) => path.resolve(candidate))
            .find((candidate) => fs.existsSync(candidate)) ?? path.resolve(file);

        if (!options.json) {
            console.log("Processing file:", file);
        }

        if (resolvedPath.endsWith(".agent.md")) {
            if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
                invalidEntries.push(file);
                continue;
            }

            agentFiles.push(resolvedPath);
        } else if (fs.existsSync(resolvedPath) && fs.lstatSync(resolvedPath).isDirectory()) {
            const skillFile = path.join(resolvedPath, "SKILL.md");
            if (!fs.existsSync(skillFile) || !fs.statSync(skillFile).isFile()) {
                invalidEntries.push(file);
                continue;
            }

            skillDirectories.push(resolvedPath);
        } else {
            invalidEntries.push(file);
        }
    }

    if (invalidEntries.length > 0) {
        throw new Error(`Invalid evaluation inputs: ${invalidEntries.join(", ")}`);
    }

    if (agentFiles.length === 0 && skillDirectories.length === 0) {
        throw new Error("No valid agent files or skill directories were provided.");
    }

    return { agentFiles, skillDirectories };
}

async function runEvaluationForFiles(agentFiles: string[], skillDirectories: string[], directory: string, options: { json: boolean }) {
    const evaluationRuns: Promise<{ fileName: string; score: number; reasoning: string }>[] = [];

    for (const agentFile of agentFiles) {
        if (!options.json) {
            console.log("Found agent file:", agentFile);
        }
        // Get the content of the agent file
        const content = await fs.promises.readFile(agentFile, "utf-8");
        const evaluation = evaluateAgentDefinition(content);
        evaluationRuns.push(
            (async () => {
                const e = await evaluation;
                return {
                    fileName: path.posix.relative(directory, agentFile),
                    score: e.score,
                    reasoning: e.reasoning,
                }
            })()
        );
    }

    for (const skillDirectory of skillDirectories) {
        if (!options.json) {
            console.log("Found skill directory:", skillDirectory);
        }

        // Get the SKILL.md file at root of the skill directory. If it doesn't exist, skip this directory
        const skillFile = path.posix.join(skillDirectory, "SKILL.md");
        let skillContent = "";
        if (fs.existsSync(skillFile)) {
            skillContent = await fs.promises.readFile(skillFile, "utf-8");
        } else {
            const message = `SKILL.md not found in skill directory: ${skillDirectory}`;
            if (options.json) {
                console.error(message);
            } else {
                console.log(message);
            }
            continue;
        }
        // Get all files in the skill directory. We need an array of objects with the relative path and content for each item.
        // Ignore the SKILL.md file itself when collecting all other files in the skill directory
        const skillFiles = await glob([path.posix.join(skillDirectory, "**/*")], { mark: true });
        const skillFileContents = [];
        for (const skillFile of skillFiles) {
            if (fs.existsSync(skillFile) && fs.statSync(skillFile).isFile() && path.posix.basename(skillFile) !== "SKILL.md") {
                const content = await fs.promises.readFile(skillFile, "utf-8");
                skillFileContents.push({ path: path.posix.relative(skillDirectory, skillFile), content });
            }
        }

        const evaluation = evaluateSkillDefinition(skillContent, skillFileContents);

        evaluationRuns.push((async () => {
            const e = await evaluation;
            return {
                fileName: path.posix.relative(directory, skillFile),
                score: e.score,
                reasoning: e.reasoning
            }
        })()
        );
    }

    const results = await Promise.allSettled(evaluationRuns);
    for (const result of results) {
        if (result.status === "fulfilled") {
            if (options.json) {
                console.log(JSON.stringify(result.value));
            } else {
                console.log(result.value);
            }
        } else {
            console.error("Error evaluating definition:", result.reason);
        }
    }
}

program
    .name("agent-eval")
    .description("CLI for the agent-token-usage evaluation tools");

program
    .command("hello")
    .description("Print a greeting")
    .action(() => {
        console.log("Hello world");
    });

program
    .command("evaluate")
    .description("Run the evaluation")
    .option("-f, --files [files...]", "Files to evaluate")
    .option("-d, --directory [directory]", "Directory to search from")
    .option("--json", "Output results as newline-delimited JSON")
    .action(async (options) => {
        const files = options.files || [];

        if (files.length === 0) {
            // Search for files matching a certain pattern
            if (!options.json) {
                console.log("No files specified, searching for files matching the pattern...");
            }

            const directory = path.resolve(options.directory || ".");
            if (!options.json) {
                console.log(`Directory full path: ${directory}`);
            }

            const agent_patterns: string[] = [
                path.posix.join(directory, ".github/agents/*.agent.md"),
                path.posix.join(directory, ".agents/agents/*.agent.md")
            ];

            const skill_patterns: string[] = [
                path.posix.join(directory, ".agents/skills/*/"),
                path.posix.join(directory, ".github/skills/*/"),
                path.posix.join(directory, ".agents/skills/*/")
            ];
            // Here you would implement the actual file search logic, e.g., using glob or fs modules
            const agentFiles = await glob(agent_patterns);
            const skillDirectories = await glob(skill_patterns, { mark: true });

            await runEvaluationForFiles(agentFiles, skillDirectories, directory, options);

        } else {

            // all files in the specified list ending with ".agent.md" will be considered agent files
            // all "files" that are directories will be considered skill directories
            // if specified agent files does not exist -> throw an error and not proceed with evaluation
            // if a directory does not exist or does not contain any skill files -> throw an error and not proceed with evaluation
            // if any of the provided files do not meet the expected criteria -> throw an error and not proceed with evaluation

            const { agentFiles, skillDirectories } = await validateExplicitInputs(files, options);

            await runEvaluationForFiles(agentFiles, skillDirectories, path.resolve("."), options);
        }
    });

program
    .command("badge")
    .description("Generate an SVG evaluation badge from a JSONL results file")
    .option("-i, --input <file>", "Path to the JSONL results file", "eval_results.jsonl")
    .option("-o, --output <file>", "Path to write the SVG badge", "../eval-badge.svg")
    .option("-d, --date <date>", "Run date to display (default: today)")
    .action(async (options) => {
        const inputPath = path.resolve(options.input);
        if (!fs.existsSync(inputPath)) {
            console.error(`Input file not found: ${inputPath}`);
            process.exit(1);
        }

        const lines = fs.readFileSync(inputPath, "utf-8").split("\n").filter(Boolean);
        const entries: BadgeEntry[] = [];

        for (const line of lines) {
            try {
                const obj = JSON.parse(line);
                if (obj.fileName && typeof obj.score === "number" && typeof obj.reasoning === "string") {
                    entries.push({ fileName: obj.fileName, score: obj.score, reasoning: obj.reasoning });
                }
            } catch {
                // skip malformed lines
            }
        }

        if (entries.length === 0) {
            console.error("No valid evaluation entries found in input file.");
            process.exit(1);
        }

        const svg = generateBadgeSvg(entries, options.date);
        const outputPath = path.resolve(options.output);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, svg, "utf-8");
        console.log(`Badge written to: ${outputPath} (${entries.length} entries)`);
    });

program.parse();
