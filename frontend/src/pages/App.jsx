import { motion } from "framer-motion";

function App() {
  return (
    <section className="bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 min-h-screen text-gray-900 font-sans">
      {/* Header */}
      <motion.header
        className="shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://www.shutterstock.com/image-vector/fitness-logo-vector-symbol-icon-600nw-1926906863.jpg"
              alt="Healthify Logo"
              className="w-14 h-14 rounded-full"
            />
            <h1 className="text-3xl font-extrabold text-green-800 tracking-wide">
              HOP
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a
              href="#"
              className="text-gray-900 hover:text-green-600 transition-all duration-300 ease-in-out"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-green-600 transition-all duration-300 ease-in-out"
            >
              Clients & Results
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-green-600 transition-all duration-300 ease-in-out"
            >
              Contact
            </a>
          </nav>
          <div className="hidden md:flex gap-4">
            <motion.button
              className="text-black border-2 border-green-700 px-5 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Log In
            </motion.button>
            <motion.button
              className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Revolutionize Your Health
        </motion.h2>
        <p className="text-gray-700 text-lg max-w-xl mx-auto mb-8">
          Achieve your wellness goals with personalized fitness routines,
          mindful moments, and nutritious eating habits.
        </p>
        <motion.button
          className="px-6 py-3 border-2 border-white text-black font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>

        {/* Images Section */}
        <motion.div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.img
            src="https://img.freepik.com/free-photo/beautiful-blonde-woman-doing-yoga-outdoors_23-2148739137.jpg?semt=ais_hybrid&w=740"
            alt="Yoga"
            className="rounded-xl shadow-lg object-cover w-full h-60 transition-all duration-500 hover:scale-105"
          />
          <motion.img
            src="https://todaysparent.mblycdn.com/uploads/tp/2006/01/GettyImages-1368004438.jpg"
            alt="Happy Couple"
            className="rounded-xl shadow-lg object-cover w-full h-60 transition-all duration-500 hover:scale-105"
          />
          <motion.img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIFckTtBx4RNmpshNkY9051EPYUYMZwXEVNA&s"
            alt="Smoothies"
            className="rounded-xl shadow-lg object-cover w-full h-60 transition-all duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 mt-14 gap-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-green-800">300,000+</h3>
            <p className="text-sm text-gray-500">
              people improved their well-being
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-green-800">90%</h3>
            <p className="text-sm text-gray-500">
              saw fitness gains in 3 months
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-green-800">70%</h3>
            <p className="text-sm text-gray-500">
              reduced stress with mindfulness
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-green-800">95%</h3>
            <p className="text-sm text-gray-500">
              satisfaction with mental balance
            </p>
          </motion.div>
        </motion.div>
      </section>
    </section>
  );
}

export default App;
