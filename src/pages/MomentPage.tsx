import { BottomNav, StatusBar } from './HomePage';

type MomentPageProps = {
  mode: 'day' | 'week';
  analysisOpen?: boolean;
  onGoHome: () => void;
  onOpenDay: () => void;
  onOpenWeek: () => void;
  onOpenAnalysis: () => void;
  onCloseAnalysis: () => void;
  onConfirmPlan: () => void;
  onOpenWilo: () => void;
};

const daySegments = [
  { color: '#A3E9B2', width: '10%' },
  { color: '#F3D492', width: '7%' },
  { color: '#ACC7EC', width: '63%', label: '平静71%', labelColor: '#1E4885' },
  { color: '#D8DFDE', width: '14%' },
  { color: '#F0AC98', width: '6%' },
];

const weekSegments = [
  { color: '#A3E9B2', width: '30%', label: '兴奋30%', labelColor: '#21612C' },
  { color: '#F3D492', width: '30%', label: '焦虑 30%', labelColor: '#6F5011' },
  { color: '#ACC7EC', width: '22%' },
  { color: '#D8DFDE', width: '10%' },
  { color: '#8E5A49', width: '8%' },
];

const dayBubbles = [
  {
    emotion: '平静',
    time: '0:00 - 6:10',
    top: 0,
    left: 216,
    size: 160,
    background:
      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(198,219,249,0.95) 70%, rgba(198,219,249,0.88))',
    textColor: '#3D83E2',
  },
  {
    emotion: '疲惫',
    time: '22:10 -22:40',
    top: 158,
    left: 64,
    size: 106,
    background:
      'radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95), rgba(233,236,235,0.96) 72%, rgba(228,232,231,0.92))',
    textColor: '#242A29',
  },
  {
    emotion: '兴奋',
    time: '10:10 - 12:10',
    top: 255,
    left: 212,
    size: 108,
    background:
      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(202,244,206,0.95) 74%, rgba(189,238,195,0.92))',
    textColor: '#15853B',
  },
  {
    emotion: '平静',
    time: '15:10-15:50',
    top: 359,
    left: 103,
    size: 104,
    background:
      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(200,221,250,0.95) 72%, rgba(195,217,248,0.9))',
    textColor: '#3D83E2',
  },
];

const weekDays = [
  { label: '一', score: '3.4', tone: 'calm' },
  { label: '二', score: '2.9', tone: 'excited' },
  { label: '三', score: '2.6', tone: 'anxious' },
  { label: '四', score: '3.1', tone: 'calm' },
  { label: '五', score: '2.8', tone: 'neutral' },
  { label: '六', score: '2.4', tone: 'low' },
  { label: '日', score: '3.0', tone: 'calm' },
];

export function MomentPage({
  mode,
  analysisOpen = false,
  onGoHome,
  onOpenDay,
  onOpenWeek,
  onOpenAnalysis,
  onCloseAnalysis,
  onConfirmPlan,
  onOpenWilo,
}: MomentPageProps) {
  const isWeek = mode === 'week';

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
                  className={`moment-switch${!isWeek ? ' moment-switch--active' : ''}`}
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
                <button type="button" className="moment-switch">
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

                  <div className="moment-summary__segments" aria-hidden="true">
                    {weekSegments.map((segment, index) => (
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

                  <p className="moment-summary__text moment-summary__text--week">
                    本周身心处于一种高代谢、高反应性的模式，既是挑战（易引发情绪化进食、睡眠差），也是机会（高兴奋度可转化为运动动力）
                  </p>

                  <button type="button" className="moment-summary__cta" onClick={onOpenAnalysis}>
                    <SparkleOutlineIcon />
                    <span>Wilo 建议</span>
                  </button>
                </section>

                <section className="week-grid">
                  <div className="week-grid__labels">
                    {weekDays.map((day) => (
                      <span key={day.label}>{day.label}</span>
                    ))}
                  </div>
                  <div className="week-grid__bars">
                    {weekDays.map((day) => (
                      <div key={day.label} className="week-grid__day">
                        <div className={`week-grid__bar week-grid__bar--${day.tone}`} />
                        <span>{day.score}</span>
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

                  <button type="button" className="moment-summary__cta" onClick={onOpenAnalysis}>
                    <SparkleOutlineIcon />
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

        {analysisOpen ? (
          <>
            <button
              type="button"
              className="analysis-overlay"
              aria-label="关闭分析面板"
              onClick={onCloseAnalysis}
            />
            <section className="analysis-sheet">
              <div className="analysis-sheet__content">
                <div className="analysis-sheet__header">
                  <h2>Wilo 实时深度分析中</h2>
                  <p>
                    根据我目前整合的数据（运动记录、心率及周围环境等）：
                    建议今晚10:30后远离蓝光快速入睡，巩固今日成果。
                  </p>
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
                      <SparkleOutlineIcon />
                      <span>确认计划</span>
                    </button>
                  </div>
                </div>
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

        <footer className="bottom-area bottom-area--moments">
          <button type="button" className="wilo-shortcut wilo-shortcut--moments" onClick={onOpenWilo}>
            <SparkleOutlineIcon />
            <span>Wilo 一下</span>
          </button>
          <BottomNav
            activeTab="moments"
            onSelectDaily={onGoHome}
            onSelectMoments={() => {}}
          />
        </footer>
      </section>
    </main>
  );
}

function SparkleOutlineIcon() {
  return (
    <svg viewBox="0 0 20 20" className="icon icon--sparkle-outline" aria-hidden="true">
      <path
        d="M10 2.2l1.3 3.6 3.6 1.3-3.6 1.3L10 12l-1.3-3.6L5 7.1l3.7-1.3L10 2.2zm-5.2 8l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2zm10.6.7l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
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
