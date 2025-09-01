import HomeNav from "../componet/header";
import Footer from "../componet/home/footer";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {

  const navigate = useNavigate();
  function handleGetStarted() {
    navigate("/signup");
  }

  return (
    <>
      <HomeNav />

      <section className="bg-gradient-to-b from-green-50 to-green-100 text-gray-800 py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            About HopWellness
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            At <span className="text-green-700 font-semibold">HopWellness</span>, 
            we believe in empowering healthier lifestyles through simple, 
            accessible wellness solutions. Our mission is to make health 
            easier to achieve, one step at a time.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To inspire and support healthier living through guidance, 
              community, and innovation.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              A world where wellness is simple, enjoyable, and sustainable for everyone.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-md border border-green-100 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Values</h2>
            <p className="text-gray-600">
              Commitment, inclusivity, and continuous growth guide everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-green-500 py-12 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the HopWellness Journey</h2>
        <p className="mb-6 text-lg">
          Together, we can build a healthier, stronger, and happier community.
        </p>
        <button onClick={handleGetStarted} className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-green-100 transition">
          Get Started
        </button>
      </section>

      <Footer color="bg-white border-t-1 border-black text-black" />
    </>
  );
}
