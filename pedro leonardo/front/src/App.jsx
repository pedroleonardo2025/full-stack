import { BrowserRouter, Routes, Route } from "react-router-dom";
import GerenciarConsultas from "./components/GerenciarConsultas/GerenciarConsultas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GerenciarConsultas />} />
      </Routes>
    </BrowserRouter>
  );
}
