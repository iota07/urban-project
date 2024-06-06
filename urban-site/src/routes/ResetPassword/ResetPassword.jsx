import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import TitleH2 from "../../component/TitleH2";

const MyPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const validationMessages = {
    password1: "New Password cannot contain spaces, '<', or '>'",
    password2: "New Password cannot contain spaces, '<', or '>'",
  };

  return (
    <>
      <div>
        <div className="group relative">
          {validationMessages[props.name] && (
            <div className="absolute left-0 top-0 transform -translate-x-full translate-y-1/2 cursor-pointer">
              <FiInfo
                className="text-primary"
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
            className="peer m-0 p-0 h-14 w-full rounded-xl bg-gray-100 px-4 text-sm outline-none"
          />
          <label
            htmlFor={props.name}
            className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-primary peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
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

const passwordSchema = Yup.object().shape({
  password1: Yup.string()
    .min(8, "Must be at least 8 characters")
    .matches(/^[^\s<>]*$/, "New Password cannot contain spaces, '<', or '>'")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .matches(/^[^\s<>]*$/, "New Password cannot contain spaces, '<', or '>'")
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
      console.error("Error while resetting password:", error);
      if (error.response && error.response.status === 400) {
        // The request was a validation error
        console.log("Validation errors:", error.response.data);
        let errorData = error.response.data;
        if (errorData.uid) {
          setFieldError("uid", errorData.uid[0]);
        }
        if (errorData.token) {
          setFieldError("token", errorData.token[0]);
        }
        if (errorData.new_password1) {
          setFieldError("password1", errorData.new_password1[0]);
        }
        if (errorData.new_password2) {
          setFieldError("password2", errorData.new_password2[0]);
        }
      }
    }
  };
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <section className="min-h-screen w-11/12 sm:w-10/12 md:w-6/12 lg:w-[400px] xl:w-[500px] bg-backg flex flex-col pt-12">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-secondary p-7 rounded-full ">
              <LuKeyRound className="bg-primary text-white text-5xl rounded-md p-2" />
            </div>
            <TitleH2 title="Change Password" />
          </div>
          <div className="flex w-[400px] w-full flex-col justify-center">
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
                  <fieldset className="flex flex-col gap-6 mt-4 px-10 py-10 text-center">
                    <MyPasswordInput
                      name="password1"
                      type="password"
                      label="New Password"
                    />
                    <MyPasswordInput
                      name="password2"
                      type="password"
                      label="Re-enter New Password"
                    />

                    <button
                      type="submit"
                      className="mt-6 text-lg bg-primary text-white py-2 rounded-lg hover:bg-tertiary"
                    >
                      Change password
                    </button>
                  </fieldset>
                </Form>
              )}
            </Formik>
            <p className="text-center text-scondary sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl mt-28">
              Back to
              <Link
                to="/Login"
                className="font-semibold text-primary hover:text-tertiary pl-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </section>
    </>
  );
}

export default ResetPassword;
