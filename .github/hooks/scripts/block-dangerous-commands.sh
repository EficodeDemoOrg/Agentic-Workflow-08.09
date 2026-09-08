#!/usr/bin/env bash
# Hook script: blocks Bash tool calls that match well-known dangerous command
# patterns (destructive deletes, force pushes, piped remote execution, disk
# overwrites, safety-check bypasses, fork bombs, etc.).
#
# Receives a JSON payload on stdin describing the tool call.
# Outputs a PreToolUse permission denial; exits 0 with no output to allow.
#
# Intentionally searches the entire raw payload rather than a specific field so
# that it works across different hook payload shapes (Claude sends tool_input,
# Copilot sends input, etc.).

set -euo pipefail

input=$(cat)

deny() {
    local reason=$1
    printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked dangerous command: %s"}}' "$reason"
    exit 0
}

# Recursive delete of root, home, or a filesystem root wildcard.
if echo "$input" | grep -qE 'rm[[:space:]]+(-[a-zA-Z]*[rRfF][a-zA-Z]*[[:space:]]+)+(-[a-zA-Z]+[[:space:]]+)*(/|~|\$HOME|/\*|\.\*)([[:space:]]|"|$)'; then
    deny "recursive delete of root/home/filesystem"
fi

# Force push (short or long flag).
if echo "$input" | grep -qE 'git[[:space:]]+push[[:space:]].*(-{1,2}force|-f([[:space:]]|$))'; then
    deny "git push --force"
fi

# Bypassing commit/push safety checks.
if echo "$input" | grep -qE 'git[[:space:]]+(commit|push)[[:space:]].*--no-verify'; then
    deny "git --no-verify bypass"
fi

# Piping remote content straight into a shell.
if echo "$input" | grep -qE '(curl|wget)[[:space:]][^|]*\|[[:space:]]*(sudo[[:space:]]+)?(bash|sh|zsh|ksh)([^a-zA-Z0-9_]|$)'; then
    deny "curl|wget piped into a shell"
fi

# Writing directly to a raw block device.
if echo "$input" | grep -qE 'dd[[:space:]]+.*of=/dev/(sd[a-z]|nvme|disk|hd[a-z])'; then
    deny "dd to raw block device"
fi

# Formatting a filesystem.
if echo "$input" | grep -qE '(^|[^a-zA-Z0-9_])mkfs(\.[a-z0-9]+)?[[:space:]]'; then
    deny "mkfs filesystem format"
fi

# Classic fork bomb.
if echo "$input" | grep -qE ':\(\)[[:space:]]*\{[[:space:]]*:\|:&[[:space:]]*\};:'; then
    deny "fork bomb"
fi

# World-writable recursive chmod.
if echo "$input" | grep -qE 'chmod[[:space:]]+-R[[:space:]]+777'; then
    deny "chmod -R 777"
fi

# Allow the tool call.
exit 0
