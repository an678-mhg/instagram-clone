import Logo from "../../icons/Logo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineWarning, AiOutlineCheckCircle } from "react-icons/ai";
import useSignUp from "../../hooks/useSignUp";

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      username: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const { errorMessage, handleSignUp, isLoading, successMessage } = useSignUp();

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="w-[350px]">
      <div className="pt-10 px-5 rounded-md pb-6 w-full border border-[#262626] flex items-center justify-center flex-col">
        <Logo width={174} height={50} />

        {errorMessage && (
          <span className="mt-3 flex items-center font-semibold text-xs text-red-500">
            <AiOutlineWarning className="mr-1 h-4" />{" "}
            <span>{errorMessage}</span>
          </span>
        )}

        {successMessage && (
          <span className="mt-3 flex items-center font-semibold text-xs text-green-500">
            <AiOutlineCheckCircle className="mr-1 h-4" />{" "}
            <span>{successMessage}</span>
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
              placeholder="Email"
              className="px-3 py-2 text-xs w-full rounded-[4px] bg-[#222]"
            />
            {errors?.email?.message && (
              <span className="mt-3 text-xs text-red-500">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="w-full mb-2">
            <input
              {...register("fullname", {
                required: { value: true, message: "Fullname is required!" },
              })}
              placeholder="Display name"
              className="px-3 py-2 text-xs w-full rounded-[4px] bg-[#222]"
            />
            {errors?.fullname?.message && (
              <span className="mt-3 text-xs text-red-500">
                {errors?.fullname?.message}
              </span>
            )}
          </div>
          <div className="w-full mb-2">
            <input
              {...register("username", {
                required: { value: true, message: "Username is required!" },
              })}
              placeholder="Username"
              className="px-3 py-2 text-xs w-full rounded-[4px] bg-[#222]"
            />
            {errors?.username?.message && (
              <span className="mt-3 text-xs text-red-500">
                {errors?.username?.message}
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
                className="px-3 py-2 text-xs w-full rounded-[4px] bg-[#222]"
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
            disabled={isLoading}
            className={`${
              isLoading && "opacity-50"
            } px-4 text-center text-xs font-semibold mt-4 w-full text-white py-2 rounded-md bg-blue-500`}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="w-full border border-[#262626] rounded-md mt-3 p-4 text-center">
        <p className="text-sm">
          If you already have an account?{" "}
          <Link
            className="font-semibold text-blue-500 hover:underline"
            to="/signin"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
