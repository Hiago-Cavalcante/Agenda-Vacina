import "./alergia.css";
import { Button } from "@mui/material";
import useHandleEvents from "../../BtnNavigate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getAlergias, postAlergias } from "../../../api";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Alergia {
  id: number;
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
                <TableCell>Todas Alergias:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alergias?.map((alergia) => (
                <TableRow key={alergia.id || `alergia-${Math.random()}`}>
                  <TableCell>{alergia.nome}</TableCell>
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
