import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface ComplianceScoreRingProps {
  score: number; // e.g. 92
  size?: number; // diameter in px, default 110
  strokeWidth?: number;
  className?: string;
  showSubtext?: boolean;
}

export const ComplianceScoreRing: React.FC<ComplianceScoreRingProps> = ({
  score = 92,
  size = 110,
  strokeWidth = 9,
  className,
  showSubtext = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 900; // 900ms as per DESIGN.md

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(easeOut * score));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Color determination: >= 90 is OK (green), 75-89 is WARN (amber), < 75 is RISK (red)
  const strokeColor = score >= 85 ? '#1E9E5A' : score >= 70 ? '#E8A317' : '#D64545';

  return (
    <div className={cn('relative inline-flex flex-col items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated value track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
      {/* Center score label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading font-extrabold text-white text-2xl tracking-tight leading-none">
          {animatedScore}
        </span>
        {showSubtext && (
          <span className="text-[10px] uppercase font-semibold tracking-wider text-white/70 mt-0.5">
            / 100
          </span>
        )}
      </div>
    </div>
  );
};

