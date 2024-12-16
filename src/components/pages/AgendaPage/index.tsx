import { useNavigate } from "react-router-dom";
import "./agenda.css";
import Button from "@mui/material/Button";
import React from "react";
import useHandleEvents from "../../BtnNavigate";

const AgendaPage = function () {
  const { handleButtonHomePage } = useHandleEvents();

  return (
    <div className="agendas_page">
      <div className="header_agendas">
        <Button
          variant="outlined"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          VOLTAR
        </Button>
        <h1>Agendas</h1>
      </div>
    </div>
  );
};

export default AgendaPage;
