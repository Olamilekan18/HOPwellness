import HomeNav from "../componet/header";
import LoginForm from "../componet/login/login";
import SignUpForm from "../componet/signUp/signUpForm";
import { ToastContainer } from "react-toastify";
import Footer from "../componet/home/footer";
export default function SignUp() {
  return (
    <>
      <ToastContainer />
      <HomeNav />
      <LoginForm>
        <SignUpForm />
      </LoginForm>
      <Footer color="bg-white border-t-1 border-black text-black" />
    </>
  );
}
