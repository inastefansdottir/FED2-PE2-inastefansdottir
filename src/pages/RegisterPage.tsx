import { Button } from "../components/Button";

function RegisterPage() {
  return (
    <div className="bg-white max-w-[554px] w-full text-secondary px-[30px] py-[40px] my-20 rounded-3xl shadow-xl">
      <h1 className="text-2xl flex justify-center mb-6">Register an account</h1>

      <div>
        <p className="text-sm mb-1">Select account type:</p>
        <div className="w-full h-[44px] shadow-xl rounded-full">
          <button className="w-[247px] h-full rounded-full border border-primary text-primary bg-accent/50">
            Customer
          </button>
          <button className="w-[247px] h-full rounded-full text-primary">
            Manager
          </button>
        </div>
      </div>

      <div className="py-6">
        <span className="font-semibold">Customer Account</span>
        <p className="text-sm mt-1">
          Browse venues and book stays. Manage your upcoming bookings and update
          your profile.
        </p>
      </div>

      <form className="flex flex-col">
        <div>
          <label htmlFor="name" className="text-sm">
            Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="exampleuser123"
            className="placeholder-brownLight text-sm w-full border border-secondary px-5 py-3 rounded-full mt-1"
          />

          <p className="h-5 text-error text-xs mt-1 flex justify-end ">
            Name is required
          </p>
        </div>

        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@stud.noroff.no"
            className="placeholder-brownLight text-sm w-full border border-secondary px-5 py-3 rounded-full mt-1"
          />

          <p className="h-5 text-error text-xs flex mt-1 justify-end ">
            Email is required
          </p>
        </div>

        <div>
          <label htmlFor="password" className="text-sm">
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="placeholder-brownLight text-sm w-full border border-secondary px-5 py-3 rounded-full mt-1"
          />

          <p className="h-5 text-error text-xs my-1 flex justify-end ">
            Password is required
          </p>
        </div>

        <Button type="submit">Create Account</Button>
      </form>
    </div>
  );
}

export default RegisterPage;
