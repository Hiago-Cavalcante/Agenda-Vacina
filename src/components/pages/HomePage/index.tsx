import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PersonIcon from "@mui/icons-material/Person";
import TodayIcon from "@mui/icons-material/Today";
import "./homePage.css";
import useHandleEvents from "../../BtnNavigate";

const HomePage = function () {
  const fontSizeValue = 20;
  const {
    handleButtonVacina,
    handleButtonAlergia,
    handleButtonUsers,
    handleButtonAgenda,
  } = useHandleEvents();

  return (
    <div className="Home_Page">
      <h1>Agenda de Vacinação</h1>
      <h3> Menu de opções </h3>
      <div className="btn_main_page">
        <button onClick={handleButtonVacina}>
          <VaccinesIcon style={{ fontSize: fontSizeValue, marginRight: 4 }} />
          GERENCIAR VACINAS
        </button>
        <button onClick={handleButtonAlergia}>
          <MedicalInformationIcon
            style={{ fontSize: fontSizeValue, marginRight: 4 }}
          />
          GERENCIAR ALERGIAS
        </button>
        <button onClick={handleButtonUsers}>
          <PersonIcon style={{ fontSize: fontSizeValue, marginRight: 4 }} />
          GERENCIAR USUARIOS
        </button>
        <button onClick={handleButtonAgenda}>
          <TodayIcon style={{ fontSize: fontSizeValue, marginRight: 4 }} />
          GERENCIAR AGENDAS
        </button>
      </div>
    </div>
  );
};

export default HomePage;
