import DashboardLayout from "../../componet/dashboard/dashboardLayout";

export default function CommingSoon() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 ">
        <h1 className="text-4xl sm:text-5xl text-green-600 dark:text-green-500 font-bold mb-4">
          Coming Soon
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8 max-w-lg text-center">
          We&apos;re working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Notify Me
          </a>
          <a
            href="#"
            className="inline-block px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
