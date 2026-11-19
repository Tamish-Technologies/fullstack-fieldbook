# Using Original Phase 1 Source Materials Safely

This directory contains **instructions only**. The original teacher PDFs, source Markdown, and code ZIPs are in the separate download `FullStack_Fieldbook_Private_Source_Materials.zip`.

## Recommended local arrangement

```
workspace/
  fullstack-fieldbook/                 ← extract planning handoff here; future app repo
    AGENTS.md
    README.md
    docs/...
    prompts/...
  fullstack-fieldbook-source-materials/       ← extract the private source ZIP here
    README.md
    phase1/
      week-01/
        instructor-guide.pdf
        instructor-guide-source.md
        code-starter-and-reference.zip
      ...
      week-12/
        instructor-guide.pdf
        instructor-guide-source.md
        code-starter-and-reference.zip
    manifest.sha256
```

Original Phase 1 material remains **input/reference**, not a public lesson bundle. Source Markdown is meant for reading and extracting exact chapter content; compare it against PDF when something differs. The code ZIPs include the specific week's starter and instructor solution, and project structures vary between weeks—inspect rather than assuming a uniform layout.

## Why keep sources separate?

- Public repo may later be published, and raw instructor answer keys should not accidentally be exposed or shipped in the static app.
- Source PDF/code ZIP archives are not app runtime assets.
- A coding agent can read the private source workspace **only if its local/cloud environment has access**; explicit access does not make those files safe to commit or include in a public build.
- Before open-sourcing, review any third-party assets/dependencies and decide publication rights.

If you want a single **private** repository while developing, put sources under `reference-materials/phase1/` and ensure future build tooling never copies them into `public/` or `dist/`. Before making the repository public, audit/remove private source files and commit history as appropriate.

## Source handling policy

Never replace an actual guide/code example with a confident guess. When files are missing, report the exact missing week. Do not invent a source reference. Approved student-facing explanations and demonstrations belong in versioned content files created during D3–D8, with source citations to the private original.
