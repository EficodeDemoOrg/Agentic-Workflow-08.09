import type { EvaluationResult } from "./evaluate.js";

export type BadgeEntry = EvaluationResult & { fileName: string };

function scoreColor(score: number): string {
    if (score <= 4) return "#e05252";      // red
    if (score <= 6) return "#e09a25";      // amber
    if (score <= 8) return "#2b9e7a";      // teal-green
    return "#2ec97a";                       // bright green
}

function scoreEmoji(score: number): string {
    if (score <= 4) return "●";
    if (score <= 6) return "●";
    if (score <= 8) return "●";
    return "●";
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function truncate(str: string, max: number): string {
    return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export function generateBadgeSvg(entries: BadgeEntry[], runDate?: string): string {
    const WIDTH = 620;
    const HEADER_H = 56;
    const ROW_H = 38;
    const FOOTER_H = 48;
    const PADDING_X = 20;
    const BAR_COL_X = 320;
    const BAR_WIDTH = 190;
    const LABEL_COL_X = 520;

    const date = runDate ?? new Date().toISOString().slice(0, 10);
    const avgScore = entries.length > 0
        ? entries.reduce((s, e) => s + e.score, 0) / entries.length
        : 0;
    const avgRounded = Math.round(avgScore * 10) / 10;
    const totalH = HEADER_H + entries.length * ROW_H + FOOTER_H;

    const rows = entries.map((entry, i) => {
        const y = HEADER_H + i * ROW_H;
        const rowBg = i % 2 === 0 ? "#1e2433" : "#232a3a";
        const color = scoreColor(entry.score);
        const barFill = Math.round((entry.score / 10) * BAR_WIDTH);
        const label = `${entry.score}/10`;
        const name = truncate(entry.fileName, 38);
        const textY = y + ROW_H / 2 + 5;

        return `
  <!-- row ${i} -->
  <rect x="0" y="${y}" width="${WIDTH}" height="${ROW_H}" fill="${rowBg}" />
  <!-- name -->
  <text x="${PADDING_X}" y="${textY}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="12" fill="#c9d1d9">${escapeXml(name)}</text>
  <!-- bar bg -->
  <rect x="${BAR_COL_X}" y="${y + 10}" width="${BAR_WIDTH}" height="${ROW_H - 20}" rx="4" fill="#0d1117" />
  <!-- bar fill -->
  <rect x="${BAR_COL_X}" y="${y + 10}" width="${barFill}" height="${ROW_H - 20}" rx="4" fill="${color}" opacity="0.85" />
  <!-- score label -->
  <text x="${LABEL_COL_X}" y="${textY}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="13" font-weight="bold" fill="${color}" text-anchor="middle">${label}</text>`;
    });

    const avgColor = scoreColor(avgRounded);
    const avgBarFill = Math.round((avgRounded / 10) * BAR_WIDTH);
    const footerY = HEADER_H + entries.length * ROW_H;
    const footerTextY = footerY + FOOTER_H / 2 + 5;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${totalH}" role="img" aria-label="Agent &amp; Skill Evaluation Results">
  <title>Agent &amp; Skill Evaluation Results — ${escapeXml(date)}</title>
  <defs>
    <linearGradient id="headerGrad" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#1a2236"/>
      <stop offset="100%" stop-color="#0d1117"/>
    </linearGradient>
    <clipPath id="rounded">
      <rect width="${WIDTH}" height="${totalH}" rx="10"/>
    </clipPath>
  </defs>

  <!-- outer rounded clip -->
  <g clip-path="url(#rounded)">

  <!-- header -->
  <rect x="0" y="0" width="${WIDTH}" height="${HEADER_H}" fill="url(#headerGrad)" />
  <text x="${PADDING_X}" y="24" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" font-size="15" font-weight="600" fill="#f0f6fc">Agent &amp; Skill Evaluation</text>
  <text x="${PADDING_X}" y="42" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" font-size="11" fill="#8b949e">${escapeXml(date)}</text>

  <!-- column headers -->
  <text x="${BAR_COL_X}" y="42" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" font-size="10" fill="#8b949e">SCORE</text>
  <text x="${LABEL_COL_X}" y="42" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" font-size="10" fill="#8b949e" text-anchor="middle">RATING</text>

${rows.join("\n")}

  <!-- footer / average -->
  <rect x="0" y="${footerY}" width="${WIDTH}" height="${FOOTER_H}" fill="#161b22" />
  <line x1="0" y1="${footerY}" x2="${WIDTH}" y2="${footerY}" stroke="#30363d" stroke-width="1"/>
  <text x="${PADDING_X}" y="${footerTextY}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" font-size="13" font-weight="600" fill="#f0f6fc">Average (${entries.length} item${entries.length !== 1 ? "s" : ""})</text>
  <!-- avg bar bg -->
  <rect x="${BAR_COL_X}" y="${footerY + 12}" width="${BAR_WIDTH}" height="${FOOTER_H - 24}" rx="4" fill="#0d1117" />
  <!-- avg bar fill -->
  <rect x="${BAR_COL_X}" y="${footerY + 12}" width="${avgBarFill}" height="${FOOTER_H - 24}" rx="4" fill="${avgColor}" opacity="0.9" />
  <!-- avg label -->
  <text x="${LABEL_COL_X}" y="${footerTextY}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="14" font-weight="bold" fill="${avgColor}" text-anchor="middle">${avgRounded}/10</text>

  </g>

  <!-- border -->
  <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${totalH - 1}" rx="9.5" fill="none" stroke="#30363d" stroke-width="1"/>
</svg>`;
}
