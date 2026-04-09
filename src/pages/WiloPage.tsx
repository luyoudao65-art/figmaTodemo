import { StatusBar } from './HomePage';

type WiloPageProps = {
  onBack: () => void;
};

const bars = [
  82, 56, 66, 44, 58, 45, 67, 52, 39, 47, 58, 76, 63, 54, 48, 67, 57, 52, 64, 58, 72, 61, 44, 72, 50, 76, 60, 52,
  78, 43, 38, 29, 18, 37, 25, 17, 32, 29, 22, 31, 18, 27,
];

export function WiloPage({ onBack }: WiloPageProps) {
  return (
    <main className="app-shell">
      <section className="phone-frame phone-frame--moments">
        <div className="phone-scroll phone-scroll--wilo">
          <StatusBar />
          <header className="wilo-page__nav">
            <button type="button" className="page-back-button page-back-button--inline" onClick={onBack} aria-label="返回">
              <ChevronLeftIcon />
            </button>
            <h1>Wilo 一下</h1>
            <div className="wilo-page__nav-spacer" />
          </header>

          <section className="wilo-page">
            <div className="wilo-orb" aria-hidden="true" />
            <div className="wilo-timer">
              <strong>05：00</strong>
              <span>倒计时</span>
            </div>
            <div className="wilo-wave">
              <div className="wilo-wave__bars" aria-hidden="true">
                {bars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className={`wilo-wave__bar${index === 0 ? ' wilo-wave__bar--accent' : ''}${index > 27 ? ' wilo-wave__bar--fade' : ''}`}
                    style={{ height }}
                  />
                ))}
              </div>
              <div className="wilo-wave__times">
                <span>12:30</span>
                <span>14:00</span>
              </div>
            </div>
            <button type="button" className="wilo-page__end-button" onClick={onBack}>
              结束
            </button>
          </section>
        </div>
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
