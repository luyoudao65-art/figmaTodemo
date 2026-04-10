import type { ReactNode } from 'react';
import { HomeFloatingBar } from '../components/HomeFloatingBar';
import {
  FragmentExerciseIcon,
  InflammationWarningIcon,
  MealAdviceIcon,
  TargetPlanIcon,
} from '../components/FeatureIcons';
import { WiloAnalysisSheet } from '../components/WiloAnalysisSheet';

const heroOrbitAssets = {
  ring: 'https://www.figma.com/api/mcp/asset/ee958f2a-e3de-473a-b7bd-773226995a0b',
  yellow: 'https://www.figma.com/api/mcp/asset/63bcf1c0-3ef9-4070-bcad-be6e15cdd26e',
  blue: 'https://www.figma.com/api/mcp/asset/77717068-e76d-4bf0-af75-3a171980fb1f',
  mint: 'https://www.figma.com/api/mcp/asset/419083ed-f314-4228-8a8c-bec191725b0d',
  gray: 'https://www.figma.com/api/mcp/asset/c0779061-d7f5-4258-a2df-f1fa9971adfc',
  peach: 'https://www.figma.com/api/mcp/asset/7236d07e-e222-49ac-a0df-0a017e9cc95b',
};

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
  onOpenPlan: () => void;
  onOpenWilo: () => void;
  onOpenGoalAnalysis: () => void;
  goalAnalysisOpen?: boolean;
  onCloseGoalAnalysis: () => void;
};

const currentGoals: GoalCardProps[] = [
  {
    title: '目标计划',
    description: '提前15分钟开始准备睡觉，原来习惯23:30睡，今天调整到23:15',
    icon: <TargetPlanIcon />,
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
        icon: <FragmentExerciseIcon />,
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
        icon: <InflammationWarningIcon />,
        trailing: <CheckIcon />,
      },
      {
        title: '饮食推荐',
        description: '午餐：“超级碗”的鳕鱼谷物碗',
        icon: <MealAdviceIcon />,
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

export function HomePage({
  onOpenMoments,
  onOpenPlan,
  onOpenWilo,
  onOpenGoalAnalysis,
  goalAnalysisOpen = false,
  onCloseGoalAnalysis,
}: HomePageProps) {
  return (
    <main className="app-shell">
      <section className="phone-frame">
        <div className="phone-scroll phone-scroll--home">
          <button
            type="button"
            className="hero hero--interactive hero--energy"
            onClick={onOpenMoments}
            aria-label="打开 Moments 页面"
          >
            <StatusBar />

            <div className="hero__content hero__content--energy">
              <div className="energy-orbit" aria-hidden="true">
                <div className="energy-orbit__dust" />
                <img
                  src={heroOrbitAssets.ring}
                  alt=""
                  className="energy-orbit__asset energy-orbit__asset--ring"
                />
                <img
                  src={heroOrbitAssets.yellow}
                  alt=""
                  className="energy-orbit__asset energy-orbit__asset--yellow"
                />
                <img
                  src={heroOrbitAssets.blue}
                  alt=""
                  className="energy-orbit__asset energy-orbit__asset--blue"
                />
                <img
                  src={heroOrbitAssets.mint}
                  alt=""
                  className="energy-orbit__asset energy-orbit__asset--mint"
                />
                <img
                  src={heroOrbitAssets.gray}
                  alt=""
                  className="energy-orbit__asset energy-orbit__asset--gray"
                />
                <img
                  src={heroOrbitAssets.peach}
                  alt=""
                  className="energy-orbit__asset energy-orbit__asset--peach"
                />
                <div className="energy-orbit__focus">
                  <span>活力</span>
                  <span>在线</span>
                </div>
              </div>
            </div>
          </button>

          <section className="content-sheet">
            <PageSection
              title="我的目标"
              subtitle="减重/连续 1 天"
              progress={0.12}
              onOpen={onOpenGoalAnalysis}
            >
              {currentGoals.map((goal) => (
                <GoalCard
                  key={goal.title}
                  {...goal}
                />
              ))}
            </PageSection>

            <PageSection title="智能计划" onOpen={onOpenPlan}>
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
        </div>
        <HomeFloatingBar onCenterClick={onOpenWilo} rightTab={{ label: '计划', icon: 'plan', onClick: onOpenPlan }} />

        {goalAnalysisOpen ? (
          <WiloAnalysisSheet
            variant="chat-demo"
            onClose={onCloseGoalAnalysis}
            onPrimaryAction={onOpenWilo}
          />
        ) : null}
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

function PageSection({
  title,
  subtitle,
  progress,
  onOpen,
  children,
}: {
  title: string;
  subtitle?: string;
  progress?: number;
  onOpen?: () => void;
  children: ReactNode;
}) {
  return (
    <section className="page-section">
      <header className="page-section__header">
        <div className="page-section__title-group">
          {onOpen ? (
            <button type="button" className="page-section__title-button" onClick={onOpen}>
              <div className="page-section__title-row">
                <h2>{title}</h2>
                <ChevronRightIcon />
              </div>
            </button>
          ) : (
            <div className="page-section__title-row">
              <h2>{title}</h2>
              <ChevronRightIcon />
            </div>
          )}
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
