import { Link } from "react-router-dom";
import logoGreen from "../assets/logo-green.svg";

function Footer() {
  return (
    <footer className="flex justify-center bg-brownLight text-secondary px-10">
      <div className="flex justify-between max-w-[1300px] w-full pt-9 pb-16">
        <div>
          <img src={logoGreen} />
          <p className="font-light">Find your next stay anywhere</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="font-semibold">Navigation</span>
          <Link to={"/"}>Venues</Link>
          <Link to={"/profile"}>Profile</Link>
        </div>

        <div className="flex flex-col gap-2.5">
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
