import { motion } from "framer-motion";

const testimonialsMade = [
  {
    name: "Sarah Thompson",
    testimonial:
      "I had an amazing experience! The staff was friendly, professional, and truly cared about my health.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "David Martinez",
    testimonial:
      "From my first appointment, I felt at ease. The doctors explained everything clearly and made me feel comfortable.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emily Chen",
    testimonial:
      "Exceptional service and a very warm atmosphere. I highly recommend this clinic to anyone looking for quality care.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Michael O'Neill",
    testimonial:
      "The best healthcare experience I've ever had. Everyone went above and beyond to make sure I was taken care of.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Ayesha Khan",
    testimonial:
      "Super impressed with the level of care and attention to detail. Everything was top-notch from start to finish.",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "James Roberts",
    testimonial:
      "Professional, clean, and efficient. Booking was easy and the treatment I received exceeded my expectations.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

export default function Testimonial() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 py-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-epilogue">
          Our trusted clients
        </h2>
        <p className="text-black max-w-2xl mx-auto">
          Our mission is to drive progress and enhance the lives of our
          customers by delivering superior products and services that exceed
          expectations.
        </p>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsMade.map(({ name, testimonial, image }, idx) => {
          return (
            <motion.div
              key={idx}
              className="relative text-center transition-transform duration-300 p-6 bg-white rounded-[30px] outline-1 outline-offset-[-1px] outline-[#f5f7f9] flex flex-col justify-center items-center gap-5  shadow-[0px_25px_52px_-12px_rgba(17,17,17,0.20)]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="space-y-6">
                <h4 className="text-[#323b47] text-xl font-bold leading-tight">
                  {name}
                </h4>
                <p className="text-[#58677d] text-lg font-medium leading-snug">
                  {testimonial}
                </p>
              </div>
              <div className="p-3.5 rounded-full outline-1 outline-offset-[-1px] outline-[#e9eff7] flex justify-center items-center">
                <img
                  src="https://img.icons8.com/?size=100&id=38968&format=png&color=000000"
                  alt="quote"
                  className="w-6 h-6"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
