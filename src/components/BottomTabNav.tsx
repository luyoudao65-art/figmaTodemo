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
    <div className={`bottom-tab-nav bottom-tab-nav--${theme}`}>
      <nav className="bottom-tab-nav__bar" aria-label="底部导航">
        <button
          type="button"
          className={`bottom-tab-nav__tab${active === 'home' ? ' bottom-tab-nav__tab--active' : ''}`}
          onClick={onGoHome}
        >
          <span className="bottom-tab-nav__surface">
            {active === 'home' ? <span className="bottom-tab-nav__selection" aria-hidden="true" /> : null}
            <HomeTagIcon />
            <span>主页</span>
          </span>
        </button>

        <button
          type="button"
          className={`bottom-tab-nav__tab${active === 'plan' ? ' bottom-tab-nav__tab--active' : ''}`}
          onClick={onOpenPlan}
        >
          <span className="bottom-tab-nav__surface">
            {active === 'plan' ? <span className="bottom-tab-nav__selection" aria-hidden="true" /> : null}
            <PlanDocIcon />
            <span>计划</span>
          </span>
        </button>
      </nav>
    </div>
  );
}

function HomeTagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.586 2.586C12.211 2.2109 11.7024 2.00011 11.172 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V11.172C2.00011 11.7024 2.2109 12.211 2.586 12.586L11.29 21.29C11.7445 21.7416 12.3592 21.9951 13 21.9951C13.6408 21.9951 14.2555 21.7416 14.71 21.29L21.29 14.71C21.7416 14.2555 21.9951 13.6408 21.9951 13C21.9951 12.3592 21.7416 11.7445 21.29 11.29C21.29 11.29 12.961 2.9611 12.586 2.586ZM7.5 9C8.32843 9 9 8.32843 9 7.5C9 6.67157 8.32843 6 7.5 6C6.67157 6 6 6.67157 6 7.5C6 8.32843 6.67157 9 7.5 9Z" fill="currentColor"/>
    </svg>
  );
}

function PlanDocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M14 3c3.1 0 5 1.9 5 5v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7Z"
        fill="currentColor"
      />
      <path
        d="M8 9h6M8 13h8M8 17h5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
