import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { useField } from "formik";
import * as Yup from "yup";

const MyPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="group relative">
        <input
          {...field}
          {...props}
          id={props.name}
          required
          className="peer m-0 p-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
        />
        <label
          htmlFor={props.name}
          className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-[#1E73BE] peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-[#1E73BE]"
        >
          {label}
        </label>
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
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .required("Required"),
});

function ResetPassword() {
  const submit = async (values, { setFieldError }) => {
    const { uid, token } = useParams();

    console.log("uid:", uid);
    console.log("token:", token);

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
          if (response.status !== 201) {
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
          <div className="absolute bottom-48 flex h-5/6 w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
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
