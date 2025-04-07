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
import ErrorPage from "./routes/Errorpage/ErrorPage";
import Account from "./routes/Account/Account";
import PricePlans from "./routes/PricePlans/PricePlans";
import { ErrorResponse } from "./routes/Errorpage/ErrorPage";
import ProtectedRoute from "./component/Protectedroute";
import ResponsiveLayout from "./component/ResponsiveLayout";
import WorkSpace from "./routes/WorkSpace/WorkSpace";
import { UserProvider } from "./context/UserContext";
import MyProjects from "./component/MyProjects";
import Dashboard from "./component/Dashboard";
import ProjectFormWrapper from "./component/ProjectFormWrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
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
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/workspace"
              element={
                <ProtectedRoute>
                  <ResponsiveLayout>
                    <WorkSpace />
                  </ResponsiveLayout>
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<MyProjects />} />
              <Route path="create-project" element={<ProjectFormWrapper />} />
            </Route>
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
              path="/account"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Account />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscriptions"
              element={
                <Layout>
                  <PricePlans />
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
            <Route
              path="/error"
              element={
                <Layout>
                  <ErrorResponse />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <ErrorPage />
                </Layout>
              }
            />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
