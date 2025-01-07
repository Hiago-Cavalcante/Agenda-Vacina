import useHandleEvents from "../../BtnNavigate";
import "./vacinas.css";
import {
  Button,
  paperClasses,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const VacPage: React.FC = function () {
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
        <div className="vac_btn_add">
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: 16, height: "40px" }}
          >
            Adicionar Vacina
          </Button>
        </div>
      </div>
      <div className="vac_table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Titulo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Doses</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Periodicidade</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Intervalo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default VacPage;
