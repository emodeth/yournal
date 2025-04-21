import { useEditor } from "../contexts/EditorContext";

function EditorCover() {
  const { cover } = useEditor();

  return (
    cover && (
      <div className="w-full h-[210px] relative group z-[999999] -mb-16">
        <div className="opacity-0 group-hover:opacity-100 text-[12px] font-sans font-medium  text-[#3f3f3f] absolute right-8 bottom-4 bg-white px-2 py-1 rounded-md cursor-pointer hover:bg-[#f3f3f3] transition-colors transition-opacity duration-75">
          Change Cover
        </div>
        <img
          src={cover}
          alt="Cover"
          className="w-full h-full object-cover object-center "
        />
      </div>
    )
  );
}

export default EditorCover;
