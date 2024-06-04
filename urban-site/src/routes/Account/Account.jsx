import axios from "axios";
import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import TitleH2 from "../../component/TitleH2";
import TitleH3 from "../../component/TitleH3";

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
            className="peer m-0 p-0 h-14 w-full rounded-lg bg-gray-100 px-4 text-md outline-none"
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
    oldpassword: "Password cannot contain spaces, '<', or '>'",
    newpassword1: "Password cannot contain spaces, '<', or '>'",
    newpassword2: "Password confirmation cannot contain spaces, '<', or '>'",
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
            className="peer m-0 p-0 h-14 w-full rounded-lg bg-gray-100 px-4 text-md outline-none"
          />
          <span
            className="absolute right-5 top-11 transform translate-y-1/2 cursor-pointer"
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

const PasswordUpdateForm = () => {
  const [updateStatus, setUpdateStatus] = useState(null);

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string()
      .required("Old password is required")
      .matches(/^[^\s<>]*$/, "Password cannot contain spaces, '<', or '>'"),
    newpassword1: Yup.string()
      .required("New password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/^[^\s<>]*$/, "Password cannot contain spaces, '<', or '>'"),
    newpassword2: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("newpassword1"), null], "Passwords must match")
      .matches(
        /^[^\s<>]*$/,
        "Password confirmation cannot contain spaces, '<', or '>'"
      ),
  });

  const submit = async (values, { setFieldError, setSubmitting }) => {
    const passwordData = {
      old_password: values.oldpassword,
      password1: values.newpassword1,
      password2: values.newpassword2,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8000/user/password/",
        passwordData
      );

      if (response.status === 200) {
        setUpdateStatus("updated");
      } else {
        throw new Error("Validation error");
      }
    } catch (error) {
      console.error("Error while updating password:", error);
      if (error.response && error.response.status === 400) {
        let errorData = error.response.data;
        if (errorData.old_password) {
          setFieldError("oldpassword", errorData.old_password[0]);
        }
        if (errorData.password1) {
          setFieldError("newpassword1", errorData.password1[0]);
        }
        if (errorData.password2) {
          setFieldError("newpassword2", errorData.password2[0]);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        oldpassword: "",
        newpassword1: "",
        newpassword2: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ errors, touched }) => (
        <Form>
          <fieldset className="flex flex-col gap-6 mt-10 px-10 text-center">
            <aside className="md:hidden">
              <TitleH2 title="Update Password" />
            </aside>
            <aside className="hidden md:block md:-mt-2 md:-mb-8">
              <TitleH3 title="Update Password" />
            </aside>

            <MyPasswordInput name="oldpassword" label="Old Password" />
            <MyPasswordInput name="newpassword1" label="New Password" />
            <MyPasswordInput
              name="newpassword2"
              label="New Password confirmation"
            />
            <button
              type="submit"
              className="mt-4 h-12 w-full rounded-lg bg-primary text-white transition-all duration-300 hover:bg-success"
            >
              CHANGE PASSWORD
            </button>
            {updateStatus === "updated" && (
              <p className="text-danger text-xl">Password has been updated.</p>
            )}
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

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
      name: values.name,
      surname: values.surname,
      organisation: values.organisation,
    };

    try {
      const response = await axios.patch("http://localhost:8000/user/", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
        <div className="w-[400px] sm:w-[400px] md:w-[700px] lg:w-[1000px] rounded-lg bg-secondary flex flex-col justify-center items-start">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#2F5265"
              opacity="1"
              d="M0,224L48,229.3C96,235,192,245,288,256C384,267,480,277,576,266.7C672,256,768,224,864,208C960,192,1056,192,1152,202.7C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
          <div className="flex h-auto w-full flex-col pb-16 mb-2  pt-0 mt-0 rounded-b-lg bg-secondary bg-opacity-20 md:grid md:grid-cols-2">
            <Formik
              initialValues={{
                email: userData?.email ?? "",
                username: userData?.username ?? "",
                name: userData?.name ?? "",
                surname: userData?.surname ?? "",
                organisation: userData?.organisation ?? "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={submit}
            >
              {({ errors, touched }) => (
                <Form>
                  <fieldset className="flex flex-col gap-6 mt-2 px-10 text-center">
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

                    <button
                      type="submit"
                      className="mt-4 h-12 w-full rounded-lg bg-primary text-white transition-all duration-300 hover:bg-success"
                    >
                      SAVE CHANGES
                    </button>
                    {saveStatus === "saved" && (
                      <p className="text-danger text-xl">
                        Changes have been saved.
                      </p>
                    )}
                  </fieldset>
                </Form>
              )}
            </Formik>
            <fieldset className="p-0 m-0">
              <PasswordUpdateForm />
            </fieldset>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
