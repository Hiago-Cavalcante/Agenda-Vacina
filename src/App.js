import "./app.css";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PersonIcon from "@mui/icons-material/Person";
import TodayIcon from "@mui/icons-material/Today";

function App() {
  const fontSizeValue = 20;
  return (
    <div className="App">
      <h1>Agenda de Vacinação</h1>
      <h3> Menu de opções </h3>
      <div className="btn_main_page">
        <button>
          <VaccinesIcon style={{ fontSize: fontSizeValue, marginRight: 4 }} />
          GERENCIAR VACINAS
        </button>
        <button>
          <MedicalInformationIcon
            style={{ fontSize: fontSizeValue, marginRight: 4 }}
          />
          GERENCIAR ALERGIAS
        </button>
        <button>
          <PersonIcon style={{ fontSize: fontSizeValue, marginRight: 4 }} />
          GERENCIAR USUARIOS
        </button>
        <button>
          <TodayIcon style={{ fontSize: fontSizeValue, marginRight: 4 }} />
          GERENCIAR AGENDAS
        </button>
      </div>
    </div>
  );
}

export default App;
