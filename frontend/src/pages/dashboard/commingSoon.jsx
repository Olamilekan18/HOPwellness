import DashboardLayout from "../../componet/dashboard/dashboardLayout";

export default function CommingSoon() {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl text-green-500 font-bold mb-8 ">Coming Soon</h1>
        <p className="text-black dark:text-white text-lg mb-8">
          We&apos;re working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </DashboardLayout>
  );
}
