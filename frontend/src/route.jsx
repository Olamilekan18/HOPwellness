import { Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard/dashborad";
import DashboardSettings from "./pages/dashboard/settings";
import CommingSoon from "./pages/dashboard/commingSoon";
import Achievements from "./pages/dashboard/achivements";
import Leaderboard from "./pages/dashboard/leaderboard";
import Challenge from "./pages/dashboard/challenge";
import MoodTracker from "./pages/dashboard/moodTracker";
import AboutUs from "./pages/aboutUs";
import ContactPage from "./pages/contact";
import Community from "./pages/dashboard/community";
import Nutrition from "./pages/dashboard/nutrition";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/dashboard">
        <Route index element={<Dashboard />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="challenge" element={<Challenge />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="achivements" element={<Achievements />} />
        <Route path="quizzes" element={<CommingSoon />} />
        <Route path="moodtracker" element={<MoodTracker />} />
        <Route path="community">
          <Route index element={<Community />} />
          <Route path=":communityId" element={<Community />} />
        </Route>
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="*" element={<CommingSoon />} />
      </Route>
    </Routes>
  );
}
