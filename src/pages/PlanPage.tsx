import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { BottomTabNav } from '../components/BottomTabNav';
import {
  BedtimeIcon,
  ExerciseBallIcon,
  FragmentExerciseIcon,
  InflammationWarningActionIcon,
  InflammationWarningIcon,
  MealAdviceIcon,
  PhoneLimitIcon,
  TargetPlanIcon,
} from '../components/FeatureIcons';
import treeImage from '../pic/FigmaPic/tree.webp';
import type { GeneratedPlanIcon, GeneratedPlanSuggestion } from '../types/generatedPlan';

type PlanPageProps = {
  variant?: 'default' | 'new-plan';
  generatedPlansByDate?: Record<string, GeneratedPlanSuggestion[]>;
  recentGeneratedPlanKeys?: string[];
  initialActiveDate?: string;
  onGoHome: () => void;
};

const weekDates = [
  { day: '一', date: '24' },
  { day: '二', date: '25' },
  { day: '三', date: '26' },
  { day: '四', date: '27' },
  { day: '五', date: '28' },
  { day: '六', date: '29', active: true },
  { day: '日', date: '30' },
];

const basePlanGroups = [
  {
    key: 'in-progress',
    label: '16:00-16:30 进行中',
    entries: [
      {
        key: 'fragmented-exercise',
        tone: 'image' as const,
        title: '碎片化运动',
        description: '建议立即接受5-10分钟的自然光照射（靠近窗户或短时户外）',
      },
    ],
  },
  {
    key: 'future',
    label: '未来计划',
    subLabel: '17:00',
    entries: [
      {
        key: 'meal-advice',
        tone: 'icon' as const,
        title: '餐饮建议',
        description: '计划今晚19点运动，建议在晚餐中包含一份复合碳水（如全麦面包），为训练供能',
        icon: <MealAdviceIcon />,
      },
    ],
  },
  {
    key: 'sleep-goal',
    label: '22:00-23:30',
    entries: [
      {
        key: 'target-plan',
        tone: 'icon' as const,
        title: '目标计划',
        description: '提前15分钟开始准备睡觉，原来习惯23:30睡，今天调整到23:15',
        icon: <TargetPlanIcon />,
      },
    ],
  },
  {
    key: 'done',
    label: '已完成',
    entries: [
      {
        key: 'inflammation-warning',
        tone: 'icon' as const,
        title: '炎症预警',
        description: '已智能调整接下来10天饮食建议：增加深海鱼，减少糖分',
        icon: <InflammationWarningIcon />,
        trailing: <InflammationWarningActionIcon />,
      },
    ],
  },
];

export function PlanPage({
  variant = 'default',
  generatedPlansByDate = {},
  recentGeneratedPlanKeys = [],
  initialActiveDate = '29',
  onGoHome,
}: PlanPageProps) {
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const [activeDate, setActiveDate] = useState(initialActiveDate);

  useEffect(() => {
    setActiveDate(initialActiveDate);
  }, [initialActiveDate]);

  useEffect(() => {
    if (variant === 'new-plan') {
      highlightRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [variant]);

  const generatedPlans = (generatedPlansByDate[activeDate] ?? []).slice().sort(
    (left, right) => (left.sortMinutes ?? 0) - (right.sortMinutes ?? 0)
  );
  const generatedPlanGroups = generatedPlans.map((plan) => ({
    key: `generated-group-${getGeneratedPlanKey(plan)}`,
    label: plan.timeLabel,
    entries: [
      {
        key: getGeneratedPlanKey(plan),
        tone: 'icon' as const,
        title: plan.title,
        description: plan.description,
        icon: renderGeneratedPlanIcon(plan.icon),
        hasAlert: plan.hasAlert,
        footer: plan.footerText && plan.footerActionLabel ? (
          <button type="button" className="goal-inline-action goal-inline-action--plan">
            <span>{plan.footerText}</span>
            <span className="goal-inline-action__hint">
              {plan.footerActionLabel}
              <ChevronRightMini />
            </span>
          </button>
        ) : undefined,
      },
    ],
  }));

  const displayedPlanGroups =
    activeDate === '30'
      ? generatedPlanGroups
      : [
          ...basePlanGroups.slice(0, 3),
          ...generatedPlanGroups,
          ...basePlanGroups.slice(3),
        ];
  const firstRecentGroupKey = displayedPlanGroups.find((group) =>
    group.entries.some((entry) => recentGeneratedPlanKeys.includes(entry.key))
  )?.key;

  return (
    <main className="app-shell app-shell--moment-dark">
      <section className="phone-frame phone-frame--moments phone-frame--moments-dark">
        <div className="phone-scroll phone-scroll--plan-dark">


          <div className={`plan-page plan-page--dark${variant === 'new-plan' ? ' plan-page--focus-created' : ''}`}>
            <header className="plan-page__header">
              <h1 className="plan-page__title">计划</h1>
            </header>

            <section className="plan-date-strip" aria-label="日期切换">
              {weekDates.map((item) => (
                <button
                  key={`${item.day}-${item.date}`}
                  type="button"
                  className={`plan-date-pill${item.date === activeDate ? ' plan-date-pill--active' : ''}`}
                  onClick={() => setActiveDate(item.date)}
                >
                  <span>{item.day}</span>
                  <strong>{item.date}</strong>
                </button>
              ))}
            </section>

            <section className="plan-timeline plan-timeline--dark">
              <div className="plan-timeline__rail" aria-hidden="true">
                <span className="plan-timeline__line plan-timeline__line--top" />
              </div>

              <div className="plan-timeline__content">
                {displayedPlanGroups.length ? displayedPlanGroups.map((group, groupIndex) => (
                  <div
                    key={group.key}
                    className="plan-card-group"
                    ref={variant === 'new-plan' && group.key === firstRecentGroupKey ? highlightRef : undefined}
                  >
                    <p
                      className={
                        group.label.includes('进行中')
                          ? 'plan-card-group__label plan-card-group__label--active'
                          : 'plan-card-group__label'
                      }
                    >
                      {group.label}
                    </p>

                    {'subLabel' in group && group.subLabel ? (
                      <p className="plan-card-group__sub-label">{group.subLabel}</p>
                    ) : null}

                    {group.entries.map((entry) => (
                      <article
                        key={entry.key}
                        className={`plan-entry-card${entry.tone === 'image' ? ' plan-entry-card--image' : ''}${variant === 'new-plan' && recentGeneratedPlanKeys.includes(entry.key) ? ' plan-entry-card--highlighted plan-entry-card--generated-insert' : ''}`}
                        style={variant === 'new-plan' && recentGeneratedPlanKeys.includes(entry.key) ? ({ '--plan-insert-delay': `${groupIndex * 120}ms` } as CSSProperties) : undefined}
                      >
                        {entry.tone === 'image' ? (
                          <div className="plan-entry-card__image-shell">
                            <div className="plan-entry-card__hero">
                              <img src={treeImage} alt="树影与阳光" />
                            </div>
                            <div className="plan-entry-card__hero-meta">
                              <div className="plan-entry-card__hero-copy">
                                <h3>{entry.title}</h3>
                                <p>{entry.description}</p>
                              </div>
                              <span className="plan-entry-card__hero-dot" aria-hidden="true" />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="goal-card plan-card plan-card--dark">
                              <div className="goal-card__content">
                                <div className="goal-card__icon" aria-hidden="true">
                                  {entry.icon}
                                </div>
                                <div className="goal-card__text">
                                  <h3>
                                    {('hasAlert' in entry && entry.hasAlert)
                                      ? (
                                        <span className="plan-card__title-row">
                                          <span className="plan-card__title-text">
                                            {entry.title.slice(0, -1)}
                                            <span className="plan-card__title-tail">
                                              {entry.title.slice(-1)}
                                              <span className="plan-card__alert-dot" />
                                            </span>
                                          </span>
                                        </span>
                                        )
                                      : (
                                        <span className="plan-card__title-row">
                                          <span className="plan-card__title-text">{entry.title}</span>
                                        </span>
                                        )}
                                  </h3>
                                  <p>{entry.description}</p>
                                </div>
                                {'trailing' in entry && entry.trailing ? (
                                  <div className="goal-card__trailing" aria-hidden="true">
                                    {entry.trailing as ReactNode}
                                  </div>
                                ) : null}
                              </div>
                              {('footer' in entry ? entry.footer : null) as ReactNode}
                            </div>
                          </>
                        )}
                      </article>
                    ))}
                  </div>
                )) : (
                  <div className="plan-card-group">
                    <p className="plan-card-group__label">周日 30</p>
                    <article className="plan-entry-card plan-entry-card--empty">
                      <div className="goal-card plan-card plan-card--dark">
                        <div className="goal-card__content">
                          <div className="goal-card__text">
                            <h3>
                              <span className="plan-card__title-row">
                                <span className="plan-card__title-text">还没有同步进来的计划</span>
                              </span>
                            </h3>
                            <p>从 Wilo 分析里导入飞书或日历安排后，这里会按时间自动排好。</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        <BottomTabNav active="plan" onGoHome={onGoHome} onOpenPlan={() => {}} />
      </section>
    </main>
  );
}

function renderGeneratedPlanIcon(icon: GeneratedPlanIcon) {
  if (icon === 'target-plan') return <TargetPlanIcon />;
  if (icon === 'meal-advice') return <MealAdviceIcon />;
  if (icon === 'fragment-exercise') return <FragmentExerciseIcon />;
  if (icon === 'bedtime') return <BedtimeIcon />;
  if (icon === 'exercise-ball') return <ExerciseBallIcon />;
  return <PhoneLimitIcon />;
}

function getGeneratedPlanKey(plan: GeneratedPlanSuggestion) {
  return `${plan.templateId}-${plan.timeLabel}-${plan.title}`;
}

function ChevronRightMini() {
  return (
    <svg viewBox="0 0 20 20" className="icon icon--tiny" aria-hidden="true">
      <path d="M7.5 5.2L12.3 10l-4.8 4.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
