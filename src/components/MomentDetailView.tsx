import type { ReactNode } from 'react';

type MomentDetailViewProps = {
  title: string;
  time: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  chart: ReactNode;
  onBack: () => void;
  titleIcon?: ReactNode;
  accessory?: ReactNode;
  cardClassName?: string;
  emotion?: 'excited' | 'anxious';
};

export function MomentDetailView({
  title,
  time,
  imageSrc,
  imageAlt,
  description,
  chart,
  onBack,
  titleIcon,
  accessory,
  cardClassName = '',
  emotion,
}: MomentDetailViewProps) {
  return (
    <div className="moment-dark-page moment-dark-page--detail">
      <header className="moment-detail-header">
        <button type="button" className="moment-detail-header__button" onClick={onBack} aria-label="返回">
          <BackIcon />
        </button>
        <h1>瞬间</h1>
        <button type="button" className="moment-detail-header__button" aria-label="分享">
          <ShareIcon />
        </button>
      </header>

      <section className={`moment-detail-card ${cardClassName}`.trim()}>
        <img className="moment-detail-card__image" src={imageSrc} alt={imageAlt} />

        <div className="moment-detail-card__body">
          <div className="moment-detail-card__title-row">
            <div className="moment-detail-card__title-content">
              <h2>{title}</h2>
              <span>{time}</span>
            </div>
            <div className="moment-detail-card__title-icons">
              {emotion === 'excited' && <StairIcon />}
              {titleIcon}
            </div>
          </div>

          {chart}

          {accessory}

          <p className="moment-detail-card__text">{description}</p>
        </div>
      </section>
    </div>
  );
}

function StairIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M22.1667 5.83334C21.5478 5.83334 20.9543 6.07918 20.5168 6.51676C20.0792 6.95435 19.8333 7.54784 19.8333 8.16668V21M2.33334 21C3.03334 21.5833 3.73334 22.1667 5.25001 22.1667C8.16668 22.1667 8.16668 19.8333 11.0833 19.8333C14.1167 19.8333 13.8833 22.1667 16.9167 22.1667C19.8333 22.1667 19.8333 19.8333 22.75 19.8333C24.2667 19.8333 24.9667 20.4167 25.6667 21M8.16668 15.1667H19.8333M8.16668 10.5H19.8333M10.5 5.83334C9.88117 5.83334 9.28768 6.07918 8.85009 6.51676C8.41251 6.95435 8.16668 7.54784 8.16668 8.16668V21" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon" aria-hidden="true">
      <path d="M12 2V15M12 2L16 6M12 2L8 6M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
