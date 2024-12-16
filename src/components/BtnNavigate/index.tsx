import { useNavigate } from "react-router-dom";

const useHandleEvents = () => {
  const navigate = useNavigate();

  const handleButtonHomePage = () => navigate("/");
  const handleButtonVacina = () => navigate("/vacinas");
  const handleButtonAlergia = () => navigate("/alergias");
  const handleButtonUsers = () => navigate("/usuarios");
  const handleButtonAgenda = () => navigate("/agenda");

  return {
    handleButtonHomePage,
    handleButtonVacina,
    handleButtonAlergia,
    handleButtonUsers,
    handleButtonAgenda,
  };
};

export default useHandleEvents;
