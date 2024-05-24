import "./index.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./routes/Homepage/Home";
import Logout from "./component/Logout";
import Signup from "./routes/Registration/Signup";
import Verification from "./routes/Verificationpage/Verification";
import LandingPage from "./routes/Landingpage/Landingpage";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";
import ResetPassword from "./routes/ResetPassword/ResetPassword";
import PasswordResetSuccess from "./routes/PasswordResetSuccess/PasswordResetSuccess";
import "./Interceptors/axios";
import Layout from "./component/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <LandingPage />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/logout"
            element={
              <Layout>
                <Logout />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
          <Route
            path="/verification"
            element={
              <Layout>
                <Verification />
              </Layout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />
          <Route
            path="/reset-password/:uid/:token"
            element={
              <Layout>
                <ResetPassword />
              </Layout>
            }
          />
          <Route
            path="/password-reset-success"
            element={
              <Layout>
                <PasswordResetSuccess />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
