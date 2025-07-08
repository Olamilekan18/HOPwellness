import DashboardLayout from "../../componet/dashboard/dashboardLayout";
// import MotivationWidget from "../../componet/dashboard/motivationalWidget";
import UserOverViewCard from "../../componet/dashboard/userOverViewCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <UserOverViewCard />
      {/* <MotivationWidget /> */}
    </DashboardLayout>
  );
}
