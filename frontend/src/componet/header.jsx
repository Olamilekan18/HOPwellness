import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section className="bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 min-h-screen text-gray-900 font-sans">
      {/* Header */}
      <motion.header
        className="shadow-lg relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://www.shutterstock.com/image-vector/fitness-logo-vector-symbol-icon-600nw-1926906863.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800 tracking-wide">
              HOP
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-green-600">
              About Us
            </a>
            <a href="#" className="hover:text-green-600">
              Clients & Results
            </a>
            <a href="#" className="hover:text-green-600">
              Contact
            </a>
          </nav>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex gap-3">
            <motion.button
              className="border-2 border-green-700 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Log In
            </motion.button>
            <motion.button
              className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-800 focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white px-4 py-4 space-y-4 shadow-inner"
            >
              <a
                href="#"
                className="block text-sm font-medium hover:text-green-600"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-sm font-medium hover:text-green-600"
              >
                Clients & Results
              </a>
              <a
                href="#"
                className="block text-sm font-medium hover:text-green-600"
              >
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <button className="border-2 border-green-700 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white">
                  Log In
                </button>
                <button className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800">
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Revolutionize Your Health
        </motion.h2>
        <p className="text-gray-700 text-base sm:text-lg max-w-xl mx-auto mb-8">
          Achieve your wellness goals with personalized fitness routines,
          mindful moments, and nutritious eating habits.
        </p>
        <motion.button
          className="px-6 py-3 border-2 border-white text-black font-semibold rounded-full hover:bg-white hover:text-gray-900 transition"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>

        {/* Images Section */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.img
            src="https://img.freepik.com/free-photo/beautiful-blonde-woman-doing-yoga-outdoors_23-2148739137.jpg?semt=ais_hybrid&w=740"
            alt="Yoga"
            className="rounded-xl shadow-lg object-cover w-full h-56 sm:h-60 md:h-64 hover:scale-105 transition"
          />
          <motion.img
            src="https://todaysparent.mblycdn.com/uploads/tp/2006/01/GettyImages-1368004438.jpg"
            alt="Happy Couple"
            className="rounded-xl shadow-lg object-cover w-full h-56 sm:h-60 md:h-64 hover:scale-105 transition"
          />
          <motion.img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIFckTtBx4RNmpshNkY9051EPYUYMZwXEVNA&s"
            alt="Smoothies"
            className="rounded-xl shadow-lg object-cover w-full h-56 sm:h-60 md:h-64 hover:scale-105 transition"
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mt-14 gap-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { value: "300,000+", label: "people improved their well-being" },
            { value: "90%", label: "saw fitness gains in 3 months" },
            { value: "70%", label: "reduced stress with mindfulness" },
            { value: "95%", label: "satisfaction with mental balance" },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}>
              <h3 className="text-2xl sm:text-3xl font-bold text-black">
                {stat.value}
              </h3>
              <p className="text-sm sm:text-base text-black">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </section>
  );
}
