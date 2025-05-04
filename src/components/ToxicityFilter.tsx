
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";

const ToxicityFilter = () => {
  const { hideToxic, setHideToxic, toxicityThreshold, setToxicityThreshold } = useApp();
  const [open, setOpen] = useState(false);
  
  const handleSliderChange = (value: number[]) => {
    setToxicityThreshold(value[0]);
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hideToxic"
          checked={hideToxic}
          onChange={(e) => setHideToxic(e.target.checked)}
          className="rounded border-gray-300 text-reddit-blue focus:ring-reddit-blue mr-2 dark:border-gray-600"
        />
        <label htmlFor="hideToxic" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hide Toxic Content
        </label>
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Threshold</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium leading-none">Toxicity Threshold</h4>
                <Badge variant="outline">
                  {Math.round(toxicityThreshold * 100)}%
                </Badge>
              </div>
              <Slider
                defaultValue={[toxicityThreshold]}
                max={1}
                step={0.05}
                value={[toxicityThreshold]}
                onValueChange={handleSliderChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="p-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Lenient</div>
              <div className="p-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Moderate</div>
              <div className="p-1 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Strict</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ToxicityFilter;
