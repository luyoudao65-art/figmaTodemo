---
name: figma-react-screen
description: Implement or update a Figma screen in this project as a polished React + TypeScript demo screen with close visual fidelity, reusable subcomponents, and lightweight frontend-only interactions.
---

# When To Use

Use this skill when the task is to add or modify a Figma-derived page, section, or interactive flow in this repository.

# Project Context

- This repo is a mobile-style demo app built with React, TypeScript, and Vite.
- The product goal is a convincing interactive demo, not backend completion.
- Visual fidelity matters as much as code quality.
- The current shared styling source is `src/styles.css`.
- The preferred direction for future styling is Tailwind CSS, but only through deliberate migration rather than ad hoc mixing.

# Workflow

1. Get the exact Figma frame context and screenshot.
2. Identify repeated patterns already present in `src/pages/` and `src/styles.css`.
3. Implement the screen with React + TypeScript.
4. Keep app-level navigation in `src/App.tsx` unless a router is explicitly introduced.
5. Extract reusable subcomponents when the pattern is obvious and stable.
6. Use lightweight local state for believable interactions.
7. Add short `TODO` comments where backend or product logic is intentionally deferred.
8. Run `npm run build`.

# Implementation Rules

- Match layout, spacing, corner radius, visual layering, and typography closely.
- Preserve the same taste as Figma, not just the same information.
- Use realistic mock content from the design.
- Do not introduce backend endpoints or fake architecture.
- Avoid over-abstraction for one-off parts of a screen.
- If a screen is driven by an existing component, adapt that component instead of duplicating it.

# Quality Bar

The result should feel good in a demo recording:

- transitions and state changes feel intentional
- inactive and active nav states are visually clear
- no obviously placeholder-looking content
- the page still looks coherent on the target mobile frame
