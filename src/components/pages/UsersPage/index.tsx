import useHandleEvents from "../../BtnNavigate";
import "./users.css";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const UsersPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
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
      </div>
    </div>
  );
};

export default UsersPage;
