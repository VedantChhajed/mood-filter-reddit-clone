
import { cn } from "@/lib/utils";
import { MoodType, getMoodColor, getMoodLabel } from "@/lib/data";

interface MoodBadgeProps {
  mood: MoodType;
  size?: "sm" | "md" | "lg";
}

const MoodBadge = ({ mood, size = "md" }: MoodBadgeProps) => {
  const moodColor = getMoodColor(mood);
  const moodLabel = getMoodLabel(mood);
  
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2 py-0.5",
    lg: "text-sm px-2.5 py-1",
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium text-white",
        moodColor,
        sizeClasses[size]
      )}
    >
      {moodLabel}
    </span>
  );
};

export default MoodBadge;
