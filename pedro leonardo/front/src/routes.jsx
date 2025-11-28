import { BrowserRouter, Routes, Route } from "react-router-dom";
import GerenciarConsultas from "./components/GerenciarConsultas/GerenciarConsultas";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GerenciarConsultas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
