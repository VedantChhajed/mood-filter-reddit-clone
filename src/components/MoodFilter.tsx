
import { useApp } from "@/contexts/AppContext";
import { MOODS, MoodType } from "@/lib/data";
import { cn } from "@/lib/utils";

const MoodFilter = () => {
  const { selectedMood, setSelectedMood } = useApp();
  
  const handleMoodSelect = (mood: MoodType | null) => {
    setSelectedMood(mood);
  };
  
  return (
    <div className="reddit-card mb-3 p-2 overflow-x-auto">
      <div className="flex items-center space-x-2">
        <button
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-full",
            selectedMood === null
              ? "bg-reddit-blue text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
          onClick={() => handleMoodSelect(null)}
        >
          All
        </button>
        
        {MOODS.map((mood) => (
          <button
            key={mood.type}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-full flex items-center whitespace-nowrap",
              selectedMood === mood.type
                ? `${mood.color} text-white`
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
            onClick={() => handleMoodSelect(mood.type)}
          >
            <span className={cn(
              "w-2 h-2 rounded-full mr-1.5",
              selectedMood !== mood.type ? mood.color : "bg-white"
            )}></span>
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodFilter;
