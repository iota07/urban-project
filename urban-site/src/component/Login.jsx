import axios from "axios";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import updateAuthStatus from "../Interceptors/axios";
import { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { BACKEND_URL } from "../utils/config";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showTooltip, setShowTooltip] = useState(false);

  const validationMessages = {
    email: "Email cannot contain spaces, '<', or '>'",
  };

  return (
    <>
      <div>
        <div className="group relative">
          {validationMessages[props.name] && (
            <div className="absolute left-0 top-0 transform -translate-x-full translate-y-1/2 cursor-pointer">
              <FiInfo
                className="text-white"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute left-80 -top-14 text-sm transform -translate-x-full w-64 p-2 bg-white border rounded-xl shadow-md z-50">
                  {validationMessages[props.name]}
                </div>
              )}
            </div>
          )}
          <input
            {...field}
            {...props}
            id={props.name}
            required
            className="peer m-0 p-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
          />
          <label
            htmlFor={props.name}
            className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
          >
            {label}
          </label>
        </div>
        {meta.touched && meta.error ? (
          <p className="max-w-sm text-red-500 pb-2">{meta.error}</p>
        ) : null}
      </div>
    </>
  );
};

const MyPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const validationMessages = {
    password: "Password cannot contain spaces, '<', or '>'",
  };

  return (
    <>
      <div>
        <div className="group relative">
          {validationMessages[props.name] && (
            <div className="absolute left-0 top-0 transform -translate-x-full translate-y-1/2 cursor-pointer">
              <FiInfo
                className="text-white"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute left-80 -top-14 text-sm transform -translate-x-full w-64 p-2 bg-white border rounded-xl shadow-md z-50">
                  {validationMessages[props.name]}
                </div>
              )}
            </div>
          )}
          <input
            {...field}
            {...props}
            id={props.name}
            required
            type={showPassword ? "text" : "password"}
            className="peer m-0 p-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
          />
          <label
            htmlFor={props.name}
            className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
          >
            {label}
          </label>
          <span
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        {meta.touched && meta.error ? (
          <p className="max-w-sm text-red-500 pb-2">{meta.error}</p>
        ) : null}
      </div>
    </>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[^\s<>]*$/, "Email cannot contain spaces, '<', or '>'")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .matches(/^[^\s<>]*$/, "Password cannot contain spaces, '<', or '>'")
    .required("Required"),
});

const Login = () => {
  let navigate = useNavigate();

  const submit = async (values, { setFieldError }) => {
    const user = {
      email: values.email,
      password: values.password,
    };

    try {
      const { data } = await axios.post(`${BACKEND_URL}/token/login/`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
      updateAuthStatus(); // Trigger event to update authentication status
      navigate("/home");
    } catch (error) {
      console.error("Error while logging in:", error);
      if (error.response) {
        if (error.response.status === 400) {
          // The request was a validation error
          console.log("Validation errors:", error.response.data);
          let errorData = error.response.data;
          if (errorData.email) {
            setFieldError("email", errorData.email[0]);
          }
          if (errorData.password) {
            setFieldError("password", errorData.password[0]);
          }
          // Add this block to handle non-validation 400 errors
          if (errorData.non_field_errors) {
            // Assuming the server returns a non_field_errors array for non-validation errors
            alert(errorData.non_field_errors[0]);
          }
        } else if (error.response.status === 401) {
          // The request was unauthorized
          setFieldError("password", error.response.data.detail);
        }
      }
      throw new Error(error.message);
    }
  };

  return (
    <>
      <section className="min-h-screen flex justify-center items-start">
        <div className="w-[400px] xl:w-[500px] rounded-3xl bg-secondary flex justify-center items-start">
          <div className="flex h-auto w-full flex-col pb-16 mt-12 sm:mt-12 lg:mt-24 rounded-3xl bg-white bg-opacity-20">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={submit}
            >
              {({ errors, touched }) => (
                <Form className="mt-10 space-y-8 px-10 py-10 text-center">
                  <MyTextInput name="email" type="text" label="Email" />
                  <MyPasswordInput name="password" label="Password" />
                  <button
                    type="submit"
                    className="h-12 w-full rounded-3xl bg-primary text-white transition-all duration-300 hover:bg-tertiary"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>

            <Link
              to="/forgot-password"
              className="inline-flex !w-auto justify-center font-medium text-white m-4"
            >
              Forgot password?
            </Link>
            <p className="gap-2 text-center text-white">
              Don't have an account?
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-tertiary pl-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
