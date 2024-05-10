import React, { useState } from "react";

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
        // Handle the response
        console.log(data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (submitted) {
    return (
      <div className="mt-4 text-xl text-center justify-center">
        Please check your email for a password reset link.
      </div>
    );
  }

  return (
    <section>
      <fieldset>
        <form
          className="text-center justify-center flex flex-col"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl">Forgot Password</h1>
          <label className="w-full">
            Email:
            <input
              className="mt-4 ml-2 pt-4 border-4 w-96"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <input className="mt-2" type="submit" value="Submit" />
        </form>
      </fieldset>
    </section>
  );
}

export default ForgotPassword;
