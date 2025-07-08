import HomeNav from "../componet/header";
import LoginForm from "../componet/login/login";
import SignUpForm from "../componet/signUp/signUpForm";

export default function SignUp() {
  return (
    <>
      <HomeNav />
      <LoginForm>
        <SignUpForm />
      </LoginForm>
    </>
  );
}
