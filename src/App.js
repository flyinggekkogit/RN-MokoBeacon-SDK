import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import Dasboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dasboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
