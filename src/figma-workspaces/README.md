## Figma Workspaces

This folder is for isolated Figma-to-React implementations.

Use it when a new Figma flow should keep the project's visual system and workflow, but should not depend on the current screen code in `src/pages/` or `src/components/`.

### Rules

- Reuse shared theme tokens and global shell styles from `src/styles.css`.
- Follow the repo workflow in `.agents/skills/figma-react-screen/SKILL.md`.
- Do not import implementation code from the current demo screens unless a pattern has become a truly shared primitive.
- Keep new screen-specific parts inside the workspace's own `components`, `content`, `pages`, and `types`.

### Starter Workspace

`next-figma/` is a clean seed for the next Figma conversion. It is intentionally not wired into `src/App.tsx` yet, so it can evolve without affecting the live demo flow.
