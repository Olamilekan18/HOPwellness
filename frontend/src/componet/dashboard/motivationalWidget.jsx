import { Sparkles, RefreshCcw } from "lucide-react";
import { useState } from "react";

const quotes = [
  "Take care of your body. It's the only place you have to live.",
  "Health is not valued until sickness comes.",
  "A healthy outside starts from the inside.",
  "Your body hears everything your mind says. Stay positive.",
  "The greatest wealth is health.",
  "Health is a relationship between you and your body.",
  "The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.",
  "Don't dig your grave with your own knife and fork.",
  "It’s not about being the best, it’s about being better than you were yesterday.",
  "Small daily improvements over time lead to stunning results.",
  "Exercise not only changes your body, it changes your mind, your attitude and your mood.",
  "An ounce of prevention is worth a pound of cure.",
  "Rest and self-care are so important. When you take time to replenish, you can serve others better.",
  "Drink more water, eat real food, get enough sleep — your future self will thank you.",
  "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.",
];

export default function MotivationWidget() {
  const [quote, setQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    let newQuote = quote;
    while (newQuote === quote) {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
    setQuote(newQuote);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden transition">
      <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <Sparkles size={20} />
        <h2 className="text-md font-semibold tracking-wide">
          Your Daily Motivation
        </h2>
      </div>

      <div className="px-6 py-8 text-center space-y-6">
        <p className="text-2xl italic font-serif text-gray-800 dark:text-gray-100 transition-all duration-300">
          “{quote}”
        </p>

        <button
          onClick={getRandomQuote}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-green-600 hover:bg-green-700 text-white shadow transition"
        >
          <RefreshCcw size={16} />
          New Quote
        </button>
      </div>
    </div>
  );
}
