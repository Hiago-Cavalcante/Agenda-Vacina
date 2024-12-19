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
  IconButton as MuiIconButton, // Renomeando para evitar conflitos
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

      setValue("");
    } catch (err) {
      console.error("Erro ao adicionar alergia:", err);
      alert("Erro ao adicionar alergia");
    }
  };

  const handleDeleteAlergia = async (id: string) => {
    try {
      await deleteAlergia(id);
      // Atualiza o estado removendo a alergia deletada
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
      <div className="alergia_content">
        <div className="input_new_alergia">
          <TextField
            label="Nova Alergia"
            variant="outlined"
            value={value}
            onChange={handleInputChange}
            fullWidth
            sx={{
              width: "600px",
            }}
          />
        </div>

        <div className="btn_add_alergia">
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonAddAlergia}
            style={{ marginBottom: 16, height: "40px" }}
          >
            Adicionar
          </Button>
        </div>
      </div>
      <div className="alergia_table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Alergias:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alergias?.map((alergia) => (
                <TableRow key={alergia.id || `alergia-${Math.random()}`}>
                  <TableCell>{alergia.nome}</TableCell>
                  <TableCell>
                    <MuiIconButton
                      onClick={() => handleDeleteAlergia(alergia.id)}
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

export default AlergiasPage;
