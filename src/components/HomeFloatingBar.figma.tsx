import figma from '@figma/code-connect';
import { HomeFloatingBar } from './HomeFloatingBar';

figma.connect(
  HomeFloatingBar,
  'https://www.figma.com/design/eDL8buTYnOs5yaIjCvT6LF/%E8%AE%BE%E8%AE%A1%E7%A8%BF-1.1?node-id=1092-136432&m=dev',
  {
    example: () => (
      <HomeFloatingBar
        centerLabel="Wilo 正在听⋯"
        onCenterClick={() => {}}
        rightTab={{ label: '计划', icon: 'plan', onClick: () => {} }}
      />
    ),
  },
);
