import "./alergia.css";
import useHandleEvents from "../../BtnNavigate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getAlergias, postAlergias, deleteAlergia } from "../../../api";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Modal,
  Box,
  IconButton as MuiIconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { style } from "../../Style";

export interface Alergia {
  id: string;
  nome: string;
}

const AlergiasPage: React.FC = function () {
  const { handleButtonHomePage } = useHandleEvents();
  const [alergias, setAlergias] = useState<Alergia[]>([]);
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValue("");
  };

  useEffect(() => {
    const fetchAlergias = async () => {
      try {
        const data = await getAlergias();
        setAlergias(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar as alergias");
        setLoading(false);
      }
    };

    fetchAlergias();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleButtonAddAlergia = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!value.trim()) {
      alert("Please, insert any alergia!");
      return;
    }

    try {
      await postAlergias({ nome: value });

      const updatedAlergias = await getAlergias();
      setAlergias(updatedAlergias);
      handleClose();
    } catch (err) {
      console.error("Erro ao adicionar alergia:", err);
      alert("Erro ao adicionar alergia");
    }
  };

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeleteAlergia = async (id: string) => {
    try {
      await deleteAlergia(id);
      setAlergias((prevAlergias) =>
        prevAlergias.filter((alergia) => alergia.id !== id)
      );
    } catch (err) {
      console.error("Erro ao deletar alergia:", err);
      alert("Erro ao deletar alergia");
    }
  };

  return (
    <div className="alergia_page">
      <div className="header_alergia">
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
      <div className="alergia_form">
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 16, height: "40px" }}
          onClick={handleOpen}
        >
          Adicionar Nova Alergia
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ mb: 3 }}>
              <h3>Adicionar Nova Alergia</h3>
            </Box>
            <TextField
              label="Nome"
              variant="outlined"
              value={value}
              onChange={handleInputChange}
              fullWidth
              sx={{
                mb: 3,
              }}
            />
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
                onClick={handleButtonAddAlergia}
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
      <div className="alergia_table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alergias?.map((alergia) => (
                <TableRow key={alergia.id || `alergia-${Math.random()}`}>
                  <TableCell>{alergia.nome}</TableCell>
                  <TableCell>
                    <MuiIconButton
                      onClick={() => handleOpenDelete()}
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
        {alergias?.map((alergia) => {
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
                      onClick={() =>  handleDeleteAlergia(alergia.id)}
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

export default AlergiasPage;
