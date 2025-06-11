import { Slider } from "@/components/ui/slider";
import { cn } from "../lib/utils";
import { Activity } from "lucide-react";
import { useEditor } from "../contexts/EditorContext";

function EntryMoodSelector({ className, props }) {
  const { selectedMoodScore, setSelectedMoodScore } = useEditor();

  return (
    <div className="cursor-pointer flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
      <Activity size={16} color="currentColor" />
      <Slider
        defaultValue={selectedMoodScore}
        value={selectedMoodScore}
        onValueChange={(e) => setSelectedMoodScore(e)}
        max={10}
        step={1}
        className={cn("w-30  ", className)}
        {...props}
      />
      <span className="ml-2">{selectedMoodScore}</span>
    </div>
  );
}

export default EntryMoodSelector;
