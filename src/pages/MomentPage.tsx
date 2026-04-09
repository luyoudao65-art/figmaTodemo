import type { CSSProperties } from 'react';
import { AiSparkIcon, AppBottomDock } from '../components/AppBottomDock';
import { StatusBar } from './HomePage';

type MomentPageProps = {
  mode: 'day' | 'week' | 'month';
  overlay?: 'none' | 'wilo-suggest' | 'agent-analysis';
  onGoHome: () => void;
  onOpenDay: () => void;
  onOpenWeek: () => void;
  onOpenMonth: () => void;
  onOpenWiloSuggest: () => void;
  onOpenAgentAnalysis: () => void;
  onCloseOverlay: () => void;
  onConfirmPlan: () => void;
  onOpenWilo: () => void;
};

const daySegments = [
  { color: '#A3E9B2', width: '10%' },
  { color: '#F3D492', width: '7%' },
  { color: '#ACC7EC', width: '59%', label: '平静71%', labelColor: '#1E4885' },
  { color: '#D8DFDE', width: '14%' },
  { color: '#F0AC98', width: '6%' },
];

const periodSegments = [
  { color: '#A3E9B2', grow: 58, label: '兴奋30%', labelColor: '#21612C' },
  { color: '#F3D492', grow: 58, label: '焦虑30%', labelColor: '#6F5011' },
  { color: '#ACC7EC', grow: 39 },
  { color: '#D8DFDE', grow: 18 },
  { color: '#F0AC98', grow: 14 },
];

const dayBubbles = [
  {
    emotion: '平静',
    time: '0:00 - 6:10',
    top: 0,
    left: 216,
    size: 160,
    background:
      'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.98), rgba(227,237,252,0.98) 38%, rgba(203,221,247,0.96) 72%, rgba(215,228,246,0.84) 100%)',
    textColor: '#4C87DA',
  },
  {
    emotion: '疲惫',
    time: '22:10 -22:40',
    top: 158,
    left: 64,
    size: 106,
    background:
      'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.98), rgba(244,245,244,0.98) 42%, rgba(226,231,230,0.95) 74%, rgba(233,236,235,0.84) 100%)',
    textColor: '#242A29',
  },
  {
    emotion: '兴奋',
    time: '10:10 - 12:10',
    top: 255,
    left: 212,
    size: 108,
    background:
      'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.98), rgba(220,248,223,0.98) 42%, rgba(174,235,184,0.96) 74%, rgba(202,244,206,0.82) 100%)',
    textColor: '#2A853B',
  },
  {
    emotion: '平静',
    time: '15:10-15:50',
    top: 359,
    left: 103,
    size: 104,
    background:
      'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.98), rgba(227,237,252,0.98) 38%, rgba(203,221,247,0.96) 72%, rgba(215,228,246,0.84) 100%)',
    textColor: '#4C87DA',
  },
];

const periodDays = [
  { label: '一', date: '23', gap: 115, top: { tone: 'calm', size: 'tall' }, bottom: { tone: 'calm', size: 'dot' } },
  { label: '二', date: '24', gap: 100, top: { tone: 'calm', size: 'tall' }, bottom: { tone: 'anxious', size: 'dot' } },
  { label: '三', date: '25', gap: 89, top: { tone: 'calm', size: 'tall' }, bottom: { tone: 'calm', size: 'dot' } },
  { label: '四', date: '26', gap: 107, top: { tone: 'calm', size: 'tall-lg' }, bottom: { tone: 'neutral', size: 'pill' } },
  { label: '五', date: '27', gap: 164, top: { tone: 'calm', size: 'tall-lg' }, bottom: { tone: 'excited', size: 'x-tall' } },
  { label: '六', date: '28', gap: 81, top: { tone: 'calm', size: 'tall' }, bottom: { tone: 'anxious', size: 'x-tall' } },
  { label: '日', date: '29', top: null, bottom: null },
];

export function MomentPage({
  mode,
  overlay = 'none',
  onGoHome,
  onOpenDay,
  onOpenWeek,
  onOpenMonth: _onOpenMonth,
  onOpenWiloSuggest,
  onOpenAgentAnalysis,
  onCloseOverlay,
  onConfirmPlan,
  onOpenWilo,
}: MomentPageProps) {
  const isDay = mode === 'day';
  const isWeek = mode === 'week';
  const isMonth = mode === 'month';
  const isWiloSuggestOpen = overlay === 'wilo-suggest';
  const isAgentAnalysisOpen = overlay === 'agent-analysis';

  return (
    <main className="app-shell">
      <section className="phone-frame phone-frame--moments">
        <div className={`phone-scroll${isWeek ? ' phone-scroll--moments-week' : ''}`}>
          <StatusBar />

          <div className="moment-page">
            <header className="moment-page__header">
              <h1 className="moment-page__title">Moments</h1>
              <div className="moment-page__switcher" aria-label="时间粒度">
                <button
                  type="button"
                  className={`moment-switch${isDay ? ' moment-switch--active' : ''}`}
                  onClick={onOpenDay}
                >
                  日
                </button>
                <button
                  type="button"
                  className={`moment-switch${isWeek ? ' moment-switch--active' : ''}`}
                  onClick={onOpenWeek}
                >
                  周
                </button>
                <button
                  type="button"
                  className={`moment-switch${isMonth ? ' moment-switch--active' : ''}`}
                  disabled
                  aria-disabled="true"
                >
                  月
                </button>
              </div>
            </header>

            {isWeek ? (
              <>
                <section className="moment-summary moment-summary--week">
                  <div className="moment-summary__top">
                    <div className="moment-summary__title-group">
                      <h2>本周</h2>
                    </div>
                    <strong>3.23-3.29</strong>
                  </div>

                  <WeekEnergyBar />

                  <p className="moment-summary__text moment-summary__text--week">
                    本周身心处于一种高代谢、高反应性的模式，既是挑战（易引发情绪化进食、睡眠差），也是机会（高兴奋度可转化为运动动力）
                  </p>

                  <button type="button" className="moment-summary__cta" onClick={onOpenWiloSuggest}>
                    <AiSparkIcon className="icon icon--sparkle-outline" />
                    <span>Wilo 建议</span>
                  </button>
                </section>

                <section className="period-grid">
                  <div className="period-grid__labels">
                    {periodDays.map((day) => (
                      <span key={day.label}>{day.label}</span>
                    ))}
                  </div>
                  <div className="period-grid__dates">
                    {periodDays.map((day) => (
                      <span key={day.date}>{day.date}</span>
                    ))}
                  </div>

                  <div className="period-grid__chart">
                    <div className="moment-timeline__line moment-timeline__line--top">
                      <span>0:00</span>
                    </div>
                    <div className="moment-timeline__line moment-timeline__line--middle">
                      <span>12:00</span>
                    </div>
                    <div className="moment-timeline__line moment-timeline__line--bottom">
                      <span>24:00</span>
                    </div>

                    <div className="period-grid__columns">
                      {periodDays.map((day) => (
                        <div key={`${day.label}-${day.date}`} className="period-grid__column">
                          {day.top ? (
                            <div className="period-grid__stack" style={{ gap: `${day.gap}px` }}>
                              <span
                                className={`period-shape period-shape--${day.top.tone} period-shape--${day.top.size} period-shape--top`}
                              />
                              {day.bottom ? (
                                <span
                                  className={`period-shape period-shape--${day.bottom.tone} period-shape--${day.bottom.size} period-shape--bottom`}
                                />
                              ) : null}
                            </div>
                          ) : (
                            <span className="period-shape period-shape--empty" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            ) : isMonth ? (
              <>
                <section className="moment-summary moment-summary--week">
                  <div className="moment-summary__top">
                    <div className="moment-summary__title-group">
                      <h2>本月</h2>
                    </div>
                    <strong>3月</strong>
                  </div>

                  <WeekEnergyBar />

                  <p className="moment-summary__text moment-summary__text--week">
                    本月情绪波动整体可控，建议继续保持节律稳定，把高兴奋时段转化为运动与专注窗口。
                  </p>

                  <button type="button" className="moment-summary__cta" onClick={onOpenWiloSuggest}>
                    <AiSparkIcon className="icon icon--sparkle-outline" />
                    <span>Wilo 建议</span>
                  </button>
                </section>

                <section className="month-grid">
                  <div className="month-grid__weeks">
                    {Array.from({ length: 5 }).map((_, row) => (
                      <div key={row} className="month-grid__row">
                        {Array.from({ length: 7 }).map((__, col) => (
                          <span
                            key={`${row}-${col}`}
                            className={`month-grid__cell month-grid__cell--${['calm', 'neutral', 'excited', 'anxious'][((row * 7) + col) % 4]}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="moment-summary">
                  <div className="moment-summary__top">
                    <div className="moment-summary__title-group">
                      <h2>今日</h2>
                      <span>截止14:00</span>
                    </div>
                    <strong>3.28</strong>
                  </div>

                  <div className="moment-summary__segments" aria-hidden="true">
                    {daySegments.map((segment, index) => (
                      <div
                        key={`${segment.color}-${index}`}
                        className={`moment-segment${segment.label ? ' moment-segment--labelled' : ''}`}
                        style={{ width: segment.width, backgroundColor: segment.color }}
                      >
                        {segment.label ? (
                          <span style={{ color: segment.labelColor }}>{segment.label}</span>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <p className="moment-summary__text">
                    当前处于一个“稳定但能量有待激活”的理想平衡状态。这是一个高效执行健康计划的黄金窗口期。
                  </p>

                  <button type="button" className="moment-summary__cta" onClick={onOpenWiloSuggest}>
                    <AiSparkIcon className="icon icon--sparkle-outline" />
                    <span>Wilo 建议</span>
                  </button>
                </section>

                <section className="moment-timeline">
                  <div className="moment-timeline__line moment-timeline__line--top">
                    <span>0:00</span>
                  </div>
                  <div className="moment-timeline__line moment-timeline__line--middle">
                    <span>12:00</span>
                  </div>
                  <div className="moment-timeline__line moment-timeline__line--bottom">
                    <span>24:00</span>
                  </div>

                  <div className="moment-bubbles">
                    {dayBubbles.map((bubble) => (
                      <article
                        key={`${bubble.emotion}-${bubble.time}`}
                        className="moment-bubble"
                        style={{
                          top: bubble.top,
                          left: bubble.left,
                          width: bubble.size,
                          height: bubble.size,
                          background: bubble.background,
                          color: bubble.textColor,
                        }}
                      >
                        <strong>{bubble.emotion}</strong>
                        <span>{bubble.time}</span>
                      </article>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>

        {isWiloSuggestOpen || isAgentAnalysisOpen ? (
          <>
            <button
              type="button"
              className="analysis-overlay"
              aria-label="关闭分析面板"
              onClick={onCloseOverlay}
            />
            <section className="analysis-sheet">
              <div className="analysis-sheet__content">
                <div className="analysis-sheet__title-row">
                  <h2>Wilo 分析中</h2>
                  <AiSparkIcon className="icon analysis-sheet__title-icon" />
                </div>

                {isWiloSuggestOpen ? (
                  <>
                    <div className="analysis-sheet__header">
                      <p className="analysis-sheet__thinking-time">已思考 3s</p>
                      <p>根据我目前整合的数据（运动记录、心率及周围环境等）：</p>
                      <p>建议今晚10:30后远离蓝光快速入睡，巩固今日成果。</p>
                    </div>

                    <div className="analysis-sheet__section">
                      <p className="analysis-sheet__label">增加今日计划</p>
                      <div className="analysis-card">
                        <div className="analysis-card__row">
                          <div className="analysis-card__icon" aria-hidden="true">
                            <PhoneMuteIcon />
                          </div>
                          <div className="analysis-card__text">
                            <h3>远离手机</h3>
                            <p>晚10:30后无法打开除必要通讯工作软件外其他软件</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="moment-summary__cta analysis-card__cta"
                          onClick={onConfirmPlan}
                        >
                          <AiSparkIcon className="icon icon--sparkle-outline" />
                          <span>确认计划</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="analysis-sheet__chat-bubble">
                      <p>你好，Wilo。我现在感觉有些头晕，而且注意力不太集中</p>
                    </div>

                    <div className="analysis-sheet__header">
                      <p className="analysis-sheet__thinking-time">已思考 3s</p>
                      <p>根据我目前整合的数据（饮食记录、心率及周围环境等）：</p>
                      <p>◎你的血糖在 12:30的高碳水午餐后目前正处于下降区间。</p>
                      <p>◎当前室内湿度为28%，属于极度干燥，这可能加速了轻微脱水。</p>
                    </div>

                    <div className="analysis-sheet__section">
                      <p className="analysis-sheet__label">建议动作</p>
                      <div className="analysis-card">
                        <div className="analysis-card__row">
                          <div className="analysis-card__icon" aria-hidden="true">
                            <PhoneMuteIcon />
                          </div>
                          <div className="analysis-card__text">
                            <h3>活动一下</h3>
                            <p>饮用300ml 柠檬水。我会为你开启5分钟的“脑波调节”背景音乐。</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="moment-summary__cta analysis-card__cta analysis-card__cta--plain"
                          onClick={onOpenWilo}
                        >
                          <span>Wilo 一下</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="analysis-input-bar">
                <button type="button" className="analysis-input-bar__icon">
                  <GalleryIcon />
                </button>
                <div className="analysis-input-bar__field">
                  <span>输入你的身体感受</span>
                </div>
                <button type="button" className="analysis-input-bar__icon">
                  <MicIcon />
                </button>
              </div>
            </section>
          </>
        ) : null}

        <AppBottomDock
          className="bottom-area--moments"
          activeTab="moments"
          onSelectDaily={onGoHome}
          onSelectMoments={() => {}}
          onSelectWilo={onOpenWilo}
          onOpenAnalysis={onOpenAgentAnalysis}
        />
      </section>
    </main>
  );
}

function WeekEnergyBar() {
  return (
    <div className="week-energy-bar" aria-hidden="true">
      {periodSegments.map((segment, index) => (
        <div
          key={`${segment.color}-${index}`}
          className={`week-energy-bar__segment${segment.label ? ' week-energy-bar__segment--labelled' : ''}`}
          style={
            {
              '--segment-color': segment.color,
              '--segment-grow': segment.grow,
            } as CSSProperties
          }
        >
          {segment.label ? (
            <span className="week-energy-bar__label" style={{ color: segment.labelColor }}>
              {segment.label}
            </span>
          ) : null}
        </div>
      ))}
    </div>
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

function GalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="10" r="1.6" fill="currentColor" />
      <path d="M6.5 17l4.2-4.2 2.8 2.8 2.7-2.7 1.3 1.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
