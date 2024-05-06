import "./index.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./routes/Homepage/Home";
import Logout from "./component/Logout";
import Navigation from "./component/Navigation";
import Signup from "./routes/Registration/Signup";
import VerificationPage from "./routes/Verificationpage/Verification";
import "./Interceptors/axios";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verification" element={<VerificationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
