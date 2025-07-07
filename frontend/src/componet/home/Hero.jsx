import { motion } from "framer-motion";
import HomeNav from "../header";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 min-h-screen text-gray-900 font-sans">
      <HomeNav />

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
