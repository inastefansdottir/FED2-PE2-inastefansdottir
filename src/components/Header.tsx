import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "./Button";
import LoginModal from "./Login";
import logo from "../assets/logo-white.svg";

function Header() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="flex justify-center bg-secondary w-full sticky top-0 px-10 z-30">
        <nav className="flex justify-between items-center w-full max-w-[1300px] py-2.5">
          <NavLink to={"/"}>
            <img src={logo} alt="Holidaze logo white" />
          </NavLink>

          {user ? (
            <NavLink to={"/profile"} className="flex gap-3">
              <div className="flex flex-col justify-center items-end">
                <span className="text-background text-sm">{user.name}</span>
                <div className="text-accent text-xs">
                  {user.venueManager ? (
                    <span>Manager</span>
                  ) : (
                    <span>Customer</span>
                  )}
                </div>
              </div>
              <img src={user.avatar?.url} className="rounded-full w-10 h-10" />
            </NavLink>
          ) : (
            <div className="flex gap-3 font-body font-semibold">
              <Button to={"/register"} variant="smallPrimary" size="small">
                REGISTER
              </Button>
              <Button
                onClick={() => setShowLogin(true)}
                variant="light"
                size="small"
              >
                LOGIN
              </Button>
            </div>
          )}
        </nav>
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Header;
