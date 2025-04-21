import { Image, Smile } from "lucide-react";
import { useEditor } from "../contexts/EditorContext";

function EditorControls() {
  const { setCover } = useEditor();

  function handleCover() {
    setCover("https://picsum.photos/1288/210");
  }

  return (
    <div className=" items-center mr-auto gap-2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
      <button className="flex items-center gap-1 hover:bg-[#37352f15] cursor-pointer py-1 px-2 rounded-lg">
        <Smile size={16} color="#37352f80" />
        <span className="font-[Inter] text-[14px]  text-[#37352f80] ">
          Add mood
        </span>
      </button>
      <button
        onClick={handleCover}
        className="flex items-center gap-1 hover:bg-[#37352f15] cursor-pointer py-1 px-2 rounded-lg"
      >
        <Image size={16} color="#37352f80" />
        <span className="font-[Inter] text-[14px] text-[#37352f80] ">
          Add cover
        </span>
      </button>
    </div>
  );
}

export default EditorControls;
