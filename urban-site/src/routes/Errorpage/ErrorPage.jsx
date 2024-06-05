import React from "react";
import { useNavigate } from "react-router-dom";
import TitleH2 from "../../component/TitleH2";

function ErrorPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <section className="flex flex-col justify-center items-center">
      <TitleH2 title="Error!" />

      <p>Sorry, the page you are looking for does not exist.</p>
      <button
        type="button"
        className="mt-14 w-11/12 sm:w-[400px] text-lg bg-primary text-white py-2 rounded-lg hover:bg-tertiary"
        onClick={handleButtonClick}
      >
        Home
      </button>
    </section>
  );
}

function ErrorResponse() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <section className="flex flex-col justify-center items-center">
      <TitleH2 title="Error!" />

      <p>Oops, something went wrong.</p>
      <button
        type="button"
        className="mt-14 w-11/12 sm:w-[400px] text-lg bg-primary text-white py-2 rounded-lg hover:bg-tertiary"
        onClick={handleButtonClick}
      >
        Home
      </button>
    </section>
  );
}

export default ErrorPage;
export { ErrorResponse };
