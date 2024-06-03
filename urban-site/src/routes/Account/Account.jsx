import axios from "axios";
import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import TitleH2 from "../../component/TitleH2";

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
    organisation: "Organisation cannot contain '<' or '>'",
  };

  return (
    <>
      <section>
        <div className="group relative flex flex-col place-items-start">
          <div>
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
            <label
              htmlFor={props.name}
              className="text-lg text-primary ml-3 mb-1"
            >
              {label}
            </label>
          </div>
          <input
            {...field}
            {...props}
            id={props.name}
            className="peer m-0 p-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
            placeholder={props.placeholder}
          />
        </div>
        {meta.touched && meta.error ? (
          <p className="max-w-sm text-red-500 pb-2">{meta.error}</p>
        ) : null}
      </section>
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
        <div className="group relative flex flex-col place-items-start">
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
          <label
            htmlFor={props.name}
            className="text-lg text-primary ml-3 mb-1"
          >
            {label}
          </label>
          <input
            {...field}
            {...props}
            id={props.name}
            type={showPassword ? "text" : "password"}
            className="peer m-0 p-0 h-14 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
          />
          <span
            className="absolute right-5 top-14 transform -translate-y-1/2 cursor-pointer"
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
    .matches(/^[^\s<>]*$/, "Email cannot contain spaces, '<', or '>'"),

  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9_-]*$/,
      "Username can only contain alphanumeric characters, hyphens, and underscores"
    )
    .matches(/^[^\s<>]*$/, "Username cannot contain spaces, '<', or '>'"),

  password1: Yup.string()
    .min(8, "Must be at least 8 characters")
    .matches(/^[^\s<>]*$/, "Password cannot contain spaces, '<', or '>'"),

  password2: Yup.string()
    .oneOf([Yup.ref("password1"), null], "Passwords must match")
    .matches(
      /^[^\s<>]*$/,
      "Password confirmation cannot contain spaces, '<', or '>'"
    ),

  name: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "Name can only contain alphanumeric characters")
    .matches(/^[^\s<>]*$/, "Name cannot contain spaces, '<', or '>'"),

  surname: Yup.string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Surname can only contain alphanumeric characters"
    )
    .matches(/^[^\s<>]*$/, "Surname cannot contain spaces, '<', or '>'"),

  organisation: Yup.string().matches(
    /^[^\s<>]*$/,
    "Organisation cannot contain spaces, '<', or '>'"
  ),
});

const Account = () => {
  const [saveStatus, setSaveStatus] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem("access_token");

        // Check if the access token exists
        if (accessToken) {
          // Include the access token in the request headers
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };

          // Send the GET request with the access token included in the headers
          const response = await axios.get(
            "http://localhost:8000/user/",
            config
          );

          if (response.data) {
            const { email, username, name, surname, organisation } =
              response.data;
            setUserData({ email, username, name, surname, organisation });
          }
        } else {
          // Handle the case where the access token is missing
          console.error("Access token is missing");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
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
      const response = await axios.patch(
        "http://localhost:8000/dj-rest-auth/user/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSaveStatus("saved");
      } else {
        throw new Error("Validation error");
      }
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
      <section className="min-h-screen flex justify-center items-start">
        <div className="w-[400px] xl:w-[500px] rounded-3xl bg-secondary flex justify-center items-start">
          <div className="flex h-auto w-full flex-col pb-16 mb-2 mt-4 sm:mt-8 lg:mt-12 rounded-3xl bg-white bg-opacity-20">
            <Formik
              initialValues={{
                email: userData?.email ?? "",
                username: userData?.username ?? "",
                name: userData?.name ?? "",
                surname: userData?.surname ?? "",
                organisation: userData?.organisation ?? "",
                password1: "",
                password2: "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={submit}
            >
              {({ errors, touched }) => (
                <Form>
                  <fieldset className="flex flex-col gap-6 mt-10 px-10 py-10 text-center">
                    <TitleH2 title="Account" />
                    <MyTextInput
                      name="email"
                      type="text"
                      label="Email"
                      placeholder={userData ? userData.email : ""}
                    />
                    <MyTextInput
                      name="username"
                      type="text"
                      label="Username"
                      placeholder={userData ? userData.username : ""}
                    />
                    <MyTextInput
                      name="name"
                      type="text"
                      label="Name"
                      placeholder={userData ? userData.name : ""}
                    />
                    <MyTextInput
                      name="surname"
                      type="text"
                      label="Surname"
                      placeholder={userData ? userData.surname : ""}
                    />
                    <MyTextInput
                      name="organisation"
                      type="text"
                      label="Organisation"
                      placeholder={userData ? userData.organisation : ""}
                    />
                    <MyPasswordInput name="password1" label="New Password" />
                    <MyPasswordInput
                      name="password2"
                      label="New Password confirmation"
                    />
                    <button
                      type="submit"
                      className="mt-4 h-12 w-full rounded-3xl bg-primary text-white transition-all duration-300 hover:bg-success"
                    >
                      SAVE CHANGES
                    </button>
                    {saveStatus === "saved" && (
                      <p className="text-green-500 text-xl">
                        Changes have been saved.
                      </p>
                    )}
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

export default Account;
