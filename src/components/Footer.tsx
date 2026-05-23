import { Link } from "react-router-dom";
import logoGreen from "../assets/logo-green.svg";

function Footer() {
  return (
    <footer className="flex justify-center bg-brownLight text-secondary md:px-10 px-5">
      <div className="flex flex-wrap justify-between max-[595px]:justify-start w-full max-w-[1300px] gap-x-16 gap-y-10 pt-9 pb-16">
        <div className="max-[700px]:hidden max-[595px]:block">
          <img src={logoGreen} alt="Holidaze logo" />
          <p className="font-light">Find your next stay anywhere</p>
        </div>

        <div className="flex flex-col gap-2.5 max-[595px]:w-[180px]">
          <span className="font-semibold">Navigation</span>
          <Link to={"/"} className="underline">
            Venues
          </Link>
          <Link to={"/profile"} className="underline">
            Profile
          </Link>
        </div>

        <div className="flex flex-col gap-2.5 max-[595px]:w-[221px]">
          <span className="font-semibold">Support</span>
          <p>holidaze@holidaze.com</p>
          <p>About</p>
        </div>

        <p className="max-w-[155px] w-full">
          © 2026 Holidaze — Student Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;
