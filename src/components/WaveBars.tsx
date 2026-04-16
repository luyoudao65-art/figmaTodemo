import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

export type EmotionType = 'excited' | 'anxious' | 'neutral';

export type WaveBarsProps = {
  bars?: number[];
  barColors?: string[];
  height?: number;
  gap?: number;
  barWidth?: number;
  minBarWidth?: number;
  maxBarWidth?: number;
  justify?: CSSProperties['justifyContent'];
  accentStart?: number;
  accentEnd?: number;
  accentColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  animated?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  className?: string;
  style?: CSSProperties;
  emotion?: EmotionType;
  barDepth?: number;  // 0-1, 随机深浅变化强度
};

function generateBars(emotion: EmotionType, count: number): number[] {
  const bars: number[] = [];
  
  for (let i = 0; i < count; i++) {
    if (emotion === 'excited') {
      bars.push(40 + Math.sin((i / count) * Math.PI) * 50 + Math.random() * 10);
    } else if (emotion === 'anxious') {
      bars.push(30 + Math.sin((i / count) * Math.PI * 2) * 55 + Math.random() * 20);
    } else {
      bars.push(20 + Math.random() * 30);
    }
  }
  
  return bars;
}

export function WaveBars({
  bars,
  barColors,
  height = 60,
  gap = 2,
  barWidth,
  minBarWidth = 4,
  maxBarWidth,
  justify = 'flex-start',
  accentStart,
  accentEnd,
  accentColor,
  backgroundColor = 'rgba(255, 255, 255, 0.15)',
  borderRadius = 0,
  animated = false,
  animationDelay = 0,
  animationDuration,
  className = '',
  style,
  emotion = 'neutral',
  barDepth = 0,
}: WaveBarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [barCount, setBarCount] = useState(bars?.length ?? 24);
  const [isAnimating, setIsAnimating] = useState(animated);

  useEffect(() => {
    if (animated && animationDuration) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [animated, animationDuration]);

  useEffect(() => {
    if (bars) {
      setBarCount(bars.length);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const updateBarCount = () => {
      const containerWidth = container.offsetWidth;
      const effectiveMinWidth = barWidth ?? minBarWidth;
      const possibleCount = Math.floor(containerWidth / (effectiveMinWidth + gap));
      setBarCount(Math.max(1, possibleCount));
    };

    updateBarCount();

    const resizeObserver = new ResizeObserver(() => {
      updateBarCount();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [bars, barWidth, gap, minBarWidth]);

  const barData = bars ?? generateBars(emotion, barCount);
  
  const accentColorFinal = accentColor ?? (emotion === 'excited' ? '#79d890' : emotion === 'anxious' ? '#8b7fc7' : backgroundColor);
  const showAccent = emotion !== 'neutral';
  
  const emotionClass = emotion !== 'neutral' ? ` wave-bars--${emotion}` : '';
  
  return (
    <div
      ref={containerRef}
      className={`wave-bars${isAnimating ? ' wave-bars--animated' : ''}${emotionClass}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: justify,
        height: `${height}px`,
        width: '100%',
        gap: `${gap}px`,
        marginTop: '10px',
        ...style,
      }}
    >
      {barData.map((barHeight, index) => {
        const isAccent = showAccent && accentStart !== undefined && accentEnd !== undefined && index >= accentStart && index <= accentEnd;
        const hasExplicitBarColor = Boolean(barColors?.[index]);
        const depthOpacity = isAccent
          ? 1
          : hasExplicitBarColor
            ? 1
            : 0.26 + ((Math.sin(index * 1.37) + 1) / 2) * Math.max(0, Math.min(barDepth, 1)) * 0.58;
        
        return (
          <span
            key={`${barHeight}-${index}`}
            className={isAccent ? 'wave-bars__bar wave-bars__bar--accent' : 'wave-bars__bar'}
            style={{
              flex: barWidth !== undefined ? '0 0 auto' : 1,
              width: barWidth !== undefined ? `${barWidth}px` : undefined,
              minWidth: barWidth !== undefined ? undefined : maxBarWidth ? undefined : `${minBarWidth}px`,
              maxWidth: barWidth !== undefined ? `${barWidth}px` : maxBarWidth ? `${maxBarWidth}px` : undefined,
              height: `${barHeight}px`,
              borderRadius: `${borderRadius}px`,
              background: isAccent ? accentColorFinal : barColors?.[index] ?? backgroundColor,
              opacity: depthOpacity,
              animationDelay: animated ? `${animationDelay + index * 30}ms` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
