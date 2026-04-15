type FloatingBarIcon = 'home' | 'moments' | 'plan';

type FloatingBarTab = {
  label: string;
  icon: FloatingBarIcon;
  active?: boolean;
  onClick?: () => void;
};

type HomeFloatingBarProps = {
  className?: string;
  centerLabel?: string;
  onCenterClick?: () => void;
  tone?: 'dark' | 'light';
  leftTab?: FloatingBarTab;
  rightTab?: FloatingBarTab;
};

const defaultLeftTab: FloatingBarTab = {
  label: '主页',
  icon: 'home',
  active: true,
};

const defaultRightTab: FloatingBarTab = {
  label: '计划',
  icon: 'plan',
};

export function HomeFloatingBar({
  className = '',
  centerLabel = 'Wilo 正在听⋯',
  onCenterClick,
  tone = 'dark',
  leftTab = defaultLeftTab,
  rightTab = defaultRightTab,
}: HomeFloatingBarProps) {
  const hasCenterLabel = centerLabel.trim().length > 0;
  const showCenter = Boolean(onCenterClick);

  return (
    <div className={`home-floating-bar home-floating-bar--embedded home-floating-bar--tone-${tone} ${className}`.trim()}>
      <nav className={`home-floating-bar__nav${showCenter ? '' : ' home-floating-bar__nav--compact'}`} aria-label="Floating navigation">
        <FloatingTabButton {...leftTab} />

        {showCenter ? (
          <button
            type="button"
            className={`home-floating-bar__center${hasCenterLabel ? '' : ' home-floating-bar__center--icon'}`}
            onClick={onCenterClick}
            aria-label={hasCenterLabel ? centerLabel : '打开 Wilo'}
          >
            {hasCenterLabel ? <span>{centerLabel}</span> : <AiSparkIcon className="icon home-floating-bar__center-icon" />}
          </button>
        ) : null}

        <FloatingTabButton {...rightTab} />
      </nav>
    </div>
  );
}

function FloatingTabButton({ label, icon, active = false, onClick }: FloatingBarTab) {
  return (
    <button
      type="button"
      className={`home-floating-bar__tab${active ? ' home-floating-bar__tab--active' : ''}`}
      onClick={onClick}
      disabled={!onClick && !active}
      aria-disabled={!onClick && !active}
    >
      <span className="home-floating-bar__tab-surface">
        {active ? <span className="home-floating-bar__selection" aria-hidden="true" /> : null}
        {icon === 'home' ? <HomeIcon /> : null}
        {icon === 'moments' ? <MomentsIcon /> : null}
        {icon === 'plan' ? <PlanIcon /> : null}
        <span>{label}</span>
      </span>
    </button>
  );
}

export function AiSparkIcon({ className = 'icon' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M9.93694 15.5C9.84766 15.1539 9.66728 14.8381 9.41456 14.5854C9.16184 14.3327 8.84601 14.1523 8.49994 14.063L2.36494 12.481C2.26027 12.4513 2.16815 12.3883 2.10255 12.3014C2.03696 12.2146 2.00146 12.1088 2.00146 12C2.00146 11.8912 2.03696 11.7854 2.10255 11.6986C2.16815 11.6118 2.26027 11.5487 2.36494 11.519L8.49994 9.93601C8.84589 9.84681 9.16163 9.66658 9.41434 9.41404C9.66705 9.16151 9.84751 8.84589 9.93694 8.50001L11.5189 2.36501C11.5483 2.25992 11.6113 2.16735 11.6983 2.1014C11.7852 2.03545 11.8913 1.99976 12.0004 1.99976C12.1096 1.99976 12.2157 2.03545 12.3026 2.1014C12.3896 2.16735 12.4525 2.25992 12.4819 2.36501L14.0629 8.50001C14.1522 8.84608 14.3326 9.1619 14.5853 9.41462C14.838 9.66734 15.1539 9.84773 15.4999 9.93701L21.6349 11.518C21.7404 11.5471 21.8335 11.61 21.8998 11.6971C21.9661 11.7841 22.002 11.8906 22.002 12C22.002 12.1094 21.9661 12.2159 21.8998 12.3029C21.8335 12.39 21.7404 12.4529 21.6349 12.482L15.4999 14.063C15.1539 14.1523 14.838 14.3327 14.5853 14.5854C14.3326 14.8381 14.1522 15.1539 14.0629 15.5L12.4809 21.635C12.4515 21.7401 12.3886 21.8327 12.3016 21.8986C12.2147 21.9646 12.1086 22.0003 11.9994 22.0003C11.8903 22.0003 11.7842 21.9646 11.6973 21.8986C11.6103 21.8327 11.5473 21.7401 11.5179 21.635L9.93694 15.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M20 3V7M22 5H18M4 17V19M5 18H3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.586 2.586C12.211 2.2109 11.7024 2.00011 11.172 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V11.172C2.00011 11.7024 2.2109 12.211 2.586 12.586L11.29 21.29C11.7445 21.7416 12.3592 21.9951 13 21.9951C13.6408 21.9951 14.2555 21.7416 14.71 21.29L21.29 14.71C21.7416 14.2555 21.9951 13.6408 21.9951 13C21.9951 12.3592 21.7416 11.7445 21.29 11.29C21.29 11.29 12.961 2.9611 12.586 2.586ZM7.5 9C8.32843 9 9 8.32843 9 7.5C9 6.67157 8.32843 6 7.5 6C6.67157 6 6 6.67157 6 7.5C6 8.32843 6.67157 9 7.5 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MomentsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3.5" fill="currentColor" opacity="0.35" />
      <rect x="7" y="7" width="10" height="10" rx="2.5" fill="currentColor" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M12 3C12 3 16.5147 3.01472 19 5.5C21.4853 7.98528 21 12 21 12V19C21 19.5304 20.7891 20.039 20.4141 20.4141C20.039 20.7891 19.5304 21 19 21H5C4.46957 21 3.96101 20.7891 3.58594 20.4141C3.21087 20.039 3 19.5304 3 19V5C3 4.46957 3.21086 3.96101 3.58594 3.58594C3.96101 3.21086 4.46957 3 5 3H12ZM7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14H9C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12H7ZM7 8C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10H11C11.5523 10 12 9.55228 12 9C12 8.44772 11.5523 8 11 8H7Z"
        fill="currentColor"
      />
    </svg>
  );
}
