import "./index.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./routes/Homepage/Home";
import Logout from "./component/Logout";
import Navigation from "./component/Navigation";
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
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}

export default App;
