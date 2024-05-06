import axios from "axios";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="group relative">
        <input
          {...field}
          {...props}
          id={props.name}
          required
          className="peer pt-6 mb-0 pb-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
        />
        <label
          htmlFor={props.name}
          className="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
        >
          {label}
        </label>
      </div>
      {meta.touched && meta.error ? (
        <p className="max-w-sm text-red-500 mb-4">{meta.error}</p>
      ) : null}
    </>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string().required("Required"),
  password1: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .required("Required"),
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  organisation: Yup.string().required("Required"),
});

const Registration = () => {
  const submit = async (values) => {
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
      await axios.post(
        "http://localhost:8000/dj-rest-auth/registration/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = "/verification";
    } catch (error) {
      console.error("Error while registering:", error);
    }
  };

  return (
    <>
      <section className="flex min-h-screen items-center justify-center">
        <div className="relative h-[1000px] w-[400px] overflow-hidden rounded-3xl">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://usercontent.one/wp/www.buildwind.net/wp-content/uploads/2022/11/Brussels_240N_Streamlines_Windrose-768x533.jpg')",
            }}
          ></div>
          <div className="absolute bottom-48 flex h-3/4 w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
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
                <Form className="mt-10 px-10 py-10 text-center">
                  <MyTextInput name="email" type="text" label="Email" />
                  <MyTextInput name="username" type="text" label="Username" />
                  <MyTextInput name="name" type="text" label="Name" />
                  <MyTextInput name="surname" type="text" label="Surname" />
                  <MyTextInput
                    name="organisation"
                    type="text"
                    label="Organisation"
                  />
                  <MyTextInput name="password1" type="text" label="Password" />
                  <MyTextInput
                    name="password2"
                    type="text"
                    label="Password confirmation"
                  />

                  <button
                    type="submit"
                    className="mt-4 h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-[#1E73BE]"
                  >
                    Sign up
                  </button>
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
