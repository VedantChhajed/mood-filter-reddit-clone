
import { useApp } from "@/contexts/AppContext";
import Header from "@/components/Header";
import ToxicityFilter from "@/components/ToxicityFilter";
import MoodFilter from "@/components/MoodFilter";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import CreatePostButton from "@/components/CreatePostButton";
import { isToxic } from "@/lib/data";

const Index = () => {
  const { posts, selectedMood, hideToxic, toxicityThreshold } = useApp();
  
  // Filter posts by mood and toxicity
  const filteredPosts = posts.filter(post => {
    // Filter by mood
    if (selectedMood && post.mood !== selectedMood) {
      return false;
    }
    
    // Filter by toxicity
    if (hideToxic && isToxic(post, toxicityThreshold)) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen dark:bg-[#030303]">
      <Header />
      
      <div className="container mx-auto px-2 sm:px-4 py-3">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Popular Posts</h1>
          <ToxicityFilter />
        </div>
        
        <MoodFilter />
        
        <div className="flex flex-col md:flex-row gap-3">
          <main className="flex-1 w-full">
            {filteredPosts.length === 0 ? (
              <div className="reddit-card p-4 text-center">
                <p className="text-reddit-muted">No posts found with the selected filters.</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </main>
          
          <div className="w-full md:w-80 order-first md:order-last">
            <div className="mb-3">
              <CreatePostButton />
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
