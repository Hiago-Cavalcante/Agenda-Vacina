import useHandleEvents from "../../BtnNavigate";
import "./users.css";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Table,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useState } from "react";
import { style } from "../../Style";
import { useEffect } from "react";
import { deleteUsers, getUsers, postUsers } from "../../../api";
import { Alergia } from "../AlergiasPage";

const estadosBrasil = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export interface User {
  id: string;
  nome: string;
  dataNascimento: string;
  sexo: "MASCULINO" | "FEMININO";
  logradouro: string;
  numero: string;
  setor: string;
  cidade: string;
  uf: string;
  alergias: Alergia[];
}

const UsersPage = function () {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User[]>([]);
  const [openDelete, setOpenDelete] = useState(false);

  const { handleButtonHomePage } = useHandleEvents();
  const [valueNome, setValueNome] = useState<string>("");
  const [valueDataNascimento, setValueDataNascimento] = useState<string>("");
  const [valueSexo, setValueSexo] = useState<string>("");
  const [valueLogradouro, setValueLogradouro] = useState<string>("");
  const [valueNumero, setValueNumero] = useState<string>("");
  const [valueSetor, setValueSetor] = useState<string>("");
  const [valueCidade, setValueCidade] = useState<string>("");
  const [valueUF, setValueUF] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValueNome("");
    setValueDataNascimento("");
    setValueSexo("");
    setValueLogradouro("");
    setValueNumero("");
    setValueSetor("");
    setValueCidade("");
    setValueUF("");
  };

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleInputNome = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueNome(event.target.value);
  };

  const handleInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueDataNascimento(event.target.value);
  };

  const handleInputSexo = (event: SelectChangeEvent<string>) => {
    setValueSexo(event.target.value);
  };

  const handleInputlogradouro = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValueLogradouro(event.target.value);
  };
  const handleInputNumero = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueNumero(event.target.value);
  };
  const handleInputSetor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSetor(event.target.value);
  };
  const handleInputCidade = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCidade(event.target.value);
  };
  const handleInputUF = (event: SelectChangeEvent<string>) => {
    setValueUF(event.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUser(response);
        setLoading(false);
      } catch (err) {
        setError(`Erro ao buscar usuarios: ${err}`);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleAddUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      !valueNome ||
      !valueDataNascimento ||
      !valueSexo ||
      !valueLogradouro ||
      !valueNumero ||
      !valueSetor ||
      !valueCidade ||
      !valueUF
    ) {
      alert("Preencha todos os campos");
      return;
    }
    try {
      await postUsers({
        nome: valueNome,
        dataNascimento: valueDataNascimento,
        sexo: valueSexo,
        logradouro: valueLogradouro,
        numero: valueNumero,
        setor: valueSetor,
        cidade: valueCidade,
        uf: valueUF,
      });
      const updatedUsers = await getUsers();
      setUser(updatedUsers);
      handleClose();
    } catch (err) {
      console.error("Erro ao adicionar usuario:", err);
      alert("Erro ao adicionar usuario");
    }
  };

  const handleBtnDeleteUser = async (id: string) => {
    try {
      await deleteUsers(id);
      setUser((prevUser) => prevUser.filter((user) => user.id !== id));
      setOpenDelete(false);
    } catch (err) {
      console.error("Erro ao deletar usuario:", err);
      alert("Erro ao deletar usuario");
    }
  };

  return (
    <div className="user_page">
      <div className="users_header">
        <Button
          size="small"
          variant="text"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          <ArrowBackIosIcon style={{ fontSize: "medium" }} /> VOLTAR
        </Button>
        <h1>Usuarios</h1>
        <div className="user_btn_add">
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: 16, height: "40px" }}
            onClick={handleOpen}
          >
            Adicionar Novo Usuario
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Box sx={{ mb: 1 }}>
                <h3>Adicionar Novo Usuario</h3>
                <TextField
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  value={valueNome}
                  onChange={handleInputNome}
                  sx={{
                    mb: 1,
                  }}
                />
                <TextField
                  margin="dense"
                  label="Data de Nascimento"
                  name="dataNascimento"
                  type="date"
                  fullWidth
                  value={valueDataNascimento}
                  onChange={handleInputData}
                  sx={{
                    mb: 1,
                  }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="sexo-label">Sexo</InputLabel>
                  <Select
                    labelId="sexo-label"
                    name="sexo"
                    value={valueSexo}
                    label="Sexo"
                    onChange={handleInputSexo}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <MenuItem value="MASCULINO">MASCULINO</MenuItem>
                    <MenuItem value="FEMININO">FEMININO</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Logradouro"
                  variant="outlined"
                  fullWidth
                  value={valueLogradouro}
                  onChange={handleInputlogradouro}
                  sx={{
                    mb: 1,
                  }}
                />
                <TextField
                  label="Número"
                  variant="outlined"
                  fullWidth
                  value={valueNumero}
                  onChange={handleInputNumero}
                  sx={{
                    mb: 2,
                  }}
                />
                <TextField
                  label="Setor"
                  variant="outlined"
                  fullWidth
                  value={valueSetor}
                  onChange={handleInputSetor}
                  sx={{
                    mb: 2,
                  }}
                />
                <TextField
                  label="Cidade"
                  variant="outlined"
                  fullWidth
                  value={valueCidade}
                  onChange={handleInputCidade}
                  sx={{
                    mb: 1,
                  }}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="sexo-label">UF</InputLabel>
                  <Select
                    labelId="UF_label"
                    name="UF"
                    value={valueUF}
                    label="UF"
                    onChange={handleInputUF}
                    sx={{
                      mb: 1,
                    }}
                  >
                    {estadosBrasil.map((values) => {
                      return (
                        <MenuItem key={values} value={values}>
                          {values}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
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
                    onClick={handleAddUser}
                    sx={{
                      height: "40px",
                    }}
                  >
                    ADICIONAR
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="users_table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Data de Nascimento
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sexo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Endereço</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Alergias</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user?.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{user.dataNascimento}</TableCell>
                    <TableCell>{user.sexo}</TableCell>
                    <TableCell>
                      {user.logradouro}, {user.numero}, {user.setor},{" "}
                      {user.cidade} - {user.uf}
                    </TableCell>
                    <TableCell>
                      {(!!user.alergias.length &&
                        user.alergias.map((a) => (
                          <div key={a.id}>{a.nome}</div>
                        ))) ||
                        "N/A"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleOpenDelete} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {user?.map((user) => {
          return (
            <Modal open={openDelete} onClose={handleCloseDelete}>
              <Box sx={style}>
                <h2>Excluir Usuario</h2>
                <Box sx={{ mb: 1 }}>
                  <p>Tem certeza que deseja excluir o usuario?</p>
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
                      onClick={() => handleBtnDeleteUser(user.id)}
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

export default UsersPage;
