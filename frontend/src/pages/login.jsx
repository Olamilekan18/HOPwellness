import HomeNav from "../componet/header";
import Form from "../componet/login/form";
import LoginForm from "../componet/login/login";

export default function Login() {
  return (
    <>
      <HomeNav />
      <LoginForm>
        <Form />
      </LoginForm>
    </>
  );
}
