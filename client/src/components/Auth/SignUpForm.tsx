import Logo from "../../assets/images/Logo";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Response, SignUpFormValue } from "../../types";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AxiosError } from "axios";
import { signUp } from "../../services/auth";
import { toast } from "react-hot-toast";
import { AiOutlineWarning, AiOutlineCheckCircle } from "react-icons/ai";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async (values: SignUpFormValue) => {
    const { email, password, fullname, username } = values;
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const toastId = toast.loading("Account verification...");

    try {
      const response = await signUp({ email, password, fullname, username });
      if (response.success) {
        setErrorMessage("");
        setSuccessMessage(response.message);
        toast.success("Sign up success", { id: toastId });
      }
    } catch (error) {
      const message = (error as AxiosError<Response>).response?.data.message;
      setErrorMessage(message as string);
      toast.error("Sign up failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="w-[350px]">
      <div className="pt-10 px-5 rounded-md pb-6 w-full border border-gray-200 flex items-center justify-center flex-col">
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
              className="px-3 py-2 text-xs w-full rounded-[4px] bg-gray-100"
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
              className="px-3 py-2 text-xs w-full rounded-[4px] bg-gray-100"
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
              className="px-3 py-2 text-xs w-full rounded-[4px] bg-gray-100"
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
            disabled={loading}
            className={`${
              loading && "opacity-50"
            } px-4 text-center text-xs font-semibold mt-4 w-full text-white py-2 rounded-md bg-blue-500`}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="w-full border border-gray-200 rounded-md mt-3 p-4 text-center">
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
