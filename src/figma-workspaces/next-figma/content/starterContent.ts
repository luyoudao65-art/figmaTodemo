import type {
  NextFigmaHero,
  NextFigmaMetric,
  NextFigmaPanel,
} from '../types';

export const nextFigmaHero: NextFigmaHero = {
  eyebrow: 'Isolated Figma Workspace',
  title: 'Ready for the next import',
  description:
    'This starter surface keeps the shared visual language, but none of the current screen implementation code.',
};

export const nextFigmaMetrics: NextFigmaMetric[] = [
  {
    label: 'Shared',
    value: 'Styles',
    detail: 'Root tokens and mobile shell stay consistent.',
  },
  {
    label: 'Shared',
    value: 'Skills',
    detail: 'Same Figma workflow and validation path.',
  },
  {
    label: 'Isolated',
    value: 'Code',
    detail: 'New pages and parts live only in this workspace.',
  },
];

export const nextFigmaPanels: NextFigmaPanel[] = [
  {
    id: 'pages',
    title: 'Pages stay local',
    body:
      'Put the next imported frame containers in this workspace instead of extending the current demo pages.',
    meta: 'Use `pages/` for screen-level entry points.',
  },
  {
    id: 'components',
    title: 'Components stay local',
    body:
      'Extract repeated pieces here only when they repeat inside the new Figma surface.',
    meta: 'Promote to shared code only after the pattern stabilizes.',
  },
  {
    id: 'content',
    title: 'Content stays editable',
    body:
      'Scenario copy and mock data can move into local content files as the new flow grows.',
    meta: 'Keeps JSX focused on layout fidelity.',
  },
];
