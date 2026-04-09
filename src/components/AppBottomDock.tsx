type AppBottomDockProps = {
  activeTab: 'daily' | 'moments';
  onSelectDaily: () => void;
  onSelectMoments: () => void;
  onSelectWilo: () => void;
  onOpenAnalysis?: () => void;
  className?: string;
};

export function AppBottomDock({
  activeTab,
  onSelectDaily,
  onSelectMoments,
  onSelectWilo,
  onOpenAnalysis,
  className = '',
}: AppBottomDockProps) {
  return (
    <div className={`bottom-area ${className}`.trim()}>
      {onOpenAnalysis ? (
        <button type="button" className="analysis-bar" onClick={onOpenAnalysis}>
          <span className="analysis-bar__left">
            <span className="thinking-spin" aria-hidden="true">
              <AiSparkIcon className="icon icon--thinking" />
            </span>
            <span>Agent 正在分析</span>
          </span>
          <ChevronRightIcon />
        </button>
      ) : null}

      <div className="bottom-area__nav-row">
        <nav className="bottom-nav" aria-label="Primary">
          <div className="bottom-nav__group bottom-nav__group--wide">
            <button
              type="button"
              className={`tab${activeTab === 'daily' ? ' tab--active' : ''}`}
              onClick={onSelectDaily}
            >
              <TagIcon />
              <span>Daily</span>
            </button>
            <button
              type="button"
              className={`tab${activeTab === 'moments' ? ' tab--active' : ''}`}
              onClick={onSelectMoments}
            >
              <MomentsIcon />
              <span>Moments</span>
            </button>
          </div>

          <div className="bottom-nav__group">
            <button type="button" className="tab tab--wilo" onClick={onSelectWilo}>
              <WiloIcon />
              <span>Wilo</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function AiSparkIcon({ className = 'icon' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3.5c.7 3.4 1.3 4.7 2.2 5.7 1 1 2.3 1.6 5.8 2.3-3.5.7-4.8 1.3-5.8 2.3-1 1-1.5 2.3-2.2 5.7-.7-3.4-1.3-4.7-2.2-5.7-1-1-2.3-1.6-5.8-2.3 3.5-.7 4.8-1.3 5.8-2.3.9-1 1.5-2.3 2.2-5.7z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M18.4 4.2c.25 1.22.45 1.67.77 1.99.33.33.78.53 2.03.78-1.25.25-1.7.45-2.03.78-.32.32-.52.77-.77 1.99-.24-1.22-.44-1.67-.77-1.99-.33-.33-.78-.53-2.03-.78 1.25-.25 1.7-.45 2.03-.78.33-.32.53-.77.77-1.99z"
        fill="currentColor"
      />
      <circle cx="5.3" cy="16.8" r="1.6" fill="currentColor" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="icon icon--chevron-small" aria-hidden="true">
      <path
        d="M7.4 5.2L12.2 10l-4.8 4.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M4 7.5a2.5 2.5 0 0 1 2.5-2.5h5.1c.7 0 1.4.3 1.9.8l5.7 5.7a1.9 1.9 0 0 1 0 2.7l-4 4a1.9 1.9 0 0 1-2.7 0l-5.7-5.7a2.7 2.7 0 0 1-.8-1.9V7.5zm4 .2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z"
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

function WiloIcon() {
  return <AiSparkIcon className="icon" />;
}
