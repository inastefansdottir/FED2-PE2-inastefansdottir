import { login } from "../api/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: Props) {
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error when typing
    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setApiError("");
  }

  function validate() {
    const errors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!formData.email.endsWith("@stud.noroff.no")) {
      errors.email = "Email must end with @stud.noroff.no";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);

    return !errors.email && !errors.password;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setApiError("");

    if (!validate()) return;

    try {
      setLoading(true);
      const userData = await login(formData.email, formData.password);
      loginUser(userData);
      onClose();
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="relative bg-white max-w-[400px] w-full text-secondary px-[30px] py-[40px] rounded-3xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl flex justify-center mb-4">Login</h1>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-[40px] right-[30px] text-lg"
        >
          ✕
        </button>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@stud.noroff.no"
              className={`text-sm w-full border px-5 py-3 rounded-full placeholder-brownLight mt-1 ${
                fieldErrors.email
                  ? "border-error text-error"
                  : "border-secondary text-secondary"
              }`}
            />

            <p className="text-error text-xs h-5 mt-1 text-right">
              {fieldErrors.email}
            </p>
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className={`text-sm w-full border px-5 py-3 rounded-full placeholder-brownLight mt-1 ${
                fieldErrors.password
                  ? "border-error text-error"
                  : "border-secondary text-secondary"
              }`}
            />

            <p className="text-error text-xs h-5 mt-1 text-right">
              {fieldErrors.password}
            </p>
          </div>

          {/* API ERROR BOX */}
          {apiError && (
            <div className="bg-error/20 text-error text-sm py-3 px-4 px rounded-full">
              <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
              {apiError}
            </div>
          )}

          {/* SUBMIT */}
          <Button type="submit" className="mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-primary text-sm mt-5">
            Don't have an account yet?
          </p>
          <Link
            to={"/register"}
            onClick={onClose}
            className="text-center text-sm font-semibold mt-1 underline"
          >
            Register here
          </Link>
        </form>
      </div>
    </div>
  );
}
