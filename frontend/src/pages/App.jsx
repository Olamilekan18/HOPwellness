import { FaRunning, FaHeartbeat, FaAppleAlt } from "react-icons/fa";
function App() {
  return (
    <section className="bg-[#E8F5F1] overflow-hidden pb-9 px-4 md:px-8">
      <header className="flex mx-auto justify-between items-center max-w-[1300px] py-4">
        <div className="flex items-center gap-3">
          <img
            src="https://www.shutterstock.com/image-vector/fitness-logo-vector-symbol-icon-600nw-1926906863.jpg"
            alt="Healthify Logo"
            className="w-12 md:w-16 lg:w-16 rounded-full"
          />
          <h1 className="text-green-700 text-lg md:text-2xl font-bold">HOP</h1>
        </div>
        <nav className="hidden sm:inline-block">
          <ul className="flex gap-3 md:gap-5 lg:gap-10">
            <li className="uppercase font-medium text-sm text-green-800 hover:underline">
              <a href="#">About Us</a>
            </li>
            <li className="uppercase font-medium text-sm text-green-800 hover:underline">
              <a href="#">Clients & Results</a>
            </li>
            {/* <li className="uppercase font-medium text-sm text-green-800 hover:underline">
              <a href="#">Plans</a>
            </li> */}
            <li className="uppercase font-medium text-sm text-green-800 hover:underline">
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="hidden sm:flex gap-4">
          <button className="uppercase text-sm text-green-700 border-2 border-green-700 rounded-full py-2 px-5 hover:bg-green-100">
            Log In
          </button>
          <button className="uppercase text-sm text-white bg-green-600 rounded-full py-2 px-5 hover:bg-green-700">
            Sign Up
          </button>
        </div>
      </header>

      <section className="relative flex flex-col-reverse md:flex-row mx-auto justify-between items-center gap-9 md:gap-4 max-w-[1300px] py-8 mt-10">
        <div className="md:w-[520px] z-20">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 leading-[1.4]">
            Your Wellness Journey <br />
            Starts <span className="text-green-500">Here</span>
          </h2>
          <p className="text-base text-gray-700 mt-6 mb-10">
            Track your fitness, monitor nutrition, and stay motivated with
            Healthify — your personal health companion.
          </p>
          <div className="flex gap-5">
            <button className="uppercase font-semibold text-sm bg-green-600 text-white rounded-full px-6 py-3 hover:bg-green-700">
              Get Started
            </button>
            <button className="uppercase font-semibold text-sm text-green-600 border border-green-600 rounded-full px-6 py-3 hover:bg-green-50">
              Learn More
            </button>
          </div>
        </div>
        <div className="p-6 z-20 bg-gradient-to-br from-white via-green-50 to-green-100 rounded-[40px] shadow-2xl transition-all duration-300 hover:scale-105">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/701/articles/2017/01/how-much-joining-gym-helps-health-2-jpg-1488906648.jpeg?resize=640:*"
            alt="Fitness App Illustration"
            className="max-w-[550px] w-full rounded-3xl shadow-lg ring-4 ring-green-100"
          />
        </div>
      </section>

      <div className="flex flex-wrap justify-around mt-16 mx-auto max-w-[1200px] bg-white shadow-md rounded-[30px] py-8 px-6">
        <div className="flex items-center gap-4 mb-6 sm:mb-0">
          <FaRunning className="text-green-600 w-10 h-10" />
          <div>
            <h3 className="text-xl font-bold text-green-800">Step Tracker</h3>
            <p className="text-sm text-gray-600">Track every step with ease</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6 sm:mb-0">
          <FaAppleAlt className="text-green-600 w-10 h-10" />
          <div>
            <h3 className="text-xl font-bold text-green-800">Nutrition</h3>
            <p className="text-sm text-gray-600">Stay on top of your meals</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaHeartbeat className="text-green-600 w-10 h-10" />
          <div>
            <h3 className="text-xl font-bold text-green-800">Heart Rate</h3>
            <p className="text-sm text-gray-600">Monitor your pulse</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
