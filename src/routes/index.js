import HomePage from "../components/pages/HomePage";
import AgendaPage from "../components/pages/AgendaPage";
import UsersPage from "../components/pages/UsersPage";
import AlergiasPage from "../components/pages/AlergiasPage";
import VacPage from "../components/pages/VacinasPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vacinas" element={<VacPage />} />
        <Route path="/alergias" element={<AlergiasPage />} />
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
