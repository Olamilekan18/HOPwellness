import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
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
            <motion.a
              href="/login"
              className="border-2 border-green-700 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Log In
            </motion.a>
            <motion.a
              href="/signup"
              className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Sign Up
            </motion.a>
          </div>

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
    </>
  );
}
