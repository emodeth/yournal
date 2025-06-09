import Editor from "@/components/Editor";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";

function Write() {
  const { user } = useAuth();

  return user === undefined ? (
    <Loader />
  ) : (
    <div className=" h-screen grid grid-cols-[16%_84%] overflow-hidden">
      <div className="w-full h-full bg-[#f8f8f8] p-4">sidebar</div>
      <Editor />
    </div>
  );
}

export default Write;
