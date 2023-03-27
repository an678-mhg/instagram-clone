import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreatePostModalContext } from "../context/CreatePostModalContext";

const NoPostYet = () => {
  const { setIsOpen } = useContext(CreatePostModalContext);

  return (
    <div className="flex-grow text-center">
      There is no posts yet{" "}
      <button
        className="text-blue-500 underline"
        onClick={() => setIsOpen(true)}
      >
        create new
      </button>{" "}
      or{" "}
      <Link className="text-blue-500 underline" to="/explore">
        explore
      </Link>
    </div>
  );
};

export default NoPostYet;
