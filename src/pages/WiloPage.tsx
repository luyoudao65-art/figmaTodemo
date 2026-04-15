

type WiloPageProps = {
  onBack: () => void;
};

const bars = [
  82, 56, 66, 44, 58, 45, 67, 52, 39, 47, 58, 76, 63, 54, 48, 67, 57, 52, 64, 58, 72, 61, 44, 72, 50, 76, 60, 52,
  78, 43, 38, 29, 18, 37, 25, 17, 32, 29, 22, 31, 18, 27,
];

export function WiloPage({ onBack }: WiloPageProps) {
  return (
    <main className="app-shell app-shell--moment-dark">
      <section className="phone-frame phone-frame--moments phone-frame--moments-dark">
        <div className="phone-scroll phone-scroll--moment-dark phone-scroll--wilo">

          <header className="wilo-page__nav">
            <button type="button" className="page-back-button page-back-button--inline" onClick={onBack} aria-label="返回">
              <ChevronLeftIcon />
            </button>
            <h1>Wilo 一下</h1>
            <div className="wilo-page__nav-spacer" />
          </header>

          <section className="wilo-page">
            <div className="wilo-orb" aria-hidden="true">
              <WiloCircleGraphic />
            </div>
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

function WiloCircleGraphic() {
  return (
    <svg viewBox="0 0 250 250" className="wilo-orb__svg" aria-hidden="true">
      <defs>
        <mask id="wilo-orb-mask">
          <circle cx="124.687" cy="124.687" r="124.687" fill="url(#wilo-orb-mask-radial)" />
          <circle cx="124.687" cy="124.687" r="124.687" fill="url(#wilo-orb-mask-linear-blue)" fillOpacity="0.2" />
          <circle cx="124.687" cy="124.687" r="124.687" fill="url(#wilo-orb-mask-linear-warm)" fillOpacity="0.2" />
        </mask>

        <filter id="wilo-orb-texture-cyan" x="-58" y="-26" width="440" height="390" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.5 0.5" numOctaves="3" seed="7342" />
          <feDisplacementMap in="shape" scale="154.8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" />
          <feMerge>
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>

        <filter id="wilo-orb-texture-blue" x="-95" y="-74" width="439" height="419" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.5 0.5" numOctaves="3" seed="7342" />
          <feDisplacementMap in="shape" scale="154.8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" />
          <feMerge>
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>

        <radialGradient id="wilo-orb-mask-radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.7812 146.854) rotate(54.9737) scale(189.485)">
          <stop stopColor="#CBFAF9" />
          <stop offset="1" stopColor="#F1F4F4" />
        </radialGradient>
        <linearGradient id="wilo-orb-mask-linear-blue" x1="145.469" y1="-0.692711" x2="95.5937" y2="168.328" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ACC7EC" />
          <stop offset="1" stopColor="#FAFAFA" />
        </linearGradient>
        <linearGradient id="wilo-orb-mask-linear-warm" x1="81.7396" y1="130.922" x2="124.687" y2="249.375" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAFAFA" />
          <stop offset="1" stopColor="#F8E4BA" />
        </linearGradient>
        <radialGradient id="wilo-orb-base-radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.7812 146.854) rotate(54.9737) scale(189.485)">
          <stop stopColor="#EAF1FA" />
          <stop offset="1" stopColor="#FAFAFA" />
        </radialGradient>
        <linearGradient id="wilo-orb-base-linear" x1="124.24" y1="0" x2="125.832" y2="254.85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4C87DA" />
          <stop offset="1" stopColor="#FAFAFA" />
        </linearGradient>
        <linearGradient id="wilo-orb-cyan-sheen" x1="131.635" y1="79.8994" x2="182.779" y2="270.773" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4C6" />
          <stop offset="1" stopColor="#CBFAF9" />
        </linearGradient>
        <linearGradient id="wilo-orb-blue-sheen" x1="179.84" y1="215.302" x2="81.0367" y2="44.1693" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4C87DA" />
          <stop offset="1" stopColor="#CBFAF9" />
        </linearGradient>
      </defs>

      <g mask="url(#wilo-orb-mask)">
        <circle cx="124.687" cy="124.687" r="124.687" fill="url(#wilo-orb-base-radial)" />
        <circle cx="124.687" cy="124.687" r="124.687" fill="url(#wilo-orb-base-linear)" fillOpacity="0.2" />
        <g opacity="0.4" filter="url(#wilo-orb-texture-cyan)">
          <path d="M20.6208 160.212C17.87 190.025 19.1453 222.152 37.9992 254.5C90.4418 344.478 287.481 218.089 300.13 205.447C325.003 180.589 239.967 47.2333 234.071 52.5166C216.005 68.7038 184.779 203.359 172.325 203.229C140.791 202.9 131.087 134.281 102.187 124.807C77.701 116.78 92.2852 206.882 68.8469 199.101C53.9146 194.143 21.8697 146.677 20.6208 160.212Z" fill="url(#wilo-orb-cyan-sheen)" />
        </g>
        <g opacity="0.4" filter="url(#wilo-orb-texture-blue)">
          <path d="M266.285 108.993C261.226 79.4842 251.679 48.7826 225.095 22.4161C151.151 -50.923 -6.46178 122.157 -15.4082 137.642C-32.999 168.091 83.6539 274.894 87.9818 268.264C101.242 247.953 96.5534 109.804 108.617 106.706C139.161 98.863 166.295 162.631 196.662 164.303C222.391 165.719 184.983 82.4616 209.637 83.9119C225.344 84.8358 268.582 122.39 266.285 108.993Z" fill="url(#wilo-orb-blue-sheen)" />
        </g>
      </g>
    </svg>
  );
}
