import useHandleEvents from "../../BtnNavigate";
import "./vacinas.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const VacPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
  return (
    <div className="vac_page">
      <div className="vac_header">
        <Button
          size="small"
          variant="text"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          <ArrowBackIosIcon style={{ fontSize: "medium" }} /> VOLTAR
        </Button>
        <h1>Vacinas</h1>
      </div>
    </div>
  );
};

export default VacPage;
