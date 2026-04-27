import { NavLink } from "react-router-dom";
import { Button } from "./Button";
import logo from "../assets/logo-white.svg";

function Header() {
  return (
    <div className="flex justify-center bg-secondary w-full sticky top-0">
      <nav className="flex justify-between items-center w-full max-w-[1300px] py-2.5">
        <NavLink to={"/"}>
          <img src={logo} alt="Holidaze logo white" />
        </NavLink>
        <div className="flex gap-3 font-body font-semibold">
          <Button to={"/register"} variant="smallPrimary" size="small">
            REGISTER
          </Button>
          <Button variant="light" size="small">
            LOGIN
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
