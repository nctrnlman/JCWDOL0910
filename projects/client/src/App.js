import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Verification from "./pages/Verification";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/verification/" element={<Verification />} />
      </Routes>
    </div>
  );
}

export default App;
