
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Comment as CommentType, User, formatDate, isToxic } from "@/lib/data";
import PostVoting from "@/components/PostVoting";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CommentProps {
  comment: CommentType;
  level?: number;
}

const Comment = ({ comment, level = 0 }: CommentProps) => {
  const { hideToxic, toxicityThreshold } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const toxic = isToxic(comment, toxicityThreshold);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  if (hideToxic && toxic) {
    return (
      <div 
        className={cn(
          "pl-4 relative comment-thread",
          level > 0 ? "ml-4 sm:ml-6 border-l-2 border-gray-200 dark:border-gray-700" : ""
        )}
      >
        <div className="py-2 px-2 reddit-card my-1">
          <Badge variant="destructive" className="mb-1">Comment hidden</Badge>
          <p className="text-sm text-reddit-muted">
            This comment has been hidden due to your toxicity filter settings
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "pl-4 relative comment-thread",
        level > 0 ? "ml-4 sm:ml-6 border-l-2 border-gray-200 dark:border-gray-700" : "",
        collapsed ? "opacity-60" : ""
      )}
    >
      <div className="py-2">
        <div className="flex items-center mb-1">
          <div className="flex items-center text-xs flex-wrap">
            <span className="font-medium text-reddit-blue dark:text-reddit-blue">
              u/{comment.author.username}
            </span>
            <span className="mx-1 text-reddit-muted">•</span>
            <span className="text-reddit-muted">
              {formatDate(comment.createdAt)}
            </span>
            {toxic && (
              <>
                <span className="mx-1 text-reddit-muted">•</span>
                <Badge variant="outline" className="text-red-500 border-red-500 text-[10px]">
                  Potentially toxic
                </Badge>
              </>
            )}
          </div>
          <button 
            onClick={toggleCollapse}
            className="ml-auto text-xs text-reddit-muted hover:text-gray-700 dark:hover:text-gray-300 px-1"
          >
            {collapsed ? '[+]' : '[-]'}
          </button>
        </div>
        
        {!collapsed && (
          <>
            <div className="flex">
              <div className="mr-1">
                <PostVoting 
                  initialUpvotes={comment.upvotes} 
                  initialDownvotes={comment.downvotes} 
                  vertical={false}
                />
              </div>
              
              <div className={cn(
                "text-sm text-reddit-body flex-1",
                toxic ? "border-l-2 border-red-500 pl-2" : ""
              )}>
                {comment.content}
              </div>
            </div>
            
            {!collapsed && (
              <div className="flex flex-wrap text-xs mt-1 text-reddit-muted">
                <button className="hover:text-gray-700 dark:hover:text-gray-300 mr-2">Reply</button>
                <button className="hover:text-gray-700 dark:hover:text-gray-300 mr-2">Share</button>
                <button className="hover:text-gray-700 dark:hover:text-gray-300 mr-2">Report</button>
                <button className="hover:text-gray-700 dark:hover:text-gray-300">Save</button>
              </div>
            )}
            
            {!collapsed && comment.replies.length > 0 && (
              <div className="mt-2">
                {comment.replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} level={level + 1} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
