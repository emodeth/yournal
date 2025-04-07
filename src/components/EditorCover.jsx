import { useEditor } from "../contexts/EditorContext";

function EditorCover() {
  const { cover } = useEditor();

  return (
    cover && (
      <div className="w-full h-[210px]">
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
