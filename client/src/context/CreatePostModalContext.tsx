import { createContext, useState } from "react";
import { Layout } from "../types";
import { Post } from "../types/posts";

interface CreatePostModalValue {
  isOpen: boolean;
  post: Post | null;
  action: "create" | "update";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setAction: React.Dispatch<React.SetStateAction<"create" | "update">>;
}

export const CreatePostModalContext = createContext<CreatePostModalValue>({
  isOpen: false,
  post: null,
  action: "create",
  setIsOpen: () => {},
  setPost: () => {},
  setAction: () => {},
});

const CreatePostModalContextProvider = ({ children }: Layout) => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [action, setAction] = useState<"create" | "update">("create");

  return (
    <CreatePostModalContext.Provider
      value={{ isOpen, setIsOpen, post, setPost, action, setAction }}
    >
      {children}
    </CreatePostModalContext.Provider>
  );
};

export default CreatePostModalContextProvider;
