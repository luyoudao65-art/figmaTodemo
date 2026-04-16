import { useState } from 'react';
import type { CSSProperties } from 'react';
import { AiSparkIcon, HomeFloatingBar } from '../components/HomeFloatingBar';
import { MomentDetailView } from '../components/MomentDetailView';
import { RelatedPeopleButton } from '../components/RelatedPeopleButton';
import { WiloAnalysisSheet } from '../components/WiloAnalysisSheet';
import { WaveBars } from '../components/WaveBars';
import excitedImage from '../pic/FigmaPic/moment.png';
import anxiousImage from '../pic/FigmaPic/peopletalking.webp';
import stairIcon from '../icons/stair.svg';
import personOne from '../pic/people/Rectangle_279336331_2x.webp';
import personTwo from '../pic/people/Rectangle_279336332_2x.webp';
import personThree from '../pic/people/Rectangle_279336333_2x.webp';

const relatedPeople = [personOne, personTwo, personThree];
const momentDayPeople = relatedPeople;

const periodSegments = [
  { color: '#A3E9B2', grow: 58, label: '兴奋30%', labelColor: '#21612C' },
  { color: '#F3D492', grow: 58, label: '焦虑30%', labelColor: '#6F5011' },
  { color: '#ACC7EC', grow: 39 },
  { color: '#D8DFDE', grow: 18 },
  { color: '#F0AC98', grow: 14 },
];

const daySummarySegments = [
  { color: '#84d498', width: '28%' },
  { color: '#e2be75', width: '16%' },
  { color: '#ec8d75', width: '56%' },
];

const momentDayDates = [
  { weekday: '一', label: '23', active: false },
  { weekday: '二', label: '24', active: false },
  { weekday: '三', label: '25', active: false },
  { weekday: '四', label: '26', active: false },
  { weekday: '五', label: '27', active: false },
  { weekday: '六', label: '28', active: true },
  { weekday: '七', label: '29', active: false },
];

const dayTimelineBars = [18, 22, 15, 31, 38, 24, 45, 58, 50, 35, 28, 20, 16, 12, 10, 8, 9, 7, 11, 10, 8, 6, 9, 8];
const excitedDetailBars = [16, 22, 28, 35, 52, 68, 75, 82, 78, 65, 48, 38, 28, 24, 18, 15, 12, 14, 18, 22, 20, 16, 14, 12];
const anxiousDetailBars = [32, 28, 35, 42, 38, 32, 28, 24, 32, 48, 62, 78, 88, 95, 98, 95, 88, 72, 58, 45, 38, 32, 28, 24, 18, 15, 12, 10, 8, 6];

type DetailKind = 'excited' | 'anxious' | null;

type MomentPageProps = {
  mode: 'day' | 'month';
  overlay?: 'none' | 'wilo-suggest';
  initialDetail?: DetailKind;
  onGoHome: () => void;
  onOpenDay: () => void;
  onOpenMonth: () => void;
  onOpenPlan: () => void;
  onOpenWiloSuggest: () => void;
  onCloseOverlay: () => void;
  onConfirmPlan: () => void;
  onOpenFriendMemory: (detail: Exclude<DetailKind, null>) => void;
};

export function MomentPage({
  mode,
  overlay = 'none',
  initialDetail = null,
  onGoHome,
  onOpenDay,
  onOpenMonth,
  onOpenPlan,
  onOpenWiloSuggest,
  onCloseOverlay,
  onConfirmPlan,
  onOpenFriendMemory,
}: MomentPageProps) {
  const [selectedDetail, setSelectedDetail] = useState<DetailKind>(initialDetail);

  const isDay = mode === 'day';
  const isWiloSuggestOpen = overlay === 'wilo-suggest';
  const isExcitedDetailOpen = isDay && selectedDetail === 'excited';
  const isAnxiousDetailOpen = isDay && selectedDetail === 'anxious';

  return (
    <main className="app-shell app-shell--moment-dark">
      <section className="phone-frame phone-frame--moments phone-frame--moments-dark">
        <div className="phone-scroll phone-scroll--moment-dark">


          {isExcitedDetailOpen ? (
            <MomentDetailView
              title="兴奋"
              time="13:00-14:00"
              imageSrc={excitedImage}
              imageAlt="游泳运动时刻"
              description="今天完成了1小时游泳运动，有效提升了心肺耐力与全身代谢水平，心率区间稳定，无过度疲劳风险。这是你近期第2次和Grace结伴游泳。"
              onBack={() => setSelectedDetail(null)}
              emotion="excited"
              chart={
                <WaveBars
                  bars={excitedDetailBars}
                  height={100}
                  fillWidth
                  accentStart={4}
                  accentEnd={12}
                  accentColor="#79d890"
                />
              }
              accessory={
                <RelatedPeopleButton
                  people={relatedPeople}
                  onClick={() => onOpenFriendMemory('excited')}
                />
              }
            />
          ) : isAnxiousDetailOpen ? (
            <MomentDetailView
              title="焦虑"
              time="14:30-15:00"
              imageSrc={anxiousImage}
              imageAlt="交流中的焦虑时刻"
              description="检测到心率上升过快，皮质醇水平上升，呼吸变浅快，注意力难以集中。放轻松，已为你自动语音记录，不错过任何重点信息。"
              cardClassName="moment-detail-card--anxiety-view"
              onBack={() => setSelectedDetail(null)}
              emotion="anxious"
              chart={
                <WaveBars
                  bars={anxiousDetailBars}
                  height={120}
                  fillWidth
                  accentStart={10}
                  accentEnd={17}
                  accentColor="#f0ac98"
                />
              }
              accessory={
                <RelatedPeopleButton
                  people={relatedPeople}
                  onClick={() => onOpenFriendMemory('anxious')}
                />
              }
            />
          ) : isDay ? (
            <MomentDayScreen
              onOpenExcitedDetail={() => setSelectedDetail('excited')}
              onOpenAnxiousDetail={() => setSelectedDetail('anxious')}
              onOpenWiloSuggest={onOpenWiloSuggest}
              onOpenDay={onOpenDay}
              onOpenMonth={onOpenMonth}
            />
          ) : (
            <MomentMonthScreen
              onOpenDay={onOpenDay}
              onOpenMonth={onOpenMonth}
              onOpenWiloSuggest={onOpenWiloSuggest}
            />
          )}
        </div>

        {isWiloSuggestOpen ? (
          <WiloAnalysisSheet
            variant="moment-optimize"
            onClose={onCloseOverlay}
            onPrimaryAction={onConfirmPlan}
          />
        ) : null}

        <HomeFloatingBar
          className="home-floating-bar--moments-dark"
          leftTab={{ label: '主页', icon: 'home', onClick: onGoHome }}
          rightTab={{ label: '计划', icon: 'plan', onClick: onOpenPlan }}
        />
      </section>
    </main>
  );
}

function MomentDayScreen({
  onOpenExcitedDetail,
  onOpenAnxiousDetail,
  onOpenWiloSuggest,
  onOpenDay,
  onOpenMonth,
}: {
  onOpenExcitedDetail: () => void;
  onOpenAnxiousDetail: () => void;
  onOpenWiloSuggest: () => void;
  onOpenDay: () => void;
  onOpenMonth: () => void;
}) {
  return (
    <div className="moment-dark-page">
      <header className="moment-dark-header">
        <h1>瞬间</h1>
        <MomentSwitcher active="day" onOpenDay={onOpenDay} onOpenMonth={onOpenMonth} />
      </header>

      <section className="moment-dark-summary">
        <div className="moment-dark-summary__top">
          <div>
            <h2>今日状态波动大</h2>
          </div>
          <strong>3.28</strong>
        </div>

        <div className="moment-dark-summary__people-row">
          <PeopleBadge people={momentDayPeople} />
          <span className="moment-dark-summary__people-label">关联人物</span>
        </div>

        <div className="moment-dark-summary__segments" aria-hidden="true">
          {daySummarySegments.map((segment, index) => (
            <span
              key={`${segment.color}-${index}`}
              className="moment-dark-summary__segment"
              style={{ width: segment.width, backgroundColor: segment.color }}
            />
          ))}
        </div>

        <p className="moment-dark-summary__text">
          今天你的情绪经历了几次明显起伏，运动带来短暂兴奋，但整体恢复节律还不够稳定。
        </p>

        <button type="button" className="moment-dark-summary__cta" onClick={onOpenWiloSuggest}>
          <span>帮我优化</span>
        </button>
      </section>

      <div className="moment-day-date-row" aria-label="日期选择">
        {momentDayDates.map((date) => (
          <button
            key={`${date.weekday}-${date.label}`}
            type="button"
            className={`moment-day-date-pill${date.active ? ' moment-day-date-pill--active' : ''}`}
          >
            <span>{date.weekday}</span>
            <strong>{date.label}</strong>
          </button>
        ))}
      </div>

      <section className="moment-day-grid">
        <button
          type="button"
          className="moment-day-card moment-day-card--feature"
          onClick={onOpenExcitedDetail}
          aria-label="打开兴奋详情"
        >
          <div className="moment-day-card__media moment-day-card__media--feature">
            <img className="moment-day-card__image" src={excitedImage} alt="游泳运动时刻" />
          </div>
          <div className="moment-day-card__body moment-day-card__body--stacked">
            <div className="moment-day-card__meta-row">
              <div className="moment-day-card__copy-block">
                <strong>兴奋</strong>
                <span>13:00-14:00</span>
              </div>
              <img className="moment-day-card__accent-icon" src={stairIcon} alt="" aria-hidden="true" />
            </div>

            <div className="moment-day-card__chart">
              <WaveBars bars={dayTimelineBars} fillWidth backgroundColor="rgba(255, 255, 255, 0.52)" />
            </div>
          </div>
        </button>

        <button
          type="button"
          className="moment-day-card moment-day-card--anxious"
          onClick={onOpenAnxiousDetail}
          aria-label="打开焦虑详情"
        >
          <div className="moment-day-card__media moment-day-card__media--compact">
            <img className="moment-day-card__mini-image" src={anxiousImage} alt="室内交流引发焦虑的时刻" />
          </div>
          <div className="moment-day-card__body moment-day-card__body--compact">
            <div className="moment-day-card__meta-row">
              <div className="moment-day-card__copy-block">
                <strong>焦虑</strong>
                <span>10:00-11:00</span>
              </div>
            </div>
          </div>
        </button>

        <article className="moment-day-card moment-day-card--angry">
          <div className="moment-day-card__mini-copy">
            <strong>愤怒</strong>
            <span>15:00-15:30</span>
          </div>
        </article>
      </section>
    </div>
  );
}

function MomentMonthScreen({
  onOpenDay,
  onOpenMonth,
  onOpenWiloSuggest,
}: {
  onOpenDay: () => void;
  onOpenMonth: () => void;
  onOpenWiloSuggest: () => void;
}) {
  return (
    <div className="moment-page">
      <header className="moment-page__header">
        <h1 className="moment-page__title">瞬间</h1>
        <MomentSwitcher active="month" onOpenDay={onOpenDay} onOpenMonth={onOpenMonth} />
      </header>

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
    </div>
  );
}

function MomentSwitcher({
  active,
  onOpenDay,
  onOpenMonth,
}: {
  active: 'day' | 'month';
  onOpenDay: () => void;
  onOpenMonth: () => void;
}) {
  return (
    <div className="moment-page__switcher" aria-label="时间粒度">
      <button
        type="button"
        className={`moment-switch${active === 'day' ? ' moment-switch--active' : ''}`}
        onClick={onOpenDay}
      >
        日
      </button>
      <button
        type="button"
        className="moment-switch"
        disabled
        aria-disabled="true"
      >
        周
      </button>
      <button
        type="button"
        className={`moment-switch${active === 'month' ? ' moment-switch--active' : ''}`}
        onClick={onOpenMonth}
      >
        月
      </button>
    </div>
  );
}

function PeopleBadge({ people, compact = false }: { people: string[]; compact?: boolean }) {
  return (
    <div className={`moment-people-badge${compact ? ' moment-people-badge--compact' : ''}`}>
      {people.map((src, index) => (
        <span
          key={src}
          className="moment-people-badge__avatar"
          style={{ '--avatar-index': index } as CSSProperties}
        >
          <img src={src} alt="" />
        </span>
      ))}
    </div>
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

