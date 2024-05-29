import axios from "axios";
import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showTooltip, setShowTooltip] = useState(false);

  const validationMessages = {
    username:
      "Username can include: A-Z, a-z, 0-9, hyphen (-), and underscore (_). Spaces, '<', and '>' are not allowed",
    email: "Email cannot contain spaces, '<', or '>'",
    name: "Name can only contain alphanumeric characters. Spaces, '<', and '>' are not allowed",
    surname:
      "Surname can only contain alphanumeric characters. Spaces, '<', and '>' are not allowed",
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
            className="peer m-0 p-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
          />
          <label
            htmlFor={props.name}
            className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white"
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
    password1: "Password cannot contain spaces, '<', or '>'",
    password2: "Password confirmation cannot contain spaces, '<', or '>'",
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
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9_-]*$/,
      "Username can only contain alphanumeric characters, hyphens, and underscores"
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
    .matches(/^[a-zA-Z0-9]*$/, "Name can only contain alphanumeric characters")
    .matches(/^[^\s<>]*$/, "Name cannot contain spaces, '<', or '>'")
    .required("Required"),
  surname: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Surname can only contain alphanumeric characters"
    )
    .matches(/^[^\s<>]*$/, "Surname cannot contain spaces, '<', or '>'")
    .required("Required"),
  organisation: Yup.string()
    .matches(/^[^\s<>]*$/, "Organisation cannot contain spaces, '<', or '>'")
    .notRequired(),
});

const Registration = () => {
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
        .post("http://localhost:8000/dj-rest-auth/registration/", user, {
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
      console.error("Error while registering:", error);
      if (error.response && error.response.status === 400) {
        // The request was a validation error
        console.log("Validation errors:", error.response.data);
        let errorData = error.response.data;
        if (errorData.username) {
          setFieldError("username", errorData.username[0]);
        }
        if (errorData.email) {
          setFieldError("email", errorData.email[0]);
        }
      }
    }
  };

  return (
    <>
      <section className="min-h-screen bg-danger flex justify-center items-start">
        <div className="w-11/12 sm:w-10/12 md:w-6/12 lg:w-[400px] xl:w-[500px]">
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
              {({ errors, touched }) => (
                <Form>
                  <fieldset className="flex flex-col gap-6 mt-10 px-10 py-10 text-center">
                    <MyTextInput name="email" type="text" label="Email" />
                    <MyTextInput name="username" type="text" label="Username" />
                    <MyTextInput name="name" type="text" label="Name" />
                    <MyTextInput name="surname" type="text" label="Surname" />
                    <MyOptionalTextInput
                      name="organisation"
                      type="text"
                      label={
                        <>
                          <span>Organisation</span>{" "}
                          <span className="pl-2 text-gray-300">(optional)</span>
                        </>
                      }
                    />
                    <MyPasswordInput name="password1" label="Password" />
                    <MyPasswordInput
                      name="password2"
                      label="Password confirmation"
                    />

                    <button
                      type="submit"
                      className="mt-4 h-12 w-full rounded-3xl bg-primary text-white transition-all duration-300 hover:bg-success"
                    >
                      Sign up
                    </button>
                  </fieldset>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
