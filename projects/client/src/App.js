import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Verification from "./pages/Verification";

function App() {
  return (
    <div data-theme="winter">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        <Route path="/verification/" element={<Verification />} />
      </Routes>
    </div>
  );
}

export default App;
