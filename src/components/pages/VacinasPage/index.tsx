import useHandleEvents from "../../BtnNavigate";
import "./vacinas.css";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Modal,
  Box,
  TextField,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { deleteVacinas, getVacinas } from "../../../api";
import { useEffect, useState } from "react";
import { style } from "../../Style";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Vacina {
  id: string;
  titulo: string;
  descricao: string;
  doses: number;
  periodicidade: string;
  intervalo: number;
}
const periodicidade = [
  {
    value: "DIAS",
    label: "DIAS",
  },
  {
    value: "SEMANAS",
    label: "SEMANAS",
  },
  {
    value: "MESES",
    label: "MESES",
  },
  {
    value: "ANOS",
    label: "ANOS",
  },
];

const VacPage: React.FC = function () {
  const { handleButtonHomePage } = useHandleEvents();
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [valueTitulo, setValueTitulo] = useState<string>("");
  const [valueDescricao, setValueDescricao] = useState<string>("");
  const [valueDoses, setValueDoses] = useState<number>();
  const [valuePerio, setValuePerio] = useState<string>("");
  const [valueIntervalo, setValueIntervalo] = useState<number>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setValueTitulo("");
    setValueDescricao("");
    setValueDoses(undefined);
    setValuePerio("");
    setValueIntervalo(undefined);
    setOpen(false);
  };

  const handleInputTitulo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitulo(event.target.value);
  };

  const handleInputDescricao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueDescricao(event.target.value);
  };
  const handleInputDoses = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueDoses(Number(event.target.value));
  };
  const handleInputPerio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuePerio(event.target.value);
  };
  const handleInputIntervalo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueIntervalo(Number(event.target.value));
  };
  useEffect(() => {
    const fetchVacinas = async () => {
      try {
        const data = await getVacinas();
        setVacinas(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar as alergias");
        setLoading(false);
      }
    };

    fetchVacinas();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleDeleteVacinas = async (id: string) => {
    try {
      await deleteVacinas(id);
      setVacinas((prevVacina) =>
        prevVacina.filter((vacina) => vacina.id !== id)
      );
    } catch (err) {
      console.error("Erro ao deletar vacina:", err);
      alert("Erro ao deletar vacina");
    }
  };

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
            onClick={handleOpen}
          >
            Adicionar Vacina
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Box sx={{ mb: 1 }}>
                <h3>Nova Vacina </h3>
                <TextField
                  label="Titulo"
                  variant="outlined"
                  value={valueTitulo}
                  onChange={handleInputTitulo}
                  fullWidth
                  sx={{
                    mb: 1,
                  }}
                />
                <TextField
                  label="Descrição"
                  variant="outlined"
                  value={valueDescricao}
                  onChange={handleInputDescricao}
                  fullWidth
                  sx={{
                    mb: 1,
                  }}
                />
                <TextField
                  label="Doses"
                  type="number"
                  value={valueDoses}
                  onChange={handleInputDoses}
                  fullWidth
                  sx={{
                    mb: 1,
                  }}
                />
                <TextField
                  select
                  label="Periodicidade"
                  defaultValue=" "
                  variant="outlined"
                  value={valuePerio}
                  onChange={handleInputPerio}
                  fullWidth
                  sx={{
                    mb: 1,
                  }}
                >
                  {periodicidade.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Intervalo"
                  type="number"
                  value={valueIntervalo}
                  onChange={handleInputIntervalo}
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "6px",
                }}
              >
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleClose}
                  sx={{
                    height: "40px",
                  }}
                >
                  CANCELAR
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    height: "40px",
                  }}
                >
                  ADICIONAR
                </Button>
              </Box>
            </Box>
          </Modal>
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
            <TableBody>
              {vacinas?.map((vacinas) => (
                <TableRow key={vacinas.id}>
                  <TableCell>{vacinas.titulo}</TableCell>
                  <TableCell>{vacinas.descricao}</TableCell>
                  <TableCell>{vacinas.doses}</TableCell>
                  <TableCell>{vacinas.periodicidade}</TableCell>
                  <TableCell>{vacinas.intervalo}</TableCell>
                  <TableCell>
                    <MuiIconButton
                      onClick={() => handleDeleteVacinas(vacinas.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </MuiIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default VacPage;
