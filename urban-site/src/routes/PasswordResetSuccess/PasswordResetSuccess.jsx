import React from "react";

function PasswordResetSuccess() {
  return (
    <div>
      <h1>Password Reset Successful</h1>
      <p>
        Your password has been reset successfully. You can now log in with your
        new password.
      </p>
      <a href="/login">Log in</a>
    </div>
  );
}

export default PasswordResetSuccess;
