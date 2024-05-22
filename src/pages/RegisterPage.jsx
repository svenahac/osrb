import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSignup } from "../api/auth";
import { useUserStore } from "../stores/user";

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  const handle_input_change = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const user = useUserStore((state) => state.user);
  console.log(user);

  return (
    <div
      id="RegisterPage"
      className="m-0 flex flex-col min-h-screen justify-center items-center bg-bg bg-cover bg-center"
    >
      <div className="mb-10 text-7xl text-gray-900 flex justify-center align-middle items-center">
        OSRBrewery
      </div>
      <div className="rounded-xl p-4 w-80 h-170 bg-white flex flex-col justify-center items-center ">
        <div className="relative z-0 mb-6 w-72">
          <input
            type="text"
            name="username"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
            placeholder=" "
            required
            onChange={handle_input_change}
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 mb-6 w-72">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
            placeholder=" "
            required
            onChange={handle_input_change}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        <div className="relative z-0 mb-6 w-72">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
            placeholder=" "
            required
            onChange={handle_input_change}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <div className="w-36 h-10 mb-2 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              handleSignup(
                registerData.email,
                registerData.password,
                registerData.username
              );
              navigate("/home");
            }}
            className="text-white bg-gray-900 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2"
          >
            Register
          </button>
        </div>
        <div className="flex flex-col items-center ">
          <p className="text-gray-900 text-sm">Already have an account?</p>
          <button
            className="text-gray-900 hover:text-cyan-600 font-bold"
            onClick={navigateToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
