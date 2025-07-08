import { FiLogIn } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import image from "../../assets/image.png";
import { motion } from "framer-motion"; // Import framer-motion

export default function LoginForm() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 flex justify-center flex-1">
        <motion.div
          className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mt-5 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                {/* Animate Google Login Button */}
                <motion.button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  whileHover={{ scale: 1.05 }} // Slight scale up on hover
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
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                />
                {/* Animate Login Button */}
                <motion.button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiLogIn />
                  <span className="ml-3">Login</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 text-center hidden lg:flex">
          <motion.div
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
}
