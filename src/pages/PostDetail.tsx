
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { MOCK_POSTS, getPostComments, Post, Comment as CommentType, isToxic } from "@/lib/data";
import Header from "@/components/Header";
import PostVoting from "@/components/PostVoting";
import MoodBadge from "@/components/MoodBadge";
import Comment from "@/components/Comment";
import ToxicityFilter from "@/components/ToxicityFilter";
import { formatDate, formatNumber } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Share2 } from "lucide-react";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const { hideToxic, toxicityThreshold } = useApp();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from an API
    if (postId) {
      const foundPost = MOCK_POSTS.find(p => p.id === postId);
      if (foundPost) {
        setPost(foundPost);
        setComments(getPostComments(postId));
      }
    }
    setLoading(false);
  }, [postId]);
  
  if (loading) {
    return (
      <div className="min-h-screen dark:bg-[#030303]">
        <Header />
        <div className="container mx-auto px-4 py-4">
          <div className="reddit-card p-4">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen dark:bg-[#030303]">
        <Header />
        <div className="container mx-auto px-4 py-4">
          <div className="reddit-card p-4">
            <h1 className="text-xl font-bold mb-4">Post not found</h1>
            <p className="mb-4">The post you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="text-reddit-blue hover:underline">
              Return to home page
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const toxic = isToxic(post, toxicityThreshold);
  const commentCount = comments.reduce((count, comment) => {
    // Count the comment itself
    let total = 1;
    
    // Recursively count replies
    const countReplies = (replies: CommentType[]): number => {
      let replyCount = replies.length;
      for (const reply of replies) {
        replyCount += countReplies(reply.replies);
      }
      return replyCount;
    };
    
    total += countReplies(comment.replies);
    return count + total;
  }, 0);
  
  return (
    <div className="min-h-screen dark:bg-[#030303]">
      <Header />
      
      <div className="container mx-auto px-2 sm:px-4 py-3">
        <div className="mb-3">
          <Link to="/" className="text-sm text-reddit-blue hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to feed
          </Link>
        </div>
        
        <div className="reddit-card mb-3">
          {hideToxic && toxic ? (
            <div className="p-4 text-center">
              <Badge variant="destructive" className="mb-2">Content filtered</Badge>
              <p className="text-sm text-reddit-muted">
                This post has been hidden due to your toxicity filter settings
              </p>
            </div>
          ) : (
            <div className="flex p-2">
              <div className="pt-2">
                <PostVoting
                  initialUpvotes={post.upvotes}
                  initialDownvotes={post.downvotes}
                />
              </div>
              
              <div className="flex-1 p-2">
                <div className="flex flex-wrap items-center text-xs text-reddit-muted mb-1">
                  <span className="font-medium mr-1">r/{post.subreddit}</span>
                  <span className="mx-1 hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Posted by </span>
                  <span className="font-medium mx-1">u/{post.author.username}</span>
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
                
                <h1 className="text-xl font-medium mb-2 text-black dark:text-white">
                  {post.title}
                </h1>
                
                {post.image && (
                  <div className="mb-4 max-h-[600px] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full object-contain rounded-md"
                    />
                  </div>
                )}
                
                <div className="text-sm text-reddit-body mb-4 whitespace-pre-line">
                  {post.content}
                </div>
                
                <div className="flex flex-wrap items-center text-xs text-reddit-muted border-t border-gray-100 dark:border-gray-800 pt-2">
                  <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-1.5">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {formatNumber(commentCount)} {commentCount === 1 ? 'comment' : 'comments'}
                  </div>
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
          )}
        </div>
        
        <div className="reddit-card mb-3 p-3">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
            <h2 className="text-lg font-medium">Comments ({commentCount})</h2>
            <ToxicityFilter />
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
            <textarea 
              placeholder="What are your thoughts?" 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-reddit-blue bg-white dark:bg-[#1A1A1B] text-gray-800 dark:text-gray-200"
              rows={4}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button className="bg-reddit-blue hover:bg-blue-700 text-white font-medium py-1 px-4 rounded-full text-sm">
                Comment
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-center text-reddit-muted py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
