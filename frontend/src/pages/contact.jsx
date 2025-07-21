import HomeNav from "../componet/header";
import Footer from "../componet/home/footer";
import ContactForm from "../componet/contact/contactForm";
export default function ContactPage() {
  return (
    <>
      <HomeNav />
      <ContactForm />
      <Footer color="bg-white border-t-1 border-black text-black" />
    </>
  );
}
