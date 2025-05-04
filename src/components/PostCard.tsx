
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Post, formatDate, isToxic, formatNumber } from "@/lib/data";
import { cn, truncateText } from "@/lib/utils";
import PostVoting from "@/components/PostVoting";
import MoodBadge from "@/components/MoodBadge";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Share2 } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { hideToxic, toxicityThreshold } = useApp();
  const toxic = isToxic(post, toxicityThreshold);
  
  if (hideToxic && toxic) {
    return (
      <div className="reddit-card mb-3 py-4 px-2 text-center">
        <Badge variant="destructive" className="mb-2">Content filtered</Badge>
        <p className="text-sm text-reddit-muted">
          This post has been hidden due to your toxicity filter settings
        </p>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "reddit-card mb-2 flex hover:border-gray-400 dark:hover:border-gray-700 cursor-pointer",
      toxic ? "border-l-4 border-red-500" : ""
    )}>
      <div className="bg-gray-50 dark:bg-[#151516] rounded-l-md flex items-center">
        <PostVoting
          initialUpvotes={post.upvotes}
          initialDownvotes={post.downvotes}
        />
      </div>
      
      <div className="py-2 px-3 flex-grow">
        <div className="flex items-center text-xs text-reddit-muted mb-1">
          <span>r/{post.subreddit}</span>
          <span className="mx-1">•</span>
          <span>Posted by u/{post.author.username}</span>
          <span className="mx-1">•</span>
          <span>{formatDate(post.createdAt)}</span>
          <div className="ml-2">
            <MoodBadge mood={post.mood} size="sm" />
          </div>
          {toxic && (
            <Badge variant="outline" className="ml-2 text-red-500 border-red-500 text-[10px]">
              Potentially toxic
            </Badge>
          )}
        </div>
        
        <Link to={`/post/${post.id}`} className="block">
          <h3 className="text-lg font-medium mb-1 text-black dark:text-white hover:text-reddit-blue dark:hover:text-reddit-blue">
            {post.title}
          </h3>
          
          {post.image && (
            <div className="mb-2 max-h-96 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full object-cover rounded-md"
                loading="lazy"
              />
            </div>
          )}
          
          <p className="text-sm text-reddit-body mb-2">
            {truncateText(post.content, 150)}
          </p>
        </Link>
        
        <div className="flex items-center text-xs text-reddit-muted">
          <Link to={`/post/${post.id}`} className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-1.5">
            <MessageSquare className="w-4 h-4 mr-1" />
            {formatNumber(post.commentCount)} {post.commentCount === 1 ? 'comment' : 'comments'}
          </Link>
          <button className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-1.5 ml-2">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </button>
          <button className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-1.5 ml-2">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
            </svg>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
