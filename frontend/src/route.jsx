import { Routes, Route } from "react-router-dom";
import App from "./pages/App";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/app" element={<App />} />
    </Routes>
  );
}
