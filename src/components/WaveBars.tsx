import type { CSSProperties } from 'react';

type WaveBarsProps = {
  bars: number[];
  height?: number;
  fillWidth?: boolean;
  accentStart?: number;
  accentEnd?: number;
  accentIndexes?: number[];
  accentColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  style?: CSSProperties;
};

export function WaveBars({
  bars,
  height = 66,
  fillWidth = false,
  accentStart,
  accentEnd,
  accentIndexes,
  accentColor = '#79d890',
  backgroundColor = 'rgba(255, 255, 255, 0.52)',
  borderRadius = 999,
  style,
}: WaveBarsProps) {
  return (
    <div
      className="wave-bars-component"
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        height: `${height}px`,
        width: '100%',
        gap: fillWidth ? '2px' : '5px',
        ...style,
      }}
    >
      {bars.map((barHeight, index) => {
        const isAccentByRange = accentStart !== undefined && accentEnd !== undefined &&
          index >= accentStart && index <= accentEnd;
        const isAccentByIndexes = accentIndexes !== undefined && accentIndexes.includes(index);
        const isAccent = isAccentByRange || isAccentByIndexes;
        return (
          <span
            key={`${barHeight}-${index}`}
            style={{
              flex: fillWidth ? 1 : '0 0 auto',
              width: fillWidth ? undefined : '7px',
              height: `${barHeight}px`,
              borderRadius: `${borderRadius}px`,
              background: isAccent ? accentColor : backgroundColor,
            }}
          />
        );
      })}
    </div>
  );
}
