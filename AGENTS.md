# Project Overview

This repository is a Figma-to-demo frontend project.

The goal is to turn the Figma demo into a polished, interactive React + TypeScript application that feels presentation-ready, not just technically correct.

Current stack:

- React 18
- TypeScript
- Vite
- Global CSS in `src/styles.css`

# Core Product Goal

Every change should move the project toward a high-quality demo that:

- matches Figma closely in spacing, layout, hierarchy, color, and motion feel
- preserves the same taste and visual identity as the designs
- behaves like a believable app, even if some flows are mocked
- is easy to extend as more Figma screens are added

Do not optimize for generic app structure if it weakens visual fidelity.

# Working Rules

- Build with React + TypeScript only unless the user explicitly changes stack direction.
- Prefer Tailwind CSS for new implementation work, but do not do a partial migration.
- If Tailwind is introduced, do it intentionally and consistently across the active surface area rather than mixing random utility classes into old patterns.
- Keep reusable UI primitives and repeated Figma patterns extractable.
- Do not invent backend APIs, persistence, auth, or data models beyond what is needed for a convincing frontend demo.
- If behavior is implied but not fully defined by the design, implement a lightweight frontend interaction and leave a short `TODO` where real product logic would attach.
- Preserve demo momentum: prefer believable mocked state over empty placeholders.

# Figma Implementation Workflow

Use this repo's Figma guidance in two distinct lanes:

- `SKILL.md` files define workflow, repo conventions, implementation standards, and validation.
- Code Connect files such as `*.figma.tsx` or `*.figma.js` should only be introduced for stable reusable components that need design-to-code mapping.

Do not mix those responsibilities.

For every new screen or component derived from Figma:

1. Fetch both design context and screenshot for the exact node.
2. Identify repeated patterns before writing code.
3. Decide whether the task is:
   - screen implementation or interaction work, which belongs in React code guided by local skills
   - component mapping work, which belongs in Code Connect files only if the component is reusable and stable
4. Reuse existing project pieces where possible.
5. Match the Figma composition first, then refactor into subcomponents once parity is established.
6. Validate the result visually against the screenshot before finishing.

Treat raw Figma-generated React/Tailwind as a design reference, not as final code.

# Code Connect Boundary

Only create or update Code Connect mappings when all of the following are true:

- the Figma node represents a reusable component or component set
- the codebase has a real reusable counterpart worth mapping
- the mapping will help future implementation rather than document one-off page markup

Do not create Code Connect mappings for:

- one-off screens
- temporary demo-specific page sections
- unstable markup that is still changing rapidly
- speculative components that do not exist yet

# Visual Standards

- Favor crisp hierarchy and intentional spacing over dense UI.
- Maintain rounded corners, soft surfaces, layered gradients, and gentle shadows when present in Figma.
- Keep typography expressive and close to the design's proportions.
- Avoid default-looking UI decisions that flatten the design language.
- Preserve mobile-first layout behavior for phone-sized frames.
- Keep the app demo-friendly: transitions, tab changes, and state switches should feel coherent even when simplified.

# Styling Guidance

Until the project is deliberately restructured, follow these rules:

- Keep shared tokens in `:root` CSS variables.
- Keep page-level and reusable styles in `src/styles.css` unless a larger styling system is introduced.
- Do not scatter magic numbers without a reason; if a value repeats, extract it into a variable or reusable class pattern.
- When introducing Tailwind later, map current tokens and visual scales first so the app keeps the same taste.

# Code Organization

- `src/App.tsx` should stay thin and focus on app-level screen switching or routing.
- `src/pages/` holds screen-level React components.
- move reusable Figma patterns toward `src/components/` when they stabilize across screens
- move scenario content or editable demo copy toward data/template files once repetition appears
- Extract shared pieces when they are used by more than one screen or clearly represent a stable UI pattern.
- Prefer clear prop-driven components over deeply nested one-off markup.

# Demo Logic

- Lightweight local state is preferred for demo flows.
- Screen-to-screen navigation can be in-app state or router-based depending on project size.
- Use realistic mock content from the design instead of lorem ipsum.
- If a feature is not fully specified, implement the smallest interaction that makes the demo feel alive.

# Verification

Before finishing changes:

- run `npm run build`
- check that the target interaction path works
- verify mobile-sized layout does not break

# Avoid

- Do not add backend code unless explicitly requested.
- Do not add large dependencies just to reproduce a small visual effect.
- Do not replace the design language with generic component-library defaults.
- Do not over-abstract early when only one screen exists.
- Do not drift away from the Figma tone in the name of engineering neatness.
