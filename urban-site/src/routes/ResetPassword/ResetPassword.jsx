import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";

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
      <div className="group relative">
        {validationMessages[props.name] && (
          <div className="absolute left-0 top-0 transform -translate-x-full translate-y-1/2 cursor-pointer">
            <FiInfo
              className="text-[#1E73BE]"
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
          className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-[#1E73BE] peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-[#1E73BE]"
        >
          {label}
        </label>
        <span
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
      {meta.touched && meta.error ? (
        <p className="max-w-sm text-red-500 pb-2">{meta.error}</p>
      ) : null}
    </>
  );
};

const passwordSchema = Yup.object().shape({
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
});

function ResetPassword() {
  const { uid, token } = useParams();

  const submit = async (values, { setFieldError }) => {
    const user = {
      uid: uid,
      token: token,
      new_password1: values.password1,
      new_password2: values.password2,
    };

    try {
      await axios
        .post(
          "http://localhost:8000/dj-rest-auth/password/reset/confirm/",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Validation error");
          }
          window.location.href = "/password-reset-success";
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
      <section className="flex min-h-screen items-center justify-center">
        <div className="relative h-[900px] w-[400px] overflow-hidden rounded-3xl">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://usercontent.one/wp/www.buildwind.net/wp-content/uploads/2022/11/Brussels_240N_Streamlines_Windrose-768x533.jpg')",
            }}
          ></div>
          <div className="absolute bottom-48 flex h-5/6 w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow backdrop-blur-sm">
            <Formik
              initialValues={{
                password1: "",
                password2: "",
              }}
              validationSchema={passwordSchema}
              onSubmit={submit}
            >
              {({ errors, touched }) => (
                <Form>
                  <fieldset className="flex flex-col gap-6 mt-10 px-10 py-10 text-center">
                    <MyPasswordInput
                      name="password1"
                      type="password"
                      label="Password"
                    />
                    <MyPasswordInput
                      name="password2"
                      type="password"
                      label="Password confirmation"
                    />

                    <button
                      type="submit"
                      className="mt-4 h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-[#1E73BE]"
                    >
                      Set new password
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
}

export default ResetPassword;