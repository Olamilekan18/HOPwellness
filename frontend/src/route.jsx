import { Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/login";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
