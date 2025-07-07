import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-green-300 via-teal-200 to-blue-200  py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-10 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <motion.div
            className="lg:pr-10 lg:pt-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="lg:max-w-lg">
              <motion.h2
                className="text-sm font-semibold leading-7 text-teal-600 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Why Choose Us
              </motion.h2>
              <motion.p
                className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Wellness Backed by Results
              </motion.p>
              <motion.p
                className="mt-6 text-lg leading-8 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                HOP is more than a platform — it&apos;s your all-in-one guide
                for mental, physical, and emotional wellness. Our team is here
                to coach, support, and reward your growth every step of the way.
              </motion.p>

              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-800 lg:max-w-none">
                {/* First Item */}
                <motion.div
                  className="relative pl-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <dt className="inline font-semibold text-gray-900">
                    <svg
                      className="absolute left-0 top-1 h-6 w-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Personalized Wellness Plans
                  </dt>
                  <dd className="inline">
                    Track your goals and progress with routines crafted just for
                    you.
                  </dd>
                </motion.div>

                {/* Second Item */}
                <motion.div
                  className="relative pl-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <dt className="inline font-semibold text-gray-900">
                    <svg
                      className="absolute left-0 top-1 h-6 w-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656l-1.414 1.414a1 1 0 00-.293.707V15a1 1 0 01-1 1h-3v-1a3 3 0 00-6 0v1H6a1 1 0 01-1-1v-2.05a1 1 0 00-.293-.707L3.172 10.83a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Holistic Health Focus
                  </dt>
                  <dd className="inline">
                    We support both your physical strength and emotional
                    balance.
                  </dd>
                </motion.div>

                {/* Third Item */}
                <motion.div
                  className="relative pl-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <dt className="inline font-semibold text-gray-900">
                    <svg
                      className="absolute left-0 top-1 h-6 w-6 text-teal-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 7H7v6h6V7z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Reward-Based System
                  </dt>
                  <dd className="inline">
                    Earn points and badges for consistency, effort, and results.
                  </dd>
                </motion.div>
              </dl>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <a
                  href="#"
                  className="rounded-md bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition"
                >
                  Explore More →
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image with motion */}
          <motion.img
            src="https://img.freepik.com/free-photo/happy-woman-holding-dumbbells-sport-healthy-lifestyle_1303-17582.jpg?w=1080"
            alt="Fitness Wellness"
            className="w-[48rem] max-w-full rounded-xl shadow-xl ring-1 ring-gray-300/10 sm:w-[44rem] md:-ml-4 lg:-ml-0"
            width="960"
            height="600"
            loading="lazy"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
