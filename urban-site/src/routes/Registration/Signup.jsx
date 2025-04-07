import axios from "axios";
import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { BACKEND_URL } from "../../utils/config";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showTooltip, setShowTooltip] = useState(false);

  const validationMessages = {
    username:
      "Username can only contain alphanumeric characters, hyphens, underscores, '@', and '.'",
    email: "Email cannot contain spaces, '<', or '>'",
    name: "Name can only contain alphanumeric characters and hyphens",
    surname:
      "Surname can only contain alphanumeric characters, spaces, and hyphens",
  };

  return (
    <>
      <div>
        <div className="group relative">
          {validationMessages[props.name] && (
            <div className="absolute left-0 top-0 transform -translate-x-full translate-y-1/2 cursor-pointer z-50">
              <FiInfo
                className="text-white"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute left-80 -top-14 text-sm transform -translate-x-full w-64 p-2 bg-white border rounded-xl shadow-md">
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
            className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white z-10"
          >
            {label}
          </label>
        </div>
        {meta.touched && meta.error ? (
          <p className="max-w-sm text-danger pb-2">{meta.error}</p>
        ) : null}
      </div>
    </>
  );
};

const MyOptionalTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showTooltip, setShowTooltip] = useState(false);

  const validationMessages = {
    organisation: "Organisation cannot contain '<' or '>'",
  };

  return (
    <>
      <div>
        <div className="group relative">
          {validationMessages[props.name] && (
            <div className="absolute left-0 top-0 transform -translate-x-full translate-y-1/2 cursor-pointer z-50">
              <FiInfo
                className="text-white"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute left-80 -top-14 text-sm transform -translate-x-full w-64 p-2 bg-white border rounded-xl shadow-md">
                  {validationMessages[props.name]}
                </div>
              )}
            </div>
          )}
          <input
            {...field}
            {...props}
            id={props.name}
            className={`peer m-0 p-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none ${
              field.value ? "optional-text" : ""
            }`}
          />
          <label
            htmlFor={props.name}
            className={`absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 ${
              field.value
                ? "-top-7 h-1/2 pl-0 text-base text-white"
                : "peer-focus:-top-7 peer-focus:h-1/2 peer-focus:pl-0 peer-focus:text-base peer-focus:text-white z-10"
            }`}
          >
            {label}
          </label>
        </div>
        {meta.error && (
          <div className="max-w-sm text-danger pb-2">{meta.error}</div>
        )}
      </div>
    </>
  );
};

const MyPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const validationMessages = {
    password1: "Password cannot contain spaces, '<', or '>'",
    password2: "Password confirmation cannot contain spaces, '<', or '>'",
  };

  return (
    <>
      <div>
        <div className="group relative">
          {validationMessages[props.name] && (
            <div className="absolute left-0 top-0 transform -translate-x-full translate-y-1/2 cursor-pointer z-50">
              <FiInfo
                className="text-white"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute left-80 -top-14 text-sm transform -translate-x-full w-64 p-2 bg-white border rounded-xl shadow-md ">
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
            className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white z-10"
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
          <p className="max-w-sm text-danger pb-2">{meta.error}</p>
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
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9@._-]*$/,
      "Username can only contain alphanumeric characters, hyphens, underscores, '@', and '.'"
    )
    .matches(/^[^\s<>]*$/, "Username cannot contain spaces, '<', or '>'")
    .required("Required"),
  password1: Yup.string()
    .min(8, "Must be at least 8 characters")
    .matches(/^[^\s<>]*$/, "Password cannot contain spaces, '<', or '>'")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .matches(
      /^[^\s<>]*$/,
      "Password confirmation cannot contain spaces, '<', or '>'"
    )
    .required("Required"),
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9-]*$/,
      "Name can only contain alphanumeric characters and hyphens"
    )
    .matches(/^[^\s<>]*$/, "Name cannot contain spaces, '<', or '>'")
    .required("Required"),
  surname: Yup.string()
    .matches(
      /^[a-zA-Z0-9- ]*$/,
      "Surname can only contain alphanumeric characters, spaces, and hyphens"
    )
    .matches(/^[^<>]*$/, "Surname cannot contain '<' or '>'")
    .required("Required"),
  organisation: Yup.string()
    .matches(/^[^<>]*$/, "Organisation cannot contain '<' or '>'")
    .notRequired(),
});

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (values, { setFieldError }) => {
    const user = {
      email: values.email,
      username: values.username,
      password1: values.password1,
      password2: values.password2,
      name: values.name,
      surname: values.surname,
      organisation: values.organisation,
    };

    try {
      await axios
        .post(`${BACKEND_URL}/dj-rest-auth/registration/`, user, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status !== 201) {
            throw new Error("Validation error");
          }
          window.location.href = "/verification";
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // The request was a validation error

        let errorData = error.response.data;
        if (errorData.username) {
          setFieldError("username", errorData.username[0]);
        }
        if (errorData.email) {
          setFieldError("email", errorData.email[0]);
        }
        if (errorData.password1) {
          setFieldError("password1", errorData.password1[0]);
        }
        if (errorData.password2) {
          setFieldError("password2", errorData.password2[0]);
        }
        if (errorData.non_field_errors) {
          setErrorMessage(errorData.non_field_errors[0]);
        }
      }
    }
  };

  return (
    <>
      <section className="min-h-screen flex justify-center items-start">
        <div className="w-[400px] xl:w-[500px] rounded-3xl bg-secondary flex justify-center items-start">
          <div className="flex h-auto w-full flex-col pb-16 mb-2 mt-4 sm:mt-8 lg:mt-12 rounded-3xl bg-white bg-opacity-20">
            <Formik
              initialValues={{
                email: "",
                username: "",
                password1: "",
                password2: "",
                name: "",
                surname: "",
                organisation: "",
              }}
              validationSchema={validationSchema}
              onSubmit={submit}
            >
              {({ errors, touched, handleChange }) => {
                const handleChangeAndClearError = (event) => {
                  setErrorMessage("");
                  handleChange(event);
                };

                return (
                  <Form>
                    <fieldset className="flex flex-col gap-6 mt-10 px-10 py-10 text-center">
                      <MyTextInput
                        name="email"
                        type="text"
                        label="Email"
                        onChange={handleChangeAndClearError}
                      />
                      <MyTextInput
                        name="username"
                        type="text"
                        label="Username"
                        onChange={handleChangeAndClearError}
                      />
                      <MyTextInput
                        name="name"
                        type="text"
                        label="Name"
                        onChange={handleChangeAndClearError}
                      />
                      <MyTextInput
                        name="surname"
                        type="text"
                        label="Surname"
                        onChange={handleChangeAndClearError}
                      />
                      <MyOptionalTextInput
                        name="organisation"
                        type="text"
                        label={
                          <>
                            <span>Organisation</span>{" "}
                            <span className="pl-2 text-gray-400">
                              (optional)
                            </span>
                          </>
                        }
                        onChange={handleChangeAndClearError}
                      />
                      <MyPasswordInput
                        name="password1"
                        label="Password"
                        onChange={handleChangeAndClearError}
                      />
                      <MyPasswordInput
                        name="password2"
                        label="Password confirmation"
                        onChange={handleChangeAndClearError}
                      />

                      <button
                        type="submit"
                        className="mt-4 h-12 w-full rounded-3xl bg-primary text-white transition-all duration-300 hover:bg-tertiary"
                      >
                        Sign up
                      </button>
                      {errorMessage && (
                        <p className="text-danger mt-2">{errorMessage}</p>
                      )}
                    </fieldset>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
