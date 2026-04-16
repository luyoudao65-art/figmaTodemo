---
name: figma-react-screen
description: Implement or update a Figma screen in this project as a polished React + TypeScript demo screen with close visual fidelity, reusable subcomponents, editable content structure, and lightweight frontend-only interactions. Use for screen-building workflow and repo conventions, not for Code Connect mappings.
---

# When To Use

Use this skill when the task is to add or modify a Figma-derived page, section, or interactive flow in this repository.

# Project Context

- This repo is a mobile-style demo app built with React, TypeScript, and Vite.
- The product goal is a convincing interactive demo, not backend completion.
- Visual fidelity matters as much as code quality.
- The current shared styling source is `src/styles.css`.
- The preferred direction for future styling is Tailwind CSS, but only through deliberate migration rather than ad hoc mixing.
- This skill defines the implementation workflow. It is not the place for Code Connect mappings.

# Use This Skill For

- implementing a new Figma frame as a React screen
- refining an existing screen to better match a Figma frame
- wiring demo navigation and lightweight mocked interactions
- extracting reusable page parts or editable demo content structures

# Do Not Use This Skill For

- creating `*.figma.js` or `*.figma.tsx` mapping files for design system components
- documenting one-off page markup as if it were a reusable component contract
- inventing backend contracts, persisted data models, or server flows

# Workflow

1. Get the exact Figma frame context and screenshot.
2. Identify whether the task is page implementation, reusable subcomponent extraction, or editable content templating.
3. Identify repeated patterns already present in `src/pages/` and `src/styles.css`.
4. Implement the screen with React + TypeScript.
5. Keep app-level navigation in `src/App.tsx` unless a router is explicitly introduced.
6. Extract reusable subcomponents when the pattern is obvious and stable.
7. If content may change between scenarios such as basketball, food, sleep, or plan variants, move the editable values into a data/template structure rather than hardcoding new JSX branches.
8. Use lightweight local state for believable interactions.
9. Add short `TODO` comments where backend or product logic is intentionally deferred.
10. Run `npm run build`.

# Implementation Rules

- Match layout, spacing, corner radius, visual layering, and typography closely.
- Preserve the same taste as Figma, not just the same information.
- Use realistic mock content from the design.
- Default to subtle motion rather than a fully static page. Prefer:
  - a staged entry sequence for major hero or card elements when the screen first appears
  - low-amplitude ambient motion after settle such as soft breathing, slow drift, mild shadow or background shifts, or gentle icon/pulse movement
  - durations that are readable and calm rather than flashy or abrupt
  - animations that support demo quality without competing with the content
- Keep motion tasteful and restrained. Avoid constant busy movement, fast looping effects, or motion that makes the UI feel game-like unless the design clearly calls for it.
- Add motion in reusable CSS patterns when possible so future screens can inherit the same demo polish instead of re-inventing one-off animations.
- Do not introduce backend endpoints or fake architecture.
- Avoid over-abstraction for one-off parts of a screen.
- If a screen is driven by an existing component, adapt that component instead of duplicating it.
- Keep the current demo logic working while refactoring structure.
- Prefer separating:
  - screen flow and state
  - reusable UI pieces
  - editable scenario content
- If a pattern appears in more than one screen, prefer a shared component.
- If only the content changes, prefer a typed data object instead of duplicate page components.

# Suggested Repo Direction

When the code starts repeating, move toward a structure like:

- `src/pages/` for screen containers
- `src/components/` for shared visual building blocks
- `src/content/` or `src/templates/` for scenario-driven content such as goals, plans, and copy
- `src/types/` for shared data types

Do this incrementally. Do not rewrite the app structure unless the active task benefits from it.

# Validation Checklist

Before finishing:

- target Figma frame and screenshot were checked
- the result still matches the current interaction flow
- repeated patterns were reused or extracted where clearly beneficial
- editable scenario content was not unnecessarily buried in JSX
- mocked logic is believable and marked with short `TODO` comments where needed
- `npm run build` passes

# Quality Bar

The result should feel good in a demo recording:

- transitions and state changes feel intentional
- major surfaces do not feel lifeless after load; there is a light sense of breathing or ambient motion where appropriate
- inactive and active nav states are visually clear
- no obviously placeholder-looking content
- the page still looks coherent on the target mobile frame
