import { HomeFloatingBar } from '../components/HomeFloatingBar';
import {
  FragmentExerciseIcon,
  InflammationWarningActionIcon,
  InflammationWarningIcon,
  MealAdviceActionIcon,
  MealAdviceIcon,
  PhoneLimitActionIcon,
  PhoneLimitIcon,
  TargetPlanActionIcon,
  TargetPlanIcon,
} from '../components/FeatureIcons';
import { StatusBar } from './HomePage';

type PlanPageProps = {
  onBack: () => void;
  onGoHome: () => void;
  onOpenAnalysis: () => void;
  onOpenWilo: () => void;
};

const weekDates = ['23', '24', '25', '26', '27', '28', '29'];

const planCards = [
  {
    section: '14:00-15:00 进行中',
    title: '碎片化运动',
    description: '建议立即接受5–10分钟的自然光照射（靠近窗户或短时户外）',
    icon: <FragmentExerciseIcon />,
    trailing: <CircleIcon />,
  },
  {
    section: '未来计划',
    title: '餐饮建议',
    description:
      '计划今晚19点运动，建议在晚餐中包含一份复合碳水（如全麦面包），为训练供能',
    icon: <MealAdviceIcon />,
    trailing: <MealAdviceActionIcon />,
  },
  {
    title: '目标计划',
    description: '篮球运动一个小时',
    icon: <TargetPlanIcon />,
    trailing: <TargetPlanActionIcon />,
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
    icon: <PhoneLimitIcon />,
    trailing: (
      <span className="plan-card__alert-wrap">
        <span className="plan-card__alert-dot" />
        <PhoneLimitActionIcon />
      </span>
    ),
  },
  {
    section: '已完成',
    title: '炎症预警',
    description: '已智能调整接下来10天饮食建议：增加深海鱼，减少糖分',
    icon: <InflammationWarningIcon />,
    trailing: <InflammationWarningActionIcon />,
  },
];

export function PlanPage({ onBack, onGoHome, onOpenAnalysis, onOpenWilo }: PlanPageProps) {
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

        <HomeFloatingBar
          className="home-floating-bar--moments"
          onCenterClick={onOpenWilo}
          onOpenAnalysis={onOpenAnalysis}
          leftTab={{ label: '主页', icon: 'home', onClick: onGoHome }}
          rightTab={{ label: '计划', icon: 'plan', active: true }}
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
