import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="first name"
          className="border p-2 rounded-lg"
          id="firstname"
        />
        <input
          type="text"
          placeholder="last name"
          className="border p-2 rounded-lg"
          id="lastname"
        />
        <select placeholder="role" className="border p-2 rounded-lg" id="role">
          <option>select role</option>
          <option value="doctor">Doctor</option>
          <option value="student">Student</option>
        </select>
        <input
          type="email"
          placeholder="email"
          className="border p-2 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-2 rounded-lg"
          id="password"
        />
        <input
          type="password"
          placeholder="confirm password"
          className="border p-2 rounded-lg"
          id="confirm-password"
        />
        <button className="bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
