import Logo from "../../assets/images/Logo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignInFormValue } from "../../types";
import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

const ForgotPasswordForm = () => {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async (values: SignInFormValue) => {};

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
          <button
            disabled={loading}
            className={`${
              loading && "opacity-50"
            } px-4 text-center text-xs font-semibold mt-4 w-full text-white py-2 rounded-md bg-blue-500`}
          >
            Forgot password
          </button>
        </div>
      </div>
      <div className="w-full border border-gray-200 rounded-md mt-3 p-4 text-center">
        <p className="text-sm">
          Go back signin page?{" "}
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

export default ForgotPasswordForm;
