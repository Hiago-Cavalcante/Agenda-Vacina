import "./alergia.css";
import { Button } from "@mui/material";
import useHandleEvents from "../../BtnNavigate";

const AlergiasPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
  return (
    <div className="Alergia_Page">
      <div className="header_agendas">
        <Button
          variant="outlined"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          VOLTAR
        </Button>
        <h1>Alergias</h1>
      </div>
    </div>
  );
};

export default AlergiasPage;
