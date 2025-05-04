
import { useState } from "react";
import { formatNumber } from "@/lib/data";
import { cn } from "@/lib/utils";

interface PostVotingProps {
  initialUpvotes: number;
  initialDownvotes: number;
  vertical?: boolean;
}

const PostVoting = ({ initialUpvotes, initialDownvotes, vertical = true }: PostVotingProps) => {
  const [votes, setVotes] = useState({
    upvotes: initialUpvotes,
    downvotes: initialDownvotes,
    userVote: 0, // 0 = no vote, 1 = upvote, -1 = downvote
  });
  
  const handleVote = (direction: 1 | -1) => {
    setVotes(prev => {
      // If clicking the same button again, remove the vote
      if (prev.userVote === direction) {
        return {
          upvotes: direction === 1 ? prev.upvotes - 1 : prev.upvotes,
          downvotes: direction === -1 ? prev.downvotes - 1 : prev.downvotes,
          userVote: 0,
        };
      }
      
      // If changing vote from one to another
      if (prev.userVote !== 0) {
        return {
          upvotes: direction === 1 ? prev.upvotes + 1 : prev.upvotes - 1,
          downvotes: direction === -1 ? prev.downvotes + 1 : prev.downvotes - 1,
          userVote: direction,
        };
      }
      
      // If voting for the first time
      return {
        upvotes: direction === 1 ? prev.upvotes + 1 : prev.upvotes,
        downvotes: direction === -1 ? prev.downvotes + 1 : prev.downvotes,
        userVote: direction,
      };
    });
  };
  
  const totalVotes = votes.upvotes - votes.downvotes;
  
  return (
    <div className={cn("flex items-center", vertical ? "flex-col py-2 px-1 mr-1" : "space-x-2")}>
      <button
        className={cn(
          "flex justify-center items-center h-6 w-6 rounded",
          votes.userVote === 1 ? "text-reddit-orange" : "text-gray-400 hover:text-reddit-orange"
        )}
        onClick={() => handleVote(1)}
        aria-label="Upvote"
      >
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      
      <span className={cn(
        "text-xs font-bold",
        votes.userVote === 1 ? "text-reddit-orange" : 
        votes.userVote === -1 ? "text-blue-600" : 
        "text-gray-600 dark:text-gray-400"
      )}>
        {formatNumber(totalVotes)}
      </span>
      
      <button
        className={cn(
          "flex justify-center items-center h-6 w-6 rounded",
          votes.userVote === -1 ? "text-blue-600" : "text-gray-400 hover:text-blue-600"
        )}
        onClick={() => handleVote(-1)}
        aria-label="Downvote"
      >
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </div>
  );
};

export default PostVoting;
