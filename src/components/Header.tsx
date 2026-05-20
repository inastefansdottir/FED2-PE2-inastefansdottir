import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./Login";
import logo from "../assets/logo-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { user } = useAuth();

  const [showLogin, setShowLogin] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative flex justify-center bg-secondary w-full sticky top-0 px-4 md:px-10 z-30">
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
              <img
                src={user.avatar?.url}
                className="rounded-full w-10 h-10 object-cover"
              />
            </NavLink>
          ) : (
            <>
              {/* Desktop buttons */}
              <div className="hidden min-[450px]:flex gap-3 font-body font-semibold">
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

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="min-[450px]:hidden text-background text-2xl"
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
              </button>
            </>
          )}
        </nav>
        {menuOpen && (
          <div className="min-[450px]:hidden absolute top-full mt-5 right-0 w-fit bg-secondary p-6 flex flex-col gap-3 shadow-lg rounded-2xl">
            <Button to={"/register"} variant="smallPrimary" size="small">
              REGISTER
            </Button>

            <Button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              variant="light"
              size="small"
            >
              LOGIN
            </Button>
          </div>
        )}
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Header;
