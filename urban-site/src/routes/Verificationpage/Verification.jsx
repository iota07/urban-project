import React from "react";

const Verification = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen pt-12">
      <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
      <p className="text-lg text-center">
        A verification email has been sent to your email address. Please check
        your inbox and follow the instructions to verify your account.
      </p>
    </div>
  );
};

export default Verification;
