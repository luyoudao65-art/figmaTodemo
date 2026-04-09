import { AppBottomDock } from '../components/AppBottomDock';
import { StatusBar } from './HomePage';

type PlanPageProps = {
  onBack: () => void;
  onGoHome: () => void;
  onOpenMoments: () => void;
  onOpenAnalysis: () => void;
  onOpenWilo: () => void;
};

const weekDates = ['23', '24', '25', '26', '27', '28', '29'];

const planCards = [
  {
    section: '14:00-15:00 进行中',
    title: '碎片化运动',
    description: '建议立即接受5–10分钟的自然光照射（靠近窗户或短时户外）',
    icon: <StretchIcon />,
    trailing: <CircleIcon />,
  },
  {
    section: '未来计划',
    title: '餐饮建议',
    description:
      '计划今晚19点运动，建议在晚餐中包含一份复合碳水（如全麦面包），为训练供能',
    icon: <CutleryIcon />,
    trailing: <PendingIcon />,
  },
  {
    title: '目标计划',
    description: '篮球运动一个小时',
    icon: <TargetIcon />,
    trailing: <PendingIcon />,
    footer: (
      <button type="button" className="goal-inline-action">
        <span>Skills 自动下单外卖</span>
        <span className="goal-inline-action__hint">
          去授权
          <ChevronRightMini />
        </span>
      </button>
    ),
  },
  {
    title: '远离手机',
    description: '晚10:30后无法打开除必要通讯工作软件外其他软件',
    icon: <PhoneMuteIcon />,
    trailing: (
      <span className="plan-card__alert-wrap">
        <span className="plan-card__alert-dot" />
        <PendingIcon />
      </span>
    ),
  },
  {
    section: '已完成',
    title: '炎症预警',
    description: '已智能调整接下来10天饮食建议：增加深海鱼，减少糖分',
    icon: <FlameIcon />,
    trailing: <DoneGreenIcon />,
  },
];

export function PlanPage({ onBack, onGoHome, onOpenMoments, onOpenAnalysis, onOpenWilo }: PlanPageProps) {
  return (
    <main className="app-shell">
      <section className="phone-frame phone-frame--moments">
        <div className="phone-scroll phone-scroll--plan">
          <StatusBar />
          <div className="plan-page">
            <header className="plan-page__header">
              <h1 className="plan-page__title">计划</h1>
            </header>

            <section className="plan-calendar">
              <div className="plan-calendar__labels">
                {['一', '二', '三', '四', '五', '六', '日'].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="plan-calendar__dates">
                {weekDates.map((date) => (
                  <span
                    key={date}
                    className={date === '28' ? 'plan-calendar__date plan-calendar__date--active' : 'plan-calendar__date'}
                  >
                    {date}
                  </span>
                ))}
              </div>
            </section>

            <section className="plan-timeline">
              <div className="plan-timeline__rail" aria-hidden="true">
                <span className="plan-timeline__dot plan-timeline__dot--top" />
                <span className="plan-timeline__line plan-timeline__line--top" />
                <span className="plan-timeline__dot plan-timeline__dot--mid" />
                <span className="plan-timeline__line plan-timeline__line--bottom" />
              </div>

              <div className="plan-timeline__content">
                {planCards.map((card, index) => (
                  <div key={`${card.title}-${index}`} className="plan-card-group">
                    {card.section ? (
                      <p
                        className={
                          card.section.includes('进行中')
                            ? 'plan-card-group__label plan-card-group__label--active'
                            : 'plan-card-group__label'
                        }
                      >
                        {card.section}
                      </p>
                    ) : null}

                    <article className="goal-card plan-card">
                      <div className="goal-card__content">
                        <div className="goal-card__icon" aria-hidden="true">
                          {card.icon}
                        </div>
                        <div className="goal-card__text">
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
                        </div>
                        <div className="goal-card__trailing" aria-hidden="true">
                          {card.trailing}
                        </div>
                      </div>
                      {card.footer}
                    </article>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <button type="button" className="page-back-button" onClick={onBack} aria-label="返回">
          <ChevronLeftIcon />
        </button>

        <AppBottomDock
          className="bottom-area--moments"
          activeTab="moments"
          onSelectDaily={onGoHome}
          onSelectMoments={onOpenMoments}
          onSelectWilo={onOpenWilo}
          onOpenAnalysis={onOpenAnalysis}
        />
      </section>
    </main>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path d="M14.5 6.5L9 12l5.5 5.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ChevronRightMini() {
  return (
    <svg viewBox="0 0 20 20" className="icon icon--tiny" aria-hidden="true">
      <path d="M7.5 5.2L12.3 10l-4.8 4.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg viewBox="0 0 28 28" className="icon" aria-hidden="true">
      <circle cx="14" cy="14" r="11.5" fill="none" stroke="#AFB7B6" strokeWidth="2" />
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg viewBox="0 0 28 28" className="icon" aria-hidden="true">
      <path d="M14 6.5v7l4.5 3.2" fill="none" stroke="#F0BE5E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="14" cy="14" r="9.5" fill="none" stroke="#F0BE5E" strokeWidth="2" />
    </svg>
  );
}

function DoneGreenIcon() {
  return (
    <svg viewBox="0 0 28 28" className="icon" aria-hidden="true">
      <circle cx="14" cy="14" r="11" fill="none" stroke="#3ED05A" strokeWidth="2" />
      <path d="M9.3 14.2l3.1 3.1 6.2-6.6" fill="none" stroke="#3ED05A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function StretchIcon() {
  return (
    <svg viewBox="0 0 32 32" className="icon icon--feature" aria-hidden="true">
      <path d="M16 6c2.6 0 4.8 2.2 4.8 4.8S18.6 15.6 16 15.6s-4.8-2.2-4.8-4.8S13.4 6 16 6zm-6.5 19.2l2.3-5.6 4.2-1.9 4.2 1.9 2.3 5.6m-12.5-4.1h12.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CutleryIcon() {
  return (
    <svg viewBox="0 0 32 32" className="icon icon--feature" aria-hidden="true">
      <path d="M9 5v8m3-8v8m-6-8v8a3 3 0 0 0 3 3v11m10-22v12m0 0c-2.8 0-5-2.2-5-5V5m5 12c2.8 0 5-2.2 5-5V5m0 22V5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 32 32" className="icon icon--feature" aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 16h22M16 5v22" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PhoneMuteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M11 18h2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 32 32" className="icon icon--feature" aria-hidden="true">
      <path d="M16 5c2.7 3.1 5.7 6.7 5.7 11.1A5.7 5.7 0 1 1 10.3 16c0-2.8 1.3-5.3 3.6-7.8-.3 4 2.2 5.3 2.2 5.3S17.9 10 16 5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
