import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "react-query";
import { logout } from "../services/auth";
import { toast } from "react-hot-toast";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/contants";

const useLogout = () => {
  const { setUser } = useContext(AuthContext);

  const { mutateAsync, isLoading } = useMutation(logout, {
    onSuccess: (response) => {
      if (response.success) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setUser(null);
        toast.success("Logout success!");
      }
    },
    onError: () => {
      toast.error("Logout failed!");
    },
  });

  const handleLogout = async () => {
    const toastId = toast.loading("Logout....");
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) return;
    await mutateAsync({ refreshToken }).finally(() => toast.dismiss(toastId));
  };

  return { isLoading, handleLogout };
};

export default useLogout;
