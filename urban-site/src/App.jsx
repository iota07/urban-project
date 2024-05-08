import "./index.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./routes/Homepage/Home";
import Logout from "./component/Logout";
import Navigation from "./component/Navigation";
import Signup from "./routes/Registration/Signup";
import Verification from "./routes/Verificationpage/Verification";
import LandingPage from "./routes/Landingpage/Landingpage";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";
import ResetPassword from "./routes/ResetPassword/ResetPassword";
import "./Interceptors/axios";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
