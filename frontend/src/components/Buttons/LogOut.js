import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../../store/session";

function LogOut() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    return <Redirect to="/" />;
  };

  return (
    <Button
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
}

export default LogOut;
