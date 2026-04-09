import type { ReactNode } from 'react';

type GoalCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  trailing: ReactNode;
  muted?: boolean;
  actionRow?: ReactNode;
};

type TimelineBlockProps = {
  timeLabel: string;
  timeTone: 'active' | 'muted';
  entries: GoalCardProps[];
};

type HomePageProps = {
  onOpenMoments: () => void;
  onOpenAnalysis: () => void;
  onOpenWilo: () => void;
};

const heroImage =
  'https://www.figma.com/api/mcp/asset/fb9eb749-8657-4298-892d-427ce1a00767';
const emotionMomentsImage =
  'https://www.figma.com/api/mcp/asset/ca95adec-41d9-46a0-b006-49871f0792be';
const goalCoverImage =
  'https://www.figma.com/api/mcp/asset/75448ff3-6938-4712-be1a-0cf02c6f1d36';

const currentGoals: GoalCardProps[] = [
  {
    title: '篮球运动1小时',
    description: '19:00–20:00',
    icon: <PhotoIcon src={goalCoverImage} alt="" />,
    trailing: <CircleActionIcon />,
  },
];

const smartPlanBlocks: TimelineBlockProps[] = [
  {
    timeLabel: '14:00-15:00 进行中',
    timeTone: 'active',
    entries: [
      {
        title: '碎片化运动',
        description:
          '建议立即接受5-10分钟的自然光照射（靠近窗户或短时户外）',
        icon: <StretchIcon />,
        trailing: <CircleActionIcon />,
      },
    ],
  },
  {
    timeLabel: '已完成',
    timeTone: 'muted',
    entries: [
      {
        title: '炎症预警',
        description: '已智能调整接下来10天饮食建议：增加深海鱼，减少糖分',
        icon: <ShieldLeafIcon />,
        trailing: <CheckIcon />,
      },
      {
        title: '饮食推荐',
        description: '午餐：“超级碗”的鳕鱼谷物碗',
        icon: <CutleryIcon />,
        trailing: <CheckIcon />,
        muted: true,
        actionRow: (
          <div className="skill-action">
            <span>Skills 自动下单外卖</span>
            <button type="button" className="skill-action__button">
              {/* TODO: wire this to the real authorization flow once the integration contract exists. */}
              <span>去授权</span>
              <ChevronRightIcon />
            </button>
          </div>
        ),
      },
    ],
  },
];

export function HomePage({ onOpenMoments, onOpenAnalysis, onOpenWilo }: HomePageProps) {
  return (
    <main className="app-shell">
      <section className="phone-frame">
        <div className="phone-scroll phone-scroll--home">
          <button
            type="button"
            className="hero hero--interactive"
            onClick={onOpenMoments}
            aria-label="打开 Moments 页面"
          >
            <img className="hero__image" src={heroImage} alt="" />
            <div className="hero__shade" />
            <StatusBar inverse />

            <div className="hero__content">
              <div>
                <h1 className="hero__title">活力在线</h1>
              </div>
              <div className="emotion-strip">
                <p className="emotion-strip__label">情绪瞬间</p>
                <img className="emotion-strip__image" src={emotionMomentsImage} alt="" />
              </div>
            </div>
          </button>

          <section className="content-sheet">
            <PageSection
              title="我的目标"
              subtitle="减重/连续 1 天"
              progress={0.12}
            >
              {currentGoals.map((goal) => (
                <GoalCard
                  key={goal.title}
                  {...goal}
                  actionRow={
                    <button type="button" className="goal-inline-action" onClick={onOpenWilo}>
                      <span>开启5分钟的“脑波调节”背景音乐</span>
                      <span className="goal-inline-action__hint">
                        Wilo 一下
                        <ChevronRightIcon />
                      </span>
                    </button>
                  }
                />
              ))}
            </PageSection>

            <PageSection title="智能计划">
              <div className="timeline">
                <div className="timeline__rail" aria-hidden="true">
                  <div className="timeline__line timeline__line--top" />
                  <span className="timeline__dot timeline__dot--top" />
                  <div className="timeline__line timeline__line--bottom" />
                  <span className="timeline__dot timeline__dot--bottom" />
                </div>
                <div className="timeline__content">
                  {smartPlanBlocks.map((block) => (
                    <TimelineBlock key={block.timeLabel} {...block} />
                  ))}
                </div>
              </div>
            </PageSection>
          </section>
          <div className="bottom-area bottom-area--embedded">
            <button type="button" className="analysis-bar" onClick={onOpenAnalysis}>
              {/* TODO: replace with live agent analysis state when the product logic is defined. */}
              <span className="analysis-bar__left">
                <span className="thinking-spin" aria-hidden="true">
                  <SparkIcon />
                </span>
                <span>Agent 正在分析</span>
              </span>
              <ChevronRightIcon />
            </button>

            <div className="bottom-area__nav-row">
              <BottomNav
                activeTab="daily"
                onSelectDaily={() => {}}
                onSelectMoments={onOpenMoments}
              />
              <button type="button" className="wilo-shortcut wilo-shortcut--home" onClick={onOpenWilo}>
                <SparkIcon />
                <span>Wilo 一下</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function StatusBar({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`status-bar${inverse ? ' status-bar--inverse' : ''}`}>
      <span className="status-bar__time">9:41</span>
      <div className="status-bar__island" />
      <div className="status-bar__icons" aria-hidden="true">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

export function BottomNav({
  activeTab,
  onSelectDaily,
  onSelectMoments,
}: {
  activeTab: 'daily' | 'moments';
  onSelectDaily: () => void;
  onSelectMoments: () => void;
}) {
  return (
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
        <button type="button" className="tab">
          <WiloIcon />
          <span>Wilo</span>
        </button>
      </div>
    </nav>
  );
}

function PageSection({
  title,
  subtitle,
  progress,
  children,
}: {
  title: string;
  subtitle?: string;
  progress?: number;
  children: ReactNode;
}) {
  return (
    <section className="page-section">
      <header className="page-section__header">
        <div className="page-section__title-group">
          <div className="page-section__title-row">
            <h2>{title}</h2>
            <ChevronRightIcon />
          </div>
          {subtitle ? (
            <div className="page-section__meta">
              <span>{subtitle}</span>
              <ProgressBar value={progress ?? 0} />
            </div>
          ) : null}
        </div>
      </header>
      <div className="page-section__body">{children}</div>
    </section>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-bar" aria-hidden="true">
      <span className="progress-bar__fill" style={{ width: `${value * 100}%` }} />
    </div>
  );
}

function TimelineBlock({ timeLabel, timeTone, entries }: TimelineBlockProps) {
  return (
    <div className="timeline-block">
      <p
        className={
          timeTone === 'active'
            ? 'timeline-block__label timeline-block__label--active'
            : 'timeline-block__label timeline-block__label--muted'
        }
      >
        {timeLabel}
      </p>
      <div className="timeline-block__cards">
        {entries.map((entry, index) => (
          <GoalCard key={`${timeLabel}-${entry.title}-${index}`} {...entry} />
        ))}
      </div>
    </div>
  );
}

function GoalCard({
  title,
  description,
  icon,
  trailing,
  muted = false,
  actionRow,
}: GoalCardProps) {
  return (
    <article className={`goal-card${muted ? ' goal-card--muted' : ''}`}>
      <div className="goal-card__content">
        <div className="goal-card__icon" aria-hidden="true">
          {icon}
        </div>
        <div className="goal-card__text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="goal-card__trailing" aria-hidden="true">
          {trailing}
        </div>
      </div>
      {actionRow}
    </article>
  );
}

export function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon icon--chevron" aria-hidden="true">
      <path
        d="M9 6.5L14.5 12L9 17.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CircleActionIcon() {
  return (
    <svg viewBox="0 0 28 28" className="icon" aria-hidden="true">
      <circle cx="14" cy="14" r="11.5" fill="none" stroke="#AFB7B6" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 28 28" className="icon" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="#242A29" opacity="0.06" />
      <path
        d="M9.5 14.3l3 3 6-6.4"
        fill="none"
        stroke="#242A29"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 20 13" className="status-icon" aria-hidden="true">
      <path d="M2 11h2V7H2v4zm4 0h2V5H6v6zm4 0h2V3h-2v8zm4 0h2V1h-2v10z" fill="currentColor" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 18 13" className="status-icon" aria-hidden="true">
      <path
        d="M9 10.5l1.7-1.7a2.4 2.4 0 0 0-3.4 0L9 10.5zm-4-4l1.4 1.4a4.9 4.9 0 0 1 5.2 0L13 6.5a6.9 6.9 0 0 0-8 0zm-3-3L3.4 5a9.9 9.9 0 0 1 11.2 0L16 3.5A12 12 0 0 0 2 3.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 28 13" className="status-icon status-icon--battery" aria-hidden="true">
      <rect x="1" y="1" width="22" height="11" rx="3" fill="none" stroke="currentColor" />
      <rect x="3" y="3" width="16" height="7" rx="2" fill="currentColor" />
      <rect x="24.5" y="4" width="2.5" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 20 20" className="icon" aria-hidden="true">
      <path
        d="M10 1.5l1.5 4.3 4.3 1.5-4.3 1.5L10 13.1 8.5 8.8 4.2 7.3l4.3-1.5L10 1.5zm-5 9.1l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3zm10.2 1.2l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"
        fill="currentColor"
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
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7-1.7 4.8-1.7-4.8L5.5 10l4.8-1.7L12 3.5zm6 11.2l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function CutleryIcon() {
  return (
    <svg viewBox="0 0 32 32" className="icon icon--feature" aria-hidden="true">
      <path
        d="M9 5v8m3-8v8m-6-8v8a3 3 0 0 0 3 3v11m10-22v12m0 0c-2.8 0-5-2.2-5-5V5m5 12c2.8 0 5-2.2 5-5V5m0 22V5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function StretchIcon() {
  return (
    <svg viewBox="0 0 32 32" className="icon icon--feature" aria-hidden="true">
      <path
        d="M16 6c2.6 0 4.8 2.2 4.8 4.8S18.6 15.6 16 15.6s-4.8-2.2-4.8-4.8S13.4 6 16 6zm-6.5 19.2l2.3-5.6 4.2-1.9 4.2 1.9 2.3 5.6m-12.5-4.1h12.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShieldLeafIcon() {
  return (
    <svg viewBox="0 0 32 32" className="icon icon--feature" aria-hidden="true">
      <path
        d="M16 4l8 3.2v6.4c0 6.3-3.4 10.4-8 13.4-4.6-3-8-7.1-8-13.4V7.2L16 4zm-3.8 14.1c1.8-3.9 5.5-6.4 9.6-6.8-1 4.6-4.1 8.1-8.5 9.3m1.2-4.5c1.2 0 2.2.3 3.3.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PhotoIcon({ src, alt }: { src: string; alt: string }) {
  return <img className="goal-photo-icon" src={src} alt={alt} />;
}
