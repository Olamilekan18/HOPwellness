import { Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard/dashborad";
import DashboardSettings from "./pages/dashboard/settings";
import CommingSoon from "./pages/dashboard/commingSoon";
import Achievements from "./pages/dashboard/achivements";
import Leaderboard from "./pages/dashboard/leaderboard";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard">
        <Route index element={<Dashboard />} />
        <Route path="nutrition" element={<CommingSoon />} />
        <Route path="challenge" element={<CommingSoon />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="achivements" element={<Achievements />} />
        <Route path="quizzes" element={<CommingSoon />} />
        <Route path="moodtracker" element={<CommingSoon />} />
        <Route path="community" element={<CommingSoon />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="*" element={<CommingSoon />} />
      </Route>
    </Routes>
  );
}
