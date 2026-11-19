# Using FullStack Fieldbook with Different AI Coding Editors

**Status:** Tool-agnostic AI handoff is approved (DEC-23). D0/D1 signoff is still pending. **Application coding (D2) is not authorized.**

## One project, one set of requirements

- **Canonical agent policy:** `AGENTS.md`.
- **Agreed decisions:** `DECISIONS.md` (currently DEC-01–DEC-17, DEC-21 and DEC-23 agreed).
- **Signoff status:** `docs/product/OPEN_DECISIONS_FOR_SIGNOFF.md`.
- **Read-only initial task:** `prompts/00_UNIVERSAL_AI_AGENT_HANDOFF.md`.
- **Future task prompts:** `prompts/01_D2_APP_FOUNDATION.md` and `prompts/02_D3_WEEK1_PILOT.md` — **use only after their stated approval gates**.
- **No independent policy forks:** tool-specific adapter files merely point to the canonical policy. Do not copy large policy sections into each adapter; this prevents contradictory instructions after updates.

## Tool startup (verify current support in your installed version)

| Editor / agent | Where to start | Project instruction entry point |
|---|---|---|
| **OpenAI Codex** | Open repository workspace; paste universal first prompt | `AGENTS.md` |
| **Cursor** | Open repository root; paste universal first prompt in Agent mode | `AGENTS.md`; `.cursor/rules` optional later |
| **Claude Code** | Start from repository root; paste universal first prompt | `CLAUDE.md` adapter → explicitly follow `AGENTS.md` |
| **GitHub Copilot** | Open repository; paste universal first prompt in a capable agent/chat surface | `.github/copilot-instructions.md` and/or `AGENTS.md` |
| **Gemini CLI** | Start from repository root; paste universal first prompt | `GEMINI.md` adapter → explicitly follow `AGENTS.md` |
| **Other assistant** | Attach/paste the spec files as needed; paste universal first prompt | Explicitly open `AGENTS.md`, `DECISIONS.md`, signoff file |

Feature availability, automatic context loading and filesystem permissions vary by tool and version. **Never assume that the agent read a file just because its name was mentioned**; ask the agent to report which paths it actually opened.

## Minimal first session

1. Open `fullstack-fieldbook/` as the coding-agent workspace.
2. Verify `DECISIONS.md` reflects the latest approvals (especially DEC-21 and DEC-23).
3. Verify that the separate private source folder is available *only if needed* for the source audit. Local agents may read sibling folders after permission; cloud agents may require explicit attachment or approved private workspaces.
4. Paste **all** of `prompts/00_UNIVERSAL_AI_AGENT_HANDOFF.md` into the agent task box.
5. Review its **read-only** findings. It should list what it actually inspected and what it could not access; it must not create or modify files.
6. Do **not** paste a future D2/D3 implementation prompt until the corresponding signoff and explicit authorization exist.

## Source confidentiality

Instructor PDFs, private answer keys and reference archives stay outside public application assets and should not be uploaded to an AI cloud provider without your deliberate approval of that provider's data practices. Even an agent with access to local code may not have access to the separate sibling source folder. Report missing sources rather than inventing their content.

## If you switch editors mid-project

1. Commit only approved, reviewable changes to the private Git repository.
2. Open the same repository in the new editor.
3. Re-run the universal first-read/hand-off (or a tailored read-only status review) and explicitly check current `DECISIONS.md`, signoff status and `ROADMAP.md`.
4. Request a summary of current completed stages, real test evidence, and open gates **before** allowing changes.
5. Do not assume the new editor remembers prior chat history or has automatically inherited filesystem/cloud permissions.

## Original documentation for instruction-file formats

- Codex: https://learn.chatgpt.com/docs/agent-configuration/agents-md
- Cursor: https://cursor.com/docs/rules
- Claude Code: https://support.claude.com/en/articles/14553240-give-claude-context-claude-md-and-better-prompts
- GitHub Copilot: https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide
- Gemini CLI: https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html
