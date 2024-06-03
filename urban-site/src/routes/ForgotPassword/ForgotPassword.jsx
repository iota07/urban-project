import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import TitleH2 from "../../component/TitleH2";
import { IoMailOutline } from "react-icons/io5";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/dj-rest-auth/password/reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (submitted) {
    return (
      <section className="flex flex-col justify-center items-center">
        <section className="min-h-screen w-11/12 sm:w-10/12 md:w-6/12 lg:w-[400px] xl:w-[500px] bg-backg flex flex-col pt-12">
          <div className="flex">
            <div className="bg-secondary p-7 rounded-full ">
              <IoMailOutline className="bg-primary text-white text-5xl rounded-md p-2" />
            </div>
          </div>
          <fieldset className="flex flex-col mt-8">
            <TitleH2 title="Check you email" />
            <p className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
              We sent a password reset link to{" "}
              <a href={`mailto:${email}`} className="text-success">
                {email}
              </a>
            </p>
            <button
              type="button"
              className="mt-14 text-lg bg-primary text-white py-2 rounded-lg hover:bg-success"
              onClick={() => (window.location.href = `mailto:${email}`)}
            >
              Open email
            </button>
            <p className="text-center text-scondary sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-48 xl:mr-28">
              Back to
              <Link
                to="/Login"
                className="font-semibold text-primary hover:text-success pl-1"
              >
                Sign in
              </Link>
            </p>
          </fieldset>
        </section>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <section className="min-h-screen w-11/12 sm:w-10/12 md:w-6/12 lg:w-[400px] xl:w-[500px] bg-backg flex flex-col pt-12">
        <div className="flex">
          <div className="bg-secondary p-7 rounded-full ">
            <RiLockPasswordLine className="bg-primary text-white text-5xl rounded-md p-2" />
          </div>
        </div>
        <fieldset>
          <form
            className="flex flex-col mt-8"
            onSubmit={handleSubmit}
            id="forgotpasswordform"
          >
            <TitleH2 title="Forgot Password?" />
            <label className="w-full mt-12 font-bold text-primary flex flex-col">
              Email
              <input
                className="pt-4 mt-2 pl-2 pb-3 border border-secondary rounded-lg placeholder:text-gray-300 outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>
            <button
              type="submit"
              className="mt-14 text-lg bg-primary text-white py-2 rounded-lg hover:bg-success"
            >
              Reset Password
            </button>
          </form>
          <p className="text-center text-primary sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-48 mb-2 xl:mr-28">
            Back to
            <Link
              to="/Login"
              className="font-semibold text-primary hover:text-success pl-1"
            >
              Sign in
            </Link>
          </p>
        </fieldset>
      </section>
    </section>
  );
}

export default ForgotPassword;
