import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { signUp } from "../services/auth";
import { SignUpFormValue } from "../types";

const useSignUp = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync, isLoading } = useMutation(signUp, {
    onSuccess: (response) => {
      if (response.success) {
        setErrorMessage("");
        setSuccessMessage(response.message);
        toast.success("Sign up success");
      }
    },
    onError: (error) => {
      // @ts-ignore
      const message = (error as AxiosError<Response>).response?.data.message;
      setErrorMessage(message as string);
      toast.error("Sign up failed");
    },
  });

  const handleSignUp = async (values: SignUpFormValue) => {
    setErrorMessage("");
    setSuccessMessage("");
    const toastId = toast.loading("Account verification...");
    mutateAsync(values).finally(() => toast.dismiss(toastId));
  };

  return {
    handleSignUp,
    isLoading,
    successMessage,
    errorMessage,
  };
};

export default useSignUp;
