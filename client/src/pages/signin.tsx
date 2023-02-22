import Form from "../components/SignIn/Form";
import Phone from "../components/SignIn/Phone";

const SignIn = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Phone />
      <Form />
    </div>
  );
};

export default SignIn;
