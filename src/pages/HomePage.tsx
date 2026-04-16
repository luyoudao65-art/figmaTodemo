import { WiloAnalysisSheet } from '../components/WiloAnalysisSheet';
import { HomeFloatingBar } from '../components/HomeFloatingBar';
import { WaveBars } from '../components/WaveBars';
import homeCardImage from '../pic/FigmaPic/moment.png';
import ellipseIcon from '../icons/Ellipse 3258.svg';
import stairIcon from '../icons/stair.svg';

type HomePageProps = {
  onOpenMoments: () => void;
  onOpenPlan: () => void;
  onOpenWilo: () => void;
  onOpenGoalAnalysis: () => void;
  goalAnalysisOpen?: boolean;
  onCloseGoalAnalysis: () => void;
};

const homeHeroBars = [
  27, 15, 18, 10, 15, 9, 10, 17, 13, 17, 24, 15,
  17, 13, 11, 15, 20, 17, 18, 22, 17, 11, 17, 22,
  24, 14, 17, 10, 9, 3, 8, 8, 6, 3, 8, 7,
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
    <main className="app-shell app-shell--home-dark">
      <section className="phone-frame phone-frame--home-dark">
        <div className="phone-scroll phone-scroll--home-dark">
            <section className="home-dark-hero">
            <div className="home-dark-hero__content">
              <div className="home-dark-hero__header">
                <div className="home-dark-profile">
                  <img className="home-dark-profile__avatar" src={ellipseIcon} alt="" aria-hidden="true" />
                  <strong>Hi, Leo</strong>
                </div>

                <div className="home-dark-date-pill" aria-label="当前日期 28">
                  28
                </div>
              </div>

              <div className="home-dark-card-cluster">
                <div className="home-dark-stack">
                  <div className="home-dark-stack__card home-dark-stack__card--anger">
                    <div className="home-dark-stack__thumb" />
                    <div className="home-dark-stack__meta">
                      <strong>愤怒</strong>
                      <span>12:00-14:00</span>
                    </div>
                  </div>

                  <div className="home-dark-stack__card home-dark-stack__card--anxiety">
                    <div className="home-dark-stack__thumb" />
                    <div className="home-dark-stack__meta">
                      <strong>焦虑</strong>
                      <span>12:00-14:00</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="home-dark-moment-card"
                  onClick={onOpenMoments}
                  aria-label="打开 Moment 页面"
                >
                  <div className="home-dark-moment-card__image-wrap">
                    <img
                      className="home-dark-moment-card__image"
                      src={homeCardImage}
                      alt="水上运动时刻"
                    />
                  </div>

                  <div className="home-dark-moment-card__body">
                    <div className="home-dark-moment-card__copy">
                      <div>
                        <strong>兴奋</strong>
                        <span>13:00-14:00</span>
                      </div>
                      <img
                        className="home-dark-moment-card__accent"
                        src={stairIcon}
                        alt=""
                        aria-hidden="true"
                      />
                    </div>

                    <div className="home-dark-wave" aria-hidden="true">
                      <WaveBars
                        bars={homeHeroBars}
                        height={28}
                        fillWidth
                        accentStart={18}
                        accentEnd={35}
                        accentColor="rgba(216, 223, 222, 0.72)"
                        backgroundColor="rgba(128, 131, 131, 0.5)"
                        borderRadius={1}
                      />
                    </div>

                    <div className="home-dark-pager" aria-hidden="true">
                      <span className="home-dark-pager__dot home-dark-pager__dot--active" />
                      <span className="home-dark-pager__dot" />
                      <span className="home-dark-pager__dot" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </section>

          <section className="home-dark-content">
            <section className="home-dark-panel">
              <button
                type="button"
                className="home-dark-panel__header"
                onClick={onOpenGoalAnalysis}
                aria-label="打开睡眠提升分析"
              >
                <div className="home-dark-panel__header-main">
                  <div className="home-dark-panel__title-group">
                    <h2>睡眠提升</h2>
                  </div>
                  <div className="home-dark-panel__progress-group">
                    <span>连续 14天</span>
                    <div className="home-dark-progress" aria-hidden="true">
                      <span style={{ width: '62%' }} />
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                className="home-dark-wilo-card"
                onClick={onOpenWilo}
                aria-label="打开 Wilo"
              >
<div className="home-dark-wilo-card__icon">
                    <StarIcon className="icon icon--home-dark-spark" />
                  </div>
                <div className="home-dark-wilo-card__copy">
                  <strong>Wilo 一下</strong>
                  <span>检测到心率上升过快，已为你播放放松音乐</span>
                </div>
              </button>
            </section>
          </section>
        </div>

        <HomeFloatingBar
          tone="dark"
          className="home-floating-bar--moments-dark"
          leftTab={{ label: '主页', icon: 'home', active: true }}
          rightTab={{ label: '计划', icon: 'plan', onClick: onOpenPlan }}
        />

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

function StarIcon({ className = 'icon' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M19.811 10.4668C19.9181 10.8821 20.1346 11.261 20.4379 11.5643C20.7411 11.8676 21.1201 12.084 21.5354 12.1911L27.5638 15.4228C27.6894 15.4585 27.8 15.5341 27.8787 15.6383C27.9574 15.7424 28 15.8694 28 16C28 16.1306 27.9574 16.2576 27.8787 16.3617C27.8 16.4659 27.6894 16.5415 27.5638 16.5772L21.5354 19.8101C21.1202 19.9171 20.7414 20.1334 20.4381 20.4364C20.1349 20.7394 19.9183 21.1182 19.811 21.5332L16.5793 27.5617C16.544 27.6878 16.4685 27.7989 16.3641 27.878C16.2598 27.9572 16.1325 28 16.0015 28C15.8706 28 15.7433 27.9572 15.6389 27.878C15.5346 27.7989 15.459 27.6878 15.4238 27.5617L12.1933 21.5332C12.0861 21.118 11.8697 20.739 11.5664 20.4357C11.2632 20.1325 10.8842 19.916 10.4689 19.8089L4.44043 16.5784C4.31384 16.5435 4.20219 16.468 4.12263 16.3635C4.04307 16.259 3.99999 16.1313 3.99999 16C3.99999 15.8687 4.04307 15.741 4.12263 15.6365C4.20219 15.532 4.31384 15.4565 4.44043 15.4216L10.4689 12.1911C10.8842 12.084 11.2632 11.8676 11.5664 11.5643C11.8697 11.261 12.0861 10.8821 12.1933 10.4668L15.425 4.4383C15.4602 4.31221 15.5358 4.20112 15.6401 4.12198C15.7445 4.04285 15.8718 4.00001 16.0027 4.00001C16.1337 4.00001 16.261 4.04285 16.3653 4.12198C16.4697 4.20112 16.5452 4.31221 16.5805 4.4383L19.811 10.4668Z"
        fill="#AAB3B2"
      />
      <path
        d="M26.6667 4V9.33333M29.3333 6.66667H24M5.33333 22.6667V25.3333M6.66667 24H4"
        stroke="#AAB3B2"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
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
