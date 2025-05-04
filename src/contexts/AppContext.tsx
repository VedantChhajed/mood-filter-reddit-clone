
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { MOCK_POSTS, MoodType, Post } from "@/lib/data";

interface AppContextType {
  hideToxic: boolean;
  setHideToxic: (value: boolean) => void;
  toxicityThreshold: number;
  setToxicityThreshold: (value: number) => void;
  selectedMood: MoodType | null;
  setSelectedMood: (mood: MoodType | null) => void;
  posts: Post[];
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hideToxic, setHideToxic] = useState<boolean>(false);
  const [toxicityThreshold, setToxicityThreshold] = useState<number>(0.5);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [posts] = useState<Post[]>(MOCK_POSTS);
  const [darkMode, setDarkMode] = useState<boolean>(true); // Set dark mode as default
  
  useEffect(() => {
    // Apply dark mode on initial load
    document.documentElement.classList.add('dark');
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <AppContext.Provider
      value={{
        hideToxic,
        setHideToxic,
        toxicityThreshold,
        setToxicityThreshold,
        selectedMood,
        setSelectedMood,
        posts,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
