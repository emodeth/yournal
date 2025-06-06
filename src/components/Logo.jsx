import { cn } from "../lib/utils";

function Logo({ className, fontSize, logoSize }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center",
          logoSize
        )}
      >
        <span className="text-white font-bold text-sm bg-transparent">Y</span>
      </div>

      <span className={cn("!font-bold text-xl ml-2", fontSize)}>your</span>
      <span className={cn("!font-bold text-xl text-blue-600", fontSize)}>
        nal
      </span>
    </div>
  );
}

export default Logo;
