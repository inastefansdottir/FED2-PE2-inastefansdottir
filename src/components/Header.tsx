import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./Login";
import logo from "../assets/logo-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  // Outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }

      // Profile menu
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Log out
  function handleLogout() {
    logoutUser();
    setProfileMenuOpen(false);
    navigate("/");
  }

  return (
    <>
      <header className="relative flex justify-center bg-secondary w-full sticky top-0 px-4 md:px-10 z-30">
        <nav className="flex justify-between items-center w-full max-w-[1300px] py-2.5">
          <NavLink to={"/"}>
            <img src={logo} alt="Holidaze logo white" />
          </NavLink>

          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex gap-3 items-center transition hover:opacity-80"
              >
                <div className="flex flex-col justify-center items-end">
                  <span className="text-background text-sm">{user.name}</span>

                  <div className="text-accent text-xs">
                    {user.venueManager ? (
                      <span>Manager</span>
                    ) : (
                      <span>Traveller</span>
                    )}
                  </div>
                </div>

                <img
                  src={user.avatar?.url}
                  className="rounded-full w-10 h-10 object-cover"
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute top-full mt-5 right-0 w-fit bg-secondary p-6 flex flex-col gap-3 shadow-lg rounded-2xl">
                  <NavLink
                    to="/profile"
                    onClick={() => setProfileMenuOpen(false)}
                    className="px-5 py-2.5 text-sm transition-colors font-body text-background font-semibold rounded-full bg-primary hover:bg-secondary text-center"
                  >
                    Profile
                  </NavLink>

                  <Button
                    variant="error"
                    size="small"
                    onClick={handleLogout}
                    className="w-[113px]"
                  >
                    Log out
                  </Button>
                </div>
              )}
            </div>
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
          <div
            ref={mobileMenuRef}
            className="min-[450px]:hidden absolute top-full mt-5 right-0 w-fit bg-secondary p-6 flex flex-col gap-3 shadow-lg rounded-2xl"
          >
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
