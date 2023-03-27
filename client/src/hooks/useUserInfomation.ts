import { useContext, useEffect } from "react";
import { getMe } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

const useUserInfomation = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    getMe()
      .then((response) => setUser(response.user))
      .catch(() => setUser(null));
  }, []);
};

export default useUserInfomation;
