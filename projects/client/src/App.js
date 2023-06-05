import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <div data-theme="winter">
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
