import { createContext, useState } from "react";
import { User, Layout } from "../types";

interface AuthContextValue {
  user: User | undefined | null;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setUser: () => {},
});

const AuthContextProvider = ({ children }: Layout) => {
  const [user, setUser] = useState<User | undefined | null>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
