import { motion } from "framer-motion";
import { FaHeartbeat, FaUserMd, FaStar } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative flex flex-col items-center md:items-start">
          <motion.img
            src="https://img.freepik.com/free-photo/portrait-confident-female-doctor-hospital_23-2149370393.jpg?w=740"
            alt="Doctor"
            className="rounded-2xl w-96 sm:w-[400px] shadow-xl z-10 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />

          <motion.img
            src="https://todaysparent.mblycdn.com/uploads/tp/2006/01/GettyImages-1368004438.jpg"
            alt="Checkup"
            className="rounded-2xl w-72 sm:w-[350px] shadow-md absolute top-36 left-32 sm:left-56 z-0"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          />

          <div className="flex flex-wrap gap-4 mt-52 sm:mt-56 justify-center md:justify-start">
            <motion.div
              className="bg-white rounded-xl px-4 py-3 shadow flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FaHeartbeat className="text-red-500" />
              <div className="text-sm font-medium text-gray-800">
                95% Heart Health Success
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl px-4 py-3 shadow flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FaUserMd className="text-blue-500" />
              <div className="text-sm font-medium text-gray-800">
                Expert Trainers
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl px-4 py-3 shadow flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FaStar className="text-yellow-500" />
              <div className="text-sm font-medium text-gray-800">
                4.9★ User Rating
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green-900 font-semibold mb-2 uppercase tracking-wide">
            About Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
            Unlock Wellness with the Power of{" "}
            <span className="text-blue-700">HOP</span>
          </h2>
          <p className="text-gray-700 mb-6 text-base sm:text-lg">
            From daily health challenges to mindfulness rewards, our team helps
            you gamify your fitness journey. With mini games for wellness,
            leaderboards, and personalized progress tracking, we make health fun
            and engaging. Join us to transform your routine into a rewarding
            adventure!
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-green-200 text-green-900 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow">
              🏋️‍♂️ Workout Challenges
            </span>
            <span className="bg-blue-200 text-blue-900 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow">
              🧘 Mindful Rewards
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow">
              🥇 Wellness Badges
            </span>
            <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow">
              📊 XPs and Levels
            </span>
          </div>

          <a
            href="#"
            className="mt-5 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition-all duration-300 shadow-md"
          >
            Start Your Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
}
