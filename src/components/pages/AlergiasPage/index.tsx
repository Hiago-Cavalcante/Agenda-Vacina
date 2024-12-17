import "./alergia.css";
import { Button } from "@mui/material";
import useHandleEvents from "../../BtnNavigate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AlergiasPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
  return (
    <div className="alergia_page">
      <div className="header_agendas">
        <Button
          size="small"
          variant="text"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          <ArrowBackIosIcon style={{ fontSize: "medium" }} /> VOLTAR
        </Button>
        <h1>Alergias</h1>
      </div>
    </div>
  );
};

export default AlergiasPage;
