import useHandleEvents from "../../BtnNavigate";
import "./vacinas.css";
import { Button } from "@mui/material";

const VacPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
  return (
    <div className="vac_page">
      <div className="vac_header">
        <Button
          variant="outlined"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          VOLTAR
        </Button>
      </div>
      <h1>Vacinas</h1>
    </div>
  );
};

export default VacPage;
