import { motion } from "framer-motion";

const healthFitnessFAQ = [
  {
    question: "What is the best workout routine for weight loss?",
    answer:
      "A combination of cardiovascular exercises (like running, cycling, or swimming) and strength training (such as weight lifting or bodyweight exercises) is generally the most effective for weight loss. Consistency, along with a balanced diet, plays a crucial role in achieving weight loss goals.",
  },
  {
    question: "How many days a week should I exercise?",
    answer:
      "It depends on your goals and fitness level, but a common recommendation is 3–5 days per week. If you're focusing on building muscle, aim for strength training sessions 3–4 days a week, with cardio on alternate days. For general fitness, 30 minutes of moderate-intensity exercise, 5 days a week, is usually sufficient.",
  },
  {
    question: "How important is stretching before and after a workout?",
    answer:
      "Stretching before a workout can help warm up your muscles and improve flexibility. However, it's best to avoid intense static stretching before strength training to prevent injury. After a workout, stretching helps with muscle recovery, reduces stiffness, and increases flexibility. Incorporating a cool-down routine with gentle stretches is highly recommended.",
  },
  {
    question: "What are the benefits of strength training?",
    answer:
      "Strength training helps build muscle mass, increase bone density, and improve metabolism. It also enhances muscle endurance, balance, and posture. Besides its physical benefits, strength training can boost your mental health by reducing stress and improving sleep quality.",
  },
  {
    question: "Can I build muscle without lifting weights?",
    answer:
      "Yes! You can build muscle using bodyweight exercises like push-ups, squats, lunges, and pull-ups. These exercises are effective for building muscle, especially when performed with proper form and increased intensity. Resistance bands can also be a good alternative to weights.",
  },
  {
    question: "How can I improve my flexibility?",
    answer:
      "Improving flexibility requires regular stretching, yoga, or Pilates. Start with dynamic stretches before your workout to warm up and incorporate static stretches or yoga poses afterward to lengthen your muscles. Aim for a consistent flexibility routine, holding stretches for at least 30 seconds each time.",
  },
  {
    question: "Is cardio better than strength training for fat loss?",
    answer:
      "Both cardio and strength training are important for fat loss, but they work in different ways. Cardio helps burn calories and improves cardiovascular health, while strength training builds muscle, which in turn increases your metabolism and burns more calories at rest. A combination of both is the most effective approach to fat loss.",
  },
  {
    question: "What should I eat before and after a workout?",
    answer:
      "Before a workout, you should eat a light meal or snack that includes carbohydrates and protein, such as a banana with peanut butter or a yogurt with oats. After a workout, focus on replenishing your energy stores with carbohydrates and repairing muscle tissue with protein. A balanced post-workout meal could be chicken with rice and vegetables or a protein shake with fruit.",
  },
  {
    question: "How do I stay motivated to work out regularly?",
    answer:
      "Setting specific, measurable goals, creating a routine, and tracking your progress can help you stay motivated. It's also important to find activities you enjoy, so exercise feels less like a chore. Consider working out with a friend, joining a fitness class, or rewarding yourself after reaching milestones to maintain enthusiasm.",
  },
  {
    question: "What is a balanced diet for someone working out?",
    answer:
      "A balanced diet includes a mix of macronutrients (protein, carbs, fats) and micronutrients (vitamins and minerals). Ensure adequate protein intake to support muscle repair (e.g., chicken, tofu, beans), complex carbs for energy (e.g., whole grains, vegetables), and healthy fats (e.g., avocados, nuts). Hydration is equally important—drink plenty of water throughout the day, especially before and after workouts.",
  },
  {
    question: "How much water should I drink while exercising?",
    answer:
      "Hydration is essential for performance and recovery. Drink water before, during, and after your workout. A general guideline is to drink 17–20 ounces of water 2–3 hours before exercising, and 7–10 ounces every 10–20 minutes during exercise. After your workout, aim to replenish any lost fluids, especially if you’ve been sweating heavily.",
  },
  {
    question: "Is it safe to work out every day?",
    answer:
      "It depends on the type and intensity of your workouts. For most people, exercising every day is fine as long as you vary your routine to allow for proper recovery. You can alternate between cardio, strength training, and flexibility exercises. It’s important to listen to your body and allow rest days if needed to prevent overtraining and injury.",
  },
  {
    question: "Can yoga help with building strength?",
    answer:
      "Yes! Many yoga poses require you to support your body weight, which helps build strength, particularly in the core, arms, and legs. While yoga is often thought of as a flexibility practice, it can also improve muscle tone, balance, and endurance.",
  },
];

export default function FAQ() {
  return (
    <div className="relative w-full bg-gradient-to-br from-green-300 via-teal-200 to-blue-200 px-6 pb-8 ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10">
      <div className="mx-auto px-5">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">
            FAQ
          </h2>
          <p className="mt-3 text-lg text-black md:text-xl">
            Frequently asked questions
          </p>
        </div>

        <div className="mx-auto mt-8 w-full divide-y divide-neutral-200">
          {healthFitnessFAQ
            .map(({ question, answer }, idx) => {
              return (
                <motion.div
                  key={idx}
                  className="py-5"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span>{question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <motion.p
                      className="group-open:animate-fadeIn mt-3 text-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {answer}
                    </motion.p>
                  </details>
                </motion.div>
              );
            })
            .slice(0, 6)}
        </div>
      </div>
    </div>
  );
}
