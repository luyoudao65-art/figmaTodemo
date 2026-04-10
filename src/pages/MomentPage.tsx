import type { CSSProperties } from 'react';
import { AiSparkIcon, HomeFloatingBar } from '../components/HomeFloatingBar';
import { WiloAnalysisSheet } from '../components/WiloAnalysisSheet';
import { StatusBar } from './HomePage';

const dayBubbleAssets = {
  calmLarge: 'https://www.figma.com/api/mcp/asset/d46bbf88-df7e-43cb-8f89-9a9e8eaefba0',
  calmSmall: 'https://www.figma.com/api/mcp/asset/d59a057d-4d95-4953-b469-830fd54bafa6',
  tired: 'https://www.figma.com/api/mcp/asset/b10ca5ab-7db0-4745-a305-5d73031033b2',
  excited: 'https://www.figma.com/api/mcp/asset/88f29e49-79de-431e-b9fa-ef2a5496996d',
};

const weekChartAssets = [
  { day: '一', date: '23', src: 'https://www.figma.com/api/mcp/asset/d40b2356-0dbe-4377-8b8c-484a2efafce5' },
  { day: '二', date: '24', src: 'https://www.figma.com/api/mcp/asset/0f7e4157-f539-4334-bc6a-6d0b94aeec0c' },
  { day: '三', date: '25', src: 'https://www.figma.com/api/mcp/asset/efe05c9a-e3aa-4492-8287-6b1399988861' },
  { day: '四', date: '26', src: 'https://www.figma.com/api/mcp/asset/105f6c91-46f9-41ca-a2e7-f401296a914f' },
  { day: '五', date: '27', src: 'https://www.figma.com/api/mcp/asset/5230ecbf-7ca1-4b9b-8d02-49033a5ed934' },
  { day: '六', date: '28', src: 'https://www.figma.com/api/mcp/asset/2c3180ae-6910-4286-beab-d98220e1a2b5' },
  { day: '日', date: '29' },
];

type MomentPageProps = {
  mode: 'day' | 'week' | 'month';
  overlay?: 'none' | 'wilo-suggest' | 'agent-analysis';
  onGoHome: () => void;
  onOpenDay: () => void;
  onOpenWeek: () => void;
  onOpenMonth: () => void;
  onOpenPlan: () => void;
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
    top: 8,
    left: 192,
    width: 167,
    height: 157,
    image: dayBubbleAssets.calmLarge,
    textColor: '#4C87DA',
    titleSize: 17,
    timeSize: 15,
  },
  {
    emotion: '疲惫',
    time: '22:10 -22:40',
    top: 181,
    left: 36,
    width: 113,
    height: 106,
    image: dayBubbleAssets.tired,
    textColor: '#242A29',
    titleSize: 17,
    timeSize: 11,
  },
  {
    emotion: '兴奋',
    time: '10:10 - 12:10',
    top: 286,
    left: 200,
    width: 114,
    height: 107,
    image: dayBubbleAssets.excited,
    textColor: '#2A853B',
    titleSize: 17,
    timeSize: 11,
  },
  {
    emotion: '平静',
    time: '15:10-15:50',
    top: 395,
    left: 73,
    width: 110,
    height: 103,
    image: dayBubbleAssets.calmSmall,
    textColor: '#4C87DA',
    titleSize: 15,
    timeSize: 11,
  },
];

export function MomentPage({
  mode,
  overlay = 'none',
  onGoHome,
  onOpenDay,
  onOpenWeek,
  onOpenMonth: _onOpenMonth,
  onOpenPlan,
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
                    <InlineSparkDot />
                  </p>

                  <button type="button" className="moment-summary__cta" onClick={onOpenWiloSuggest}>
                    <AiSparkIcon className="icon icon--sparkle-outline" />
                    <span>Wilo 建议</span>
                  </button>
                </section>

                <section className="period-grid">
                  <div className="period-grid__labels">
                    {weekChartAssets.map((day) => (
                      <span key={day.day}>{day.day}</span>
                    ))}
                  </div>
                  <div className="period-grid__dates">
                    {weekChartAssets.map((day) => (
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
                      {weekChartAssets.map((day) => (
                        <div key={`${day.day}-${day.date}`} className="period-grid__column">
                          {day.src ? (
                            <img className="period-grid__day-art" src={day.src} alt="" />
                          ) : (
                            <span className="period-grid__day-art period-grid__day-art--empty" />
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
                    <InlineSparkDot />
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
                    <InlineSparkDot />
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
                          width: bubble.width,
                          height: bubble.height,
                          color: bubble.textColor,
                          '--moment-bubble-title-size': `${bubble.titleSize}px`,
                          '--moment-bubble-time-size': `${bubble.timeSize}px`,
                        } as CSSProperties}
                      >
                        <img className="moment-bubble__skin" src={bubble.image} alt="" />
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

        {isWiloSuggestOpen ? (
          <WiloAnalysisSheet variant="suggest" onClose={onCloseOverlay} onPrimaryAction={onConfirmPlan} />
        ) : null}

        {isAgentAnalysisOpen ? (
          <WiloAnalysisSheet variant="agent" onClose={onCloseOverlay} onPrimaryAction={onOpenWilo} />
        ) : null}

        <HomeFloatingBar
          className="home-floating-bar--moments"
          onCenterClick={onOpenWilo}
          onOpenAnalysis={onOpenAgentAnalysis}
          leftTab={{ label: '主页', icon: 'home', onClick: onGoHome }}
          rightTab={{ label: '计划', icon: 'plan', onClick: onOpenPlan }}
        />
      </section>
    </main>
  );
}

function InlineSparkDot() {
  return <span className="inline-spark-dot" aria-hidden="true" />;
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
