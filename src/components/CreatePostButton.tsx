
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MOODS, MoodType, analyzeToxicity } from "@/lib/data";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CreatePostButton = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [moodError, setMoodError] = useState("");
  const [toxicityWarning, setToxicityWarning] = useState(false);
  
  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedMood(null);
    setTitleError("");
    setContentError("");
    setMoodError("");
    setToxicityWarning(false);
  };
  
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };
  
  const handleCreate = () => {
    // Validate form
    let valid = true;
    
    if (!title.trim()) {
      setTitleError("Title is required");
      valid = false;
    } else {
      setTitleError("");
    }
    
    if (!content.trim()) {
      setContentError("Content is required");
      valid = false;
    } else {
      setContentError("");
    }
    
    if (!selectedMood) {
      setMoodError("Please select a mood");
      valid = false;
    } else {
      setMoodError("");
    }
    
    if (!valid) return;
    
    // Check toxicity
    const titleToxicity = analyzeToxicity(title);
    const contentToxicity = analyzeToxicity(content);
    const overallToxicity = Math.max(titleToxicity, contentToxicity);
    
    if (overallToxicity > 0.5) {
      setToxicityWarning(true);
      return;
    }
    
    // Submit form (we're just mocking this)
    toast({
      title: "Post created!",
      description: "Your post has been successfully created.",
    });
    
    handleClose();
  };
  
  const handleContinueAnyway = () => {
    toast({
      title: "Post created!",
      description: "Your post has been successfully created, but may be hidden by toxicity filters.",
      variant: "destructive"
    });
    
    handleClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-reddit-blue hover:bg-blue-700">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {toxicityWarning ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-red-500">Content Warning</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Your post may contain content that could violate our community guidelines regarding toxicity.</p>
              <p>Please review your post and consider revising any language that might be perceived as harmful, offensive, or disrespectful.</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setToxicityWarning(false)}>
                  Edit Post
                </Button>
                <Button variant="destructive" onClick={handleContinueAnyway}>
                  Post Anyway
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create a post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={titleError ? "border-red-500" : ""}
                />
                {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}
              </div>
              
              <div>
                <Textarea
                  placeholder="Text (optional)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={cn("min-h-32", contentError ? "border-red-500" : "")}
                />
                {contentError && <p className="text-red-500 text-xs mt-1">{contentError}</p>}
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Select mood:</label>
                <div className="flex flex-wrap gap-2">
                  {MOODS.map((mood) => (
                    <Badge
                      key={mood.type}
                      className={cn(
                        "cursor-pointer",
                        selectedMood === mood.type ? mood.color : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      )}
                      onClick={() => setSelectedMood(mood.type)}
                    >
                      {mood.label}
                    </Badge>
                  ))}
                </div>
                {moodError && <p className="text-red-500 text-xs mt-1">{moodError}</p>}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleCreate}>
                  Post
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
