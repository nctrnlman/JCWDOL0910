import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
