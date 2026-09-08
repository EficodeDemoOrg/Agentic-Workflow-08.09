#!/usr/bin/env bash
# Hook script: blocks any tool call that reads from the exercises/ folder.
# Receives a JSON payload on stdin describing the tool call.
# Outputs a PreToolUse permission denial; exits 0 with no output to allow.
#
# Intentionally searches the entire raw payload rather than a specific field so
# that it works across different hook payload shapes (Claude sends tool_input,
# Copilot sends input, etc.).

set -euo pipefail

input=$(cat)

# Block if any argument in the payload references the exercises/Stage Two directory.
if echo "$input" | grep -qiE 'exercises/Stage Two/'; then
    echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Access to the exercises/Stage Two/ folder is restricted. Agents are not allowed to read files from this directory."}}'
    exit 0
fi

# Allow the tool call.
exit 0
