import "./agenda.css";
import Button from "@mui/material/Button";
import useHandleEvents from "../../BtnNavigate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AgendaPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
  const [dataInit, setDataInit] = useState<Dayjs | null>(dayjs());
  const [dataEnd, setDataEnd] = useState<Dayjs | null>(dayjs());

  return (
    <div className="agendas_page">
      <div className="header_agendas">
        <Button
          size="small"
          variant="text"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          <ArrowBackIosIcon style={{ fontSize: "medium" }} /> VOLTAR
        </Button>
        <h1>Agendas</h1>
        <div className="btn_add_agenda">
          <Button
            variant="contained"
            color="primary"
            // onClick={handleOpenDialog}
            style={{ marginBottom: 16 }}
          >
            Adicionar Nova Agenda
          </Button>
        </div>
      </div>
      <div className="agendas_content">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Situação</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem>Todas</MenuItem>
            <MenuItem>Agendada</MenuItem>
            <MenuItem>Concluida</MenuItem>
            <MenuItem>Cancelada</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem>Todos</MenuItem>
            <MenuItem>Usuario </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="input_data_agenda">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Data Inicio"
              value={dataInit}
              onChange={(newValue) => setDataInit(newValue)}
              format="DD/MM/YYYY"
            />
            <DatePicker
              label="Data Fim"
              value={dataEnd}
              onChange={(newValue) => setDataEnd(newValue)}
              format="DD/MM/YYYY"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="agenda_table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Observações</TableCell>
                <TableCell>Vacina</TableCell>
                <TableCell>Dose</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Situação</TableCell>
                <TableCell>Data situação</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AgendaPage;
