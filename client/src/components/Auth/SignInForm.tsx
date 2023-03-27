import Logo from "../../assets/images/Logo";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { googleLogin } from "../../services/auth";
import { googleProvider } from "../../config/firebase";
import useSignIn from "../../hooks/useSignIn";
import useSignInSocial from "../../hooks/useSignInSocial";

const SignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const { errorMessage, isLoading, handleSignIn } = useSignIn();

  const {
    handleSignIn: signInGoogle,
    signInSocialErrorMess,
    signInSocialLoading,
  } = useSignInSocial(googleLogin, googleProvider);

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="w-[350px]">
      <div className="pt-10 px-5 rounded-md pb-6 w-full border border-gray-200 flex items-center justify-center flex-col">
        <Logo width={174} height={50} />

        {errorMessage && (
          <span className="mt-3 flex items-center font-semibold text-xs text-red-500">
            <AiOutlineWarning className="mr-1 h-4" />{" "}
            <span>{errorMessage}</span>
          </span>
        )}

        {signInSocialErrorMess && (
          <span className="mt-3 flex items-center font-semibold text-xs text-red-500">
            <AiOutlineWarning className="mr-1 h-4" />{" "}
            <span>{signInSocialErrorMess}</span>
          </span>
        )}

        <div className="w-full mt-6">
          <div className="w-full mb-2">
            <input
              {...register("email", {
                required: { value: true, message: "Email is required!" },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Wrong email format!",
                },
              })}
              placeholder="Email or username"
              className="px-3 py-2 text-xs w-full rounded-[4px] bg-gray-100"
            />
            {errors?.email?.message && (
              <span className="mt-3 text-xs text-red-500">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <div className="relative">
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required!",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be more than 8 characters!",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="px-3 py-2 text-xs w-full rounded-[4px] bg-gray-100"
              />
              <div
                className="absolute top-[50%] cursor-pointer translate-y-[-50%] right-[5px]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-400" />
                ) : (
                  <AiOutlineEye className="text-gray-400" />
                )}
              </div>
            </div>
            {errors?.password?.message && (
              <span className="mt-3 text-xs text-red-500">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <button
            disabled={isLoading || signInSocialLoading}
            className={`${
              isLoading && "opacity-50"
            } px-4 text-center text-xs font-semibold mt-4 w-full text-white py-2 rounded-md bg-blue-500`}
          >
            Log in
          </button>
          <div className="relative py-6">
            <div className="w-full h-[1px] bg-gray-200" />
            <span className="text-sm font-semibold text-gray-400 bg-white px-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              OR
            </span>
          </div>
          <div className="w-full">
            <button
              onClick={signInGoogle}
              type="button"
              disabled={isLoading || signInSocialLoading}
              className="px-3 mb-4 w-full bg-gray-100 py-2 rounded-md text-xs justify-center font-semibold flex items-center"
            >
              <FcGoogle className="w-5 h-5" />{" "}
              <span className="ml-3">Login with Google</span>
            </button>
            <button
              type="button"
              disabled={isLoading || signInSocialLoading}
              className="px-3 w-full bg-blue-500 py-2 rounded-md text-xs justify-center font-semibold flex items-center"
            >
              <BsFacebook className="w-5 text-white h-5" />{" "}
              <span className="ml-3 text-white">Login with Facebook</span>
            </button>
          </div>
          <div className="text-center w-full mt-4">
            <Link
              className="text-xs text-blue-500 hover:underline"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full border border-gray-200 rounded-md mt-3 p-4 text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link
            className="font-semibold text-blue-500 hover:underline"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
