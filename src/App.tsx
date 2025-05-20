import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Dashboard from "./Components/dashbaord";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
