function ProgressBarUI({
  progress,
  showPercentage,
  size,
  animated,
  progressColor,
  progressStatus
}) {
  const sizeClasses = {
    small: 'h-1.5',
    medium: 'h-2.5',
    large: 'h-4',
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-background-light dark:bg-background-dark rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${progressColor} ${sizeClasses[size]} rounded-full ${
            animated ? 'transition-all duration-500 ease-out' : ''
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {showPercentage && (
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className={progressStatus.color}>
            {progressStatus.text}
          </span>
          <span className="text-subtle-light dark:text-subtle-dark">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default ProgressBarUI;