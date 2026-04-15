import type { CSSProperties } from 'react';

type RelatedPeopleButtonProps = {
  people: string[];
  onClick: () => void;
  label?: string;
  className?: string;
};

export function RelatedPeopleButton({
  people,
  onClick,
  label = '关联人物',
  className = '',
}: RelatedPeopleButtonProps) {
  return (
    <button
      type="button"
      className={`moment-related-button ${className}`.trim()}
      onClick={onClick}
      aria-label={`打开${label}记忆`}
    >
      <div className="moment-people-badge moment-people-badge--related" aria-hidden="true">
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
      <span className="moment-related-button__label">{label}</span>
    </button>
  );
}
