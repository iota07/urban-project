import axios from "axios";
import { useState } from "react";
import React from "react";

// Define the Login function.
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    // Create the POST request
    try {
      const { data } = await axios.post(
        "http://localhost:8000/token/login/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Set to true to include credentials
        }
      );

      // Initialize the access & refresh token in local storage.
      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      window.location.href = "/";
    } catch (error) {
      console.error("Error while logging in:", error);
      // Handle error
    }
  };

  return (
    <>
      <section className="flex min-h-screen items-center justify-center">
        <div className="relative h-[800px] w-[400px] overflow-hidden rounded-3xl">
          <div
            className="h-full w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://usercontent.one/wp/www.buildwind.net/wp-content/uploads/2021/09/IFF_Guangzhou_Sim_streamlines_global_06_169-768x432.jpg')",
            }}
          ></div>
          <div className="absolute bottom-0 flex h-3/4 w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
            <form
              className="mt-10 space-y-8 px-10 py-10 text-center"
              onSubmit={submit}
            >
              <div className="group relative">
                <input
                  type="text"
                  id="email"
                  className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  Email
                </label>
              </div>

              <div className="group relative">
                <input
                  type="password"
                  id="password"
                  className="peer h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-[#1E73BE]"
              >
                Login
              </button>
            </form>

            <a
              href="#"
              className="inline-flex !w-auto justify-center font-medium text-white"
            >
              Forgot password?
            </a>

            <p className="gap-2 text-center text-white">
              Don't have an account?
              <a
                href="#"
                className="font-semibold text-blue-900 hover:text-blue-800 pl-1"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
