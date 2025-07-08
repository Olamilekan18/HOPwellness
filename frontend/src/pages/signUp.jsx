import HomeNav from "../componet/header";
import LoginForm from "../componet/login/login";
import SignUpForm from "../componet/signUp/signUpForm";
import { ToastContainer } from "react-toastify";
export default function SignUp() {
  return (
    <>
      <ToastContainer />
      <HomeNav />
      <LoginForm>
        <SignUpForm />
      </LoginForm>
    </>
  );
}
