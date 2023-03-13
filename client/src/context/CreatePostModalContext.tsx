import { createContext, useState } from "react";
import { Layout } from "../types";

interface CreatePostModalValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreatePostModalContext = createContext<CreatePostModalValue>({
  isOpen: false,
  setIsOpen: () => {},
});

const CreatePostModalContextProvider = ({ children }: Layout) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CreatePostModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CreatePostModalContext.Provider>
  );
};

export default CreatePostModalContextProvider;
