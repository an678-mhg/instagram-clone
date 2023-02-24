import { useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useQueryParams from "../hooks/useQueryParams";
import { activeAccount } from "../services/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/contants";

const Active = () => {
  const queryParams = useQueryParams();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const toastId = toast.loading("Active account...");
      try {
        const response = await activeAccount(
          queryParams.get("activeToken") as string
        );
        if (response.success) {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
          setUser(response.user);
          toast.success("Active account success", { id: toastId });
        }
      } catch (error) {
        toast.error("Active account failed", { id: toastId });
      }
    })();
  }, []);

  return <></>;
};

export default Active;
