import AboutUs from "../componet/home/about";
import FAQ from "../componet/home/faq";
import Footer from "../componet/home/footer";
import Hero from "../componet/home/Hero";
import Testimonial from "../componet/home/testimonial";
import WhyChooseUs from "../componet/home/whyChooseUs";

function App() {
  return (
    <>
      <Hero />
      <AboutUs />
      <WhyChooseUs />
      <Testimonial />
      <FAQ />
      <Footer color="bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 text-black border-t-1 border-black  body-font" />
    </>
  );
}

export default App;
