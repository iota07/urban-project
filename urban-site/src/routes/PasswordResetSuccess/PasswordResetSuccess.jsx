import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsShieldCheck } from "react-icons/bs";
import TitleH2 from "../../component/TitleH2";

function PasswordResetSuccess() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };
  return (
    <section className="flex flex-col justify-center items-center">
      <section className="min-h-screen w-11/12 sm:w-10/12 md:w-6/12 lg:w-[400px] xl:w-[500px] bg-backg flex flex-col pt-12">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-secondary p-7 rounded-full ">
            <BsShieldCheck className="bg-success text-white text-5xl rounded-md p-2" />
          </div>
          <TitleH2 title="Password reset" />
          <p className="mt-4">Your password has been successfully reset.</p>
          <p>Click below to log in.</p>
          <button
            type="button"
            className="mt-14 w-11/12 text-lg bg-primary text-white py-2 rounded-lg hover:bg-tertiary"
            onClick={handleButtonClick}
          >
            Sign in
          </button>
        </div>
        <div className="flex h-5/6 w-full flex-col justify-center">
          <p className="text-center text-scondary sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-48">
            Back to
            <Link
              to="/Login"
              className="font-semibold text-primary hover:text-tertiary pl-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </section>
  );
}

export default PasswordResetSuccess;
