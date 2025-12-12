interface ProgressBarProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ 
  progress, 
  size = "md", 
  showLabel = true,
  className = "" 
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  const heights = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-1 ${heights[size]} rounded-full bg-secondary overflow-hidden`}>
        <div 
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-primary min-w-[40px] text-right">
          {clampedProgress}%
        </span>
      )}
    </div>
  );
}
