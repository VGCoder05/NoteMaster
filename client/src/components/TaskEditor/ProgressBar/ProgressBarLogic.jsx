import { useState, useEffect } from 'react';
import ProgressBarUI from './ProgressBarUI';

function ProgressBar({ progress, showPercentage = true, size = 'medium', animated = true }) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      // Animate progress change
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const getProgressColor = () => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-amber-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressStatus = () => {
    if (progress >= 100) return { text: 'Complete', color: 'text-green-500' };
    if (progress >= 75) return { text: 'Almost done', color: 'text-blue-500' };
    if (progress >= 50) return { text: 'In progress', color: 'text-amber-500' };
    if (progress >= 25) return { text: 'Getting started', color: 'text-orange-500' };
    return { text: 'Just started', color: 'text-red-500' };
  };

  return (
    <ProgressBarUI
      progress={displayProgress}
      showPercentage={showPercentage}
      size={size}
      animated={animated}
      progressColor={getProgressColor()}
      progressStatus={getProgressStatus()}
    />
  );
}

export default ProgressBar;