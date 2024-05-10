import React from "react";
import { Link } from "react-router-dom";

function PasswordResetSuccess() {
  return (
    <div className="flex flex-col items-center min-h-screen p-20 bg-[#1E73BE]">
      <div className="p-8 bg-white rounded-xl shadow-md w-1/2">
        <h1 className="text-2xl font-bold mb-4">Password Reset Successful</h1>
        <p className="mb-4">
          Your password has been reset successfully. You can now log in with
          your new password.
        </p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default PasswordResetSuccess;
