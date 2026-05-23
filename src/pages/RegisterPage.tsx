import { useState } from "react";
import { register, login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import SEO from "../components/SEO";

function RegisterPage() {
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const [accountType, setAccountType] = useState<"traveller" | "manager">(
    "traveller"
  );

  // Store form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // field errors
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // API + loading
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

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

  // validate fields
  function validate() {
    const errors = {
      name: "",
      email: "",
      password: "",
    };

    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!formData.email.endsWith("@stud.noroff.no")) {
      errors.email = "Email must end with @stud.noroff.no";
    }

    if (!formData.password) errors.password = "Password is required";

    setFieldErrors(errors);

    // return true if valid
    return !errors.name && !errors.email && !errors.password;
  }

  // submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setApiError("");

    // run validation first
    const isValid = validate();
    if (!isValid) return;

    setLoading(true);

    try {
      const isManager = accountType === "manager";

      // Register
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        venueManager: isManager,
      });

      // Login immediately after
      const userData = await login(formData.email, formData.password);

      loginUser(userData);

      // Redirect to profile
      navigate("/profile");
    } catch (err: any) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title="Register | Holidaze"
        description="Create your account to start booking venues."
      />

      <div className="px-5">
        <div className="bg-white max-w-[554px] w-full text-secondary sm:px-[30px] sm:py-[40px] px-[20px] py-[30px] md:my-20 my-10 rounded-3xl shadow-lg">
          <h1 className="text-2xl flex justify-center mb-6">
            Register an account
          </h1>

          {/* ACCOUNT TYPE TOGGLE */}
          <div>
            <p className="text-sm mb-1">Select account type:</p>

            <div className="relative w-full h-[44px] shadow-lg rounded-full flex">
              {/* Sliding background */}
              <div
                className={`absolute top-0 left-0 h-full w-1/2 rounded-full bg-accent/50 border border-secondary transition-transform duration-300 ${
                  accountType === "manager"
                    ? "translate-x-full"
                    : "translate-x-0"
                }`}
              />

              {/* Buttons */}
              <button
                type="button"
                onClick={() => setAccountType("traveller")}
                className="flex-1 z-10 relative h-full rounded-full text-secondary"
              >
                Traveller
              </button>

              <button
                type="button"
                onClick={() => setAccountType("manager")}
                className="flex-1 z-10 relative h-full rounded-full text-secondary"
              >
                Manager
              </button>
            </div>
          </div>

          {/* ACCOUNT DESCRIPTION */}
          <div className="py-6">
            <span className="font-semibold">
              {accountType === "traveller"
                ? "Traveller Account"
                : "Manager Account"}
            </span>

            <p className="text-sm mt-1">
              {accountType === "traveller"
                ? "Browse venues and book stays. Manage your upcoming bookings and update your profile."
                : "List and manage your venues. Create, edit, and track bookings for your properties."}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* NAME */}
            <div>
              <label htmlFor="name" className="text-sm">
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="exampleuser123"
                className={`text-sm w-full border px-5 py-3 rounded-full placeholder-brownLight mt-1 ${
                  fieldErrors.name
                    ? "border-error text-error"
                    : "border-secondary text-secondary"
                }`}
              />

              <p className="text-error text-xs h-5 text-right">
                {fieldErrors.name}
              </p>
            </div>

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

              <p className="text-error text-xs h-5 text-right">
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

              <p className="text-error text-xs h-5 text-right">
                {fieldErrors.password}
              </p>
            </div>

            {/* API ERROR BOX */}
            {apiError && (
              <div className="bg-error/20 text-error text-sm py-3 px-4 px rounded-full mt-1">
                <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
                {apiError}
              </div>
            )}

            {/* SUBMIT */}
            <Button
              variant="secondary"
              type="submit"
              className="mt-4"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
