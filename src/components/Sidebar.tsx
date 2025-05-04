
import { useApp } from "@/contexts/AppContext";
import { MOODS, MOCK_POSTS, getMoodStats } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Sidebar = () => {
  const { posts } = useApp();
  const moodStats = getMoodStats(posts);
  const totalPosts = posts.length;
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">About Community</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Welcome to our community! This is a place to share content, ask questions, and connect with others who share your interests.
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Created May 4, 2025</span>
            <span>42.5k members</span>
          </div>
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
          <Button className="w-full bg-reddit-blue hover:bg-blue-700">Join</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Mood Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOODS.map((mood) => {
              const count = moodStats[mood.type] || 0;
              const percentage = totalPosts > 0 ? Math.round((count / totalPosts) * 100) : 0;
              
              return (
                <div key={mood.type} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{mood.label}</span>
                    <span>{percentage}% ({count})</span>
                  </div>
                  <Progress value={percentage} className={`h-2 ${mood.color}`} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Community Rules</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex gap-2">
            <span className="font-bold">1.</span>
            <p>Be respectful to others</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">2.</span>
            <p>No hate speech or bullying</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">3.</span>
            <p>No spamming or self-promotion</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
