import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  function logout() {
    logoutUser();
    navigate("/");
  }

  return (
    <Button onClick={logout} variant="primary" className="bg-error">
      Log out
    </Button>
  );
}

export default ProfilePage;
