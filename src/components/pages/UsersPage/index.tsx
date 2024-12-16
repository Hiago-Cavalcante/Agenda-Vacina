import useHandleEvents from "../../BtnNavigate";
import "./users.css";
import { Button } from "@mui/material";

const UsersPage = function () {
  const { handleButtonHomePage } = useHandleEvents();
  return (
    <div className="user_page">
      <div className="users_header">
        <Button
          variant="outlined"
          onClick={handleButtonHomePage}
          className="btn_back_home_page"
        >
          VOLTAR
        </Button>
        <h1>Usuarios</h1>
      </div>
    </div>
  );
};

export default UsersPage;
