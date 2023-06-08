import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/greetings`
//       );
//       setMessage(data?.message || "");
//     })();
//   }, []);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>Mulai</p>
//         <img src={logo} className="App-logo" alt="logo" />
//         {message}
//       </header>
//     </div>
//   );
// }

export default App;
