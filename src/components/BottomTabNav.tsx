import { HomeFloatingBar } from './HomeFloatingBar';

type BottomTabNavProps = {
  theme?: 'dark' | 'light';
  active: 'home' | 'plan';
  onGoHome: () => void;
  onOpenPlan: () => void;
};

export function BottomTabNav({
  theme = 'dark',
  active,
  onGoHome,
  onOpenPlan,
}: BottomTabNavProps) {
  return (
    <HomeFloatingBar
      tone={theme}
      className={theme === 'dark' ? 'home-floating-bar--moments-dark' : 'home-floating-bar--moments-light'}
      leftTab={{ label: '主页', icon: 'home', active: active === 'home', onClick: onGoHome }}
      rightTab={{ label: '计划', icon: 'plan', active: active === 'plan', onClick: onOpenPlan }}
    />
  );
}
