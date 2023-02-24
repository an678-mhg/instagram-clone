import SignInForm from "../components/Auth/SignInForm";
import Phone from "../components/Auth/Phone";

const SignIn = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Phone />
      <SignInForm />
    </div>
  );
};

export default SignIn;
