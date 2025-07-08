import { FiLogIn } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [showInitialPassword, setShowInitialPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [initialPassword, setInitialPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function verifyInput() {
    const inputedName = name;

    // Check if full name is valid
    if (!verifyFullName(inputedName)) {
      return toast.error(
        <div>
          <span>
            Hey! Your full name is missing. Completing your profile will help us
            track your fitness journey better.
          </span>
        </div>,
        {
          icon: false,
          style: { backgroundColor: "#d4edda", color: "#155724" },
          className: "toast-health-success",
        }
      );
    }

    // Check if email is valid
    if (!validateEmail(email)) {
      return toast.error(
        <div>
          <span>
            Hey! Your email is missing or not in a valid format. Completing your
            profile will help us track your fitness journey better.
          </span>
        </div>,
        {
          icon: false,
          style: { backgroundColor: "#d4edda", color: "#155724" },
          className: "toast-health-success",
        }
      );
    }

    // Check if passwords match and are valid
    if (!checkIfPasswordIsTheSame() || initialPassword.length < 8) {
      return toast.error(
        <div>
          <span>
            Hey! Your passwords are not matching or they are not at least 8
            characters long.
          </span>
        </div>,
        {
          icon: false,
          style: { backgroundColor: "#d4edda", color: "#155724" },
          className: "toast-health-success",
        }
      );
    }

    // If all validations pass
    return {
      name: name,
      email: email,
      password: initialPassword,
    };
  }

  function verifyFullName(n) {
    const doesNameIncludes = n.trim().includes(" ");
    return doesNameIncludes;
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  function checkIfPasswordIsTheSame() {
    const passwordLength =
      initialPassword.length && confirmPassword.length >= 8;
    const areTheyTheSame = initialPassword === confirmPassword;

    return passwordLength && areTheyTheSame ? true : false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = verifyInput();
    console.log(response);
  };

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
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
            <span className="ml-4">Sign Up with Google</span>
          </motion.button>
        </div>

        <div className="my-12 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or sign up with email
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Fullname"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Initial password */}
          <div className="relative mt-5">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type={showInitialPassword ? "text" : "password"}
              placeholder="Password"
              value={initialPassword}
              onChange={(e) => setInitialPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={() => setShowInitialPassword(!showInitialPassword)}
                type="button"
                className="text-gray-600"
              >
                {showInitialPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="relative mt-5">
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                type="button"
                className="text-gray-600"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <motion.button
            className="mt-5 tracking-wide font-semibold bg-green-800 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            <FiLogIn />
            <span className="ml-3">Sign Up</span>
          </motion.button>
        </form>
      </div>
    </div>
  );
}
