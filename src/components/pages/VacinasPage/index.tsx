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
import { deleteVacinas, getVacinas, postVacinas } from "../../../api";
import { useEffect, useState } from "react";
import { style } from "../../Style";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Vacina {
  id: string;
  titulo: string;
  descricao: string;
  doses: string;
  periodicidade?: string;
  intervalo?: string;
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
  const [valueIntervalo, setValueIntervalo] = useState<string>();
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setValueTitulo("");
    setValueDescricao("");
    setValueDoses(NaN);
    setValuePerio("");
    setValueIntervalo("");
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
    setValueIntervalo(event.target.value);
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

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleButtonAddVacinas = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!valueTitulo.trim() || !valueDescricao.trim() || !valueDoses) {
      alert(
        "Por favor, preencha os campos obrigatórios: Título, Descrição e Doses!"
      );
      return;
    }

    try {
      await postVacinas({
        titulo: valueTitulo,
        descricao: valueDescricao,
        doses: valueDoses,
        periodicidade: valuePerio,
        intervalo: valueIntervalo,
      });

      const updatedVacinas = await getVacinas();
      setVacinas(updatedVacinas);
      handleClose();
    } catch (err) {
      console.error("Erro ao adicionar vacina:", err);
      alert("Erro ao adicionar vacina");
    }
  };

  const handleBtnDeleteUser = async (id: string) => {
    try {
      await deleteVacinas(id);
      setVacinas((prevVac) => prevVac.filter((Vac) => Vac.id !== id));
      setOpenDelete(false);
    } catch (err) {
      console.error("Erro ao deletar usuario:", err);
      alert("Erro ao deletar usuario");
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
                  onClick={handleButtonAddVacinas}
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
                    <MuiIconButton onClick={handleOpenDelete} color="error">
                      <DeleteIcon />
                    </MuiIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {vacinas?.map((vacinas) => {
          return (
            <Modal open={openDelete} onClose={handleCloseDelete}>
              <Box sx={style}>
                <h2>Excluir Vacina</h2>
                <Box sx={{ mb: 1 }}>
                  <p>Tem certeza que deseja excluir a vacina?</p>
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
                      onClick={handleCloseDelete}
                      sx={{
                        height: "40px",
                      }}
                    >
                      CANCELAR
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBtnDeleteUser(vacinas.id)}
                      sx={{
                        height: "40px",
                      }}
                    >
                      EXCLUIR
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
          );
        })}
      </div>
    </div>
  );
};

export default VacPage;
