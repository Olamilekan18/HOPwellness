import { FaRunning, FaHeartbeat, FaAppleAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function App() {
  return (
    <section className="bg-white min-h-screen text-gray-800">
      {/* Header */}
      <motion.header
        className="bg-green-200 shadow-md"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://www.shutterstock.com/image-vector/fitness-logo-vector-symbol-icon-600nw-1926906863.jpg"
              alt="Healthify Logo"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-2xl font-extrabold text-green-700">HOP</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            <a
              href="#"
              className="text-green-800 hover:text-green-600 transition"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-green-800 hover:text-green-600 transition"
            >
              Clients & Results
            </a>
            <a
              href="#"
              className="text-green-800 hover:text-green-600 transition"
            >
              Contact
            </a>
          </nav>
          <div className="hidden md:flex gap-3">
            <motion.button
              className="text-green-700 border border-green-700 px-4 py-2 rounded-full hover:bg-green-50 transition"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Log In
            </motion.button>
            <motion.button
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-green-800 mb-6 leading-snug">
            Reach Your Fitness <span className="text-green-500">Goals</span>{" "}
            <br />
            With HOP
          </h2>
          <p className="text-gray-700 mb-8">
            Empower your journey to a healthier lifestyle with personalized
            plans, real-time tracking, and expert tips.
          </p>
          <div className="flex gap-4">
            <motion.button
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition font-semibold"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition font-semibold"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="rounded-[30px] overflow-hidden shadow-xl transition-all">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/701/articles/2017/01/how-much-joining-gym-helps-health-2-jpg-1488906648.jpeg?resize=640:*"
              alt="Fitness Illustration"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <motion.section
        className="bg-green-200 py-14"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <motion.div
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaRunning className="text-green-600 w-10 h-10" />
            <div>
              <h3 className="text-xl font-bold text-green-800">Step Tracker</h3>
              <p className="text-gray-600 text-sm">
                Track every step with intuitive insights.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaAppleAlt className="text-green-600 w-10 h-10" />
            <div>
              <h3 className="text-xl font-bold text-green-800">
                Nutrition Guide
              </h3>
              <p className="text-gray-600 text-sm">
                Stay informed and balanced with healthy meals.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <FaHeartbeat className="text-green-600 w-10 h-10" />
            <div>
              <h3 className="text-xl font-bold text-green-800">
                Heart Monitor
              </h3>
              <p className="text-gray-600 text-sm">
                Track your heart rate and maintain fitness.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </section>
  );
}

export default App;
