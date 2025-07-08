import { FiLogIn } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
export default function Form() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
      <div className="w-full flex-1 mt-8">
        <div className="flex flex-col items-center">
          <motion.button
            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white p-2 rounded-full">
              <FaGoogle />
            </div>
            <span className="ml-4">Login with Google</span>
          </motion.button>
        </div>

        <div className="my-12 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or login with e-mail
          </div>
        </div>

        <div className="mx-auto max-w-xs">
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            placeholder="Email"
          />

          <div className="relative mt-5">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                type="button"
                className="text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}{" "}
              </button>
            </div>
          </div>

          <motion.button
            className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiLogIn />
            <span className="ml-3">Login</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
