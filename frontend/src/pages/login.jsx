import HomeNav from "../componet/header";
import Footer from "../componet/home/footer";
import Form from "../componet/login/form";
import LoginForm from "../componet/login/login";

export default function Login() {
  return (
    <>
      <HomeNav />
      <LoginForm>
        <Form />
      </LoginForm>
      <Footer color="bg-white border-t-1 border-black text-black" />
    </>
  );
}
