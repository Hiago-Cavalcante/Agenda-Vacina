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

const AgendaPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
  const [dataInit, setDataInit] = useState<Dayjs | null>(dayjs(null));
  const [dataEnd, setDataEnd] = useState<Dayjs | null>(dayjs(null));

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
      </div>
      <div className="agendas_content">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Situação</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem>Ten</MenuItem>
            <MenuItem>Twenty</MenuItem>
            <MenuItem>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem>Ten</MenuItem>
            <MenuItem>Twenty</MenuItem>
            <MenuItem>Thirty</MenuItem>
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
    </div>
  );
};

export default AgendaPage;
