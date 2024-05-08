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
      <div className="text-xl">
        Please check your email for a password reset link.
      </div>
    );
  }

  return (
    <div>
      <fieldset>
        <form
          className="text-center justify-center grid grid-flow-col grid-rows-3"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl">Forgot Password</h1>
          <label className="border-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <input className="mt-2" type="submit" value="Submit" />
        </form>
      </fieldset>
    </div>
  );
}

export default ForgotPassword;
