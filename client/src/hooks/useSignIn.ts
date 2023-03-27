import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { signIn } from "../services/auth";
import { SignInFormValue } from "../types";
import { setToken } from "../utils/token";

const useSignIn = () => {
  const { setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync, isLoading } = useMutation(signIn, {
    onSuccess: (response) => {
      if (response.success) {
        setToken(response.accessToken, response.refreshToken);
        setUser(response.user);
        toast.success("Sign in success");
      }
    },
    onError: (error) => {
      // @ts-ignore
      const message = (error as AxiosError<Response>).response?.data?.message;
      setErrorMessage(message as string);
      toast.error("Sign in failed");
    },
  });

  const handleSignIn = async (values: SignInFormValue) => {
    setErrorMessage("");
    const toastId = toast.loading("Account verification...");
    mutateAsync({ email: values.email, password: values.password }).finally(
      () => toast.dismiss(toastId)
    );
  };

  return {
    handleSignIn,
    isLoading,
    errorMessage,
  };
};

export default useSignIn;
