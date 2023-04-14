import { AuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { SignInResponse } from "../types";
import { setToken } from "../utils/token";

const useSignInSocial = (
  loginFunction: ({ idTokens }: { idTokens: string }) => Promise<SignInResponse>
) => {
  4;
  const [signInSocialLoading, setSignInSocialLoading] = useState(false);
  const [signInSocialErrorMess, setSignInSocialErrorMess] = useState("");

  const { setUser } = useContext(AuthContext);

  const { mutateAsync } = useMutation(loginFunction);

  const handleSignIn = async (provider: AuthProvider) => {
    let toastId;
    setSignInSocialLoading(true);

    try {
      const response = await signInWithPopup(auth, provider);
      const idTokens = await response.user.getIdToken();

      toastId = toast.loading("Account verification...");
      const googleResponse = await mutateAsync({ idTokens });

      if (googleResponse.success) {
        setToken(googleResponse.accessToken, googleResponse.refreshToken);
        setUser(googleResponse.user);
        signOut(auth);
        toast.success("Sign in success", { id: toastId });
      }
    } catch (error: any) {
      setSignInSocialErrorMess(error.message);
      toast.error("Sign in failed", { id: toastId });
    } finally {
      setSignInSocialLoading(false);
    }
  };

  return {
    handleSignIn,
    signInSocialLoading,
    signInSocialErrorMess,
  };
};

export default useSignInSocial;
