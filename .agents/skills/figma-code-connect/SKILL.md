---
name: figma-code-connect
description: Create or update Code Connect mappings for stable reusable React components in this repo. Use for component mapping, prop mapping, and reusable translation from Figma design system components to code. Do not use for one-off page implementation.
---

# When To Use

Use this skill when the task is to connect a reusable Figma component or component set to a real reusable React component in this repository.

Typical triggers:

- create a `.figma.tsx` or `.figma.js` file
- map a Figma component to code
- add prop mapping for variants or component properties
- document a reusable component for Code Connect

# Do Not Use This Skill For

- implementing a screen from Figma
- translating one-off page markup into code
- documenting unstable or temporary demo sections
- creating mappings for files in `src/pages/`

Use `figma-react-screen` for those tasks instead.

# Repo Conventions

- Only map components that have a stable reusable counterpart in code.
- Prefer mapping components from `src/components/` once that directory exists and stabilizes.
- Do not create Code Connect files beside page containers in `src/pages/`.
- Keep mappings truthful to the real component API. Do not invent props just to match Figma.
- If the component API is still changing rapidly, postpone the mapping.

# Suggested File Placement

Prefer colocated mappings next to the component they describe, such as:

- `src/components/Button/Button.figma.tsx`
- `src/components/GoalCard/GoalCard.figma.tsx`

If the repo later adopts a different convention, follow the established pattern consistently.

# Workflow

1. Confirm the target Figma node is a reusable component or component set, not a one-off screen.
2. Confirm the codebase has a real reusable React component worth mapping.
3. Inspect the component props and existing usage.
4. Map only the props, variants, and slots that actually exist in code.
5. Keep the template small and maintainable.
6. If key Figma properties cannot map cleanly, document the limitation instead of faking coverage.

# Mapping Rules

- Prefer React + TypeScript mappings for this repo.
- Map variant properties, boolean toggles, text props, and child slots only when they correspond to real props.
- Avoid page-level layout assumptions inside a component mapping.
- Avoid hardcoding demo-only content into Code Connect templates.
- Keep Code Connect focused on reusable translation from design system to code.

# Validation Checklist

Before finishing:

- the mapped node is a reusable Figma component
- the mapped code target is a reusable React component
- prop mappings reflect the real code API
- the mapping does not encode one-off page structure
- any unsupported properties are noted instead of being faked
