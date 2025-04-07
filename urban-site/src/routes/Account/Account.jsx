import axios from "axios";
import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import TitleH2 from "../../component/TitleH2";
import DeleteModal from "../../component/DeleteModal";
import { BACKEND_URL } from "../../utils/config";
import useUser from "../../hook/useUser";

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
    organisation: "Organisation cannot contain '<' or '>'",
  };

  return (
    <>
      <section>
        <div className="group relative flex flex-col place-items-start">
          <div>
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
          <p className="max-w-sm text-danger pb-2">{meta.error}</p>
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
      <section>
        <div className="group relative flex flex-col place-items-start">
          <div>
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
          <p className="max-w-sm text-danger pb-2">{meta.error}</p>
        ) : null}
      </section>
    </>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[^\s<>]*$/, "Email cannot contain spaces, '<', or '>'"),

  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9@._-]*$/,
      "Username can only contain alphanumeric characters, hyphens, underscores, '@', and '.'"
    )
    .matches(/^[^\s<>]*$/, "Username cannot contain spaces, '<', or '>'"),

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

const PasswordUpdateForm = () => {
  const [updateStatus, setUpdateStatus] = useState(null);

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().matches(
      /^[^\s<>]*$/,
      "Password cannot contain spaces, '<', or '>'"
    ),
    newpassword1: Yup.string()

      .min(8, "Must be at least 8 characters")
      .matches(/^[^\s<>]*$/, "Password cannot contain spaces, '<', or '>'"),
    newpassword2: Yup.string()

      .oneOf([Yup.ref("newpassword1"), null], "Passwords must match")
      .matches(
        /^[^\s<>]*$/,
        "Password confirmation cannot contain spaces, '<', or '>'"
      ),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const submit = async (values, { setFieldError, setSubmitting }) => {
    const passwordData = {
      old_password: values.oldpassword,
      password1: values.newpassword1,
      password2: values.newpassword2,
    };

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/user/password/`,
        passwordData
      );

      if (response.status === 200) {
        setUpdateStatus("updated");
      } else {
        throw new Error("Validation error");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        let errorData = error.response.data;

        // Set the error message in the state
        setErrorMessage(errorData.error || "An error occurred");

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
      {({ errors, touched, handleChange }) => {
        const handleChangeAndClearError = (event) => {
          setErrorMessage("");
          setUpdateStatus(null);
          handleChange(event);
        };

        return (
          <Form>
            <fieldset className="flex flex-col gap-6 px-10 text-center md:grid md:grid-cols-2">
              <aside className="mt-4 md:mt-16">
                <TitleH2 title="Update Password" />
              </aside>
              <div className="md:row-start-2">
                <MyPasswordInput
                  name="oldpassword"
                  label="Old Password"
                  onChange={handleChangeAndClearError}
                />
              </div>
              <div className="md:row-start-2 col-start-2">
                <MyPasswordInput
                  name="newpassword1"
                  label="New Password"
                  onChange={handleChangeAndClearError}
                />
              </div>
              <div className="md:row-start-3 col-start-2">
                <MyPasswordInput
                  name="newpassword2"
                  label="New Password confirmation"
                  onChange={handleChangeAndClearError}
                />
              </div>
              <div className="md:row-start-4 col-start-2">
                <button
                  type="submit"
                  className="mt-4 mb-4 h-12 w-full rounded-lg bg-primary text-white transition-all duration-300 hover:bg-tertiary"
                >
                  CHANGE PASSWORD
                </button>
                {errorMessage && (
                  <div className="text-danger text-xl">{errorMessage}</div>
                )}
                {updateStatus === "updated" && (
                  <p className="text-success text-xl">
                    Password has been updated.
                  </p>
                )}
              </div>
            </fieldset>
          </Form>
        );
      }}
    </Formik>
  );
};

const Account = () => {
  const { userData } = useUser();
  const [saveStatus, setSaveStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");

  const submit = async (values, { setFieldError }) => {
    const user = {
      email: values.email,
      username: values.username,
      name: values.name,
      surname: values.surname,
      organisation: values.organisation,
    };

    try {
      const response = await axios.patch(`${BACKEND_URL}/user/`, user, {
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
      if (error.response && error.response.status === 400) {
        // The request was a validation error

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
  const handleDelete = async () => {
    const response = await axios.delete(`${BACKEND_URL}/delete_account/`);

    if (response.status === 200) {
      localStorage.clear();
      // Redirect to home
      window.location.href = "/";
    } else {
      // Handle error
    }

    setConfirmDelete("");
    setShowModal(false);
  };

  return (
    <>
      <section className="min-h-screen flex justify-center items-start">
        <div className="w-[400px] sm:w-[400px] md:w-[700px] lg:w-[1000px] rounded-lg bg-secondary flex flex-col justify-center items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="rounded-t-lg"
          >
            <path
              fill="#2F5265"
              opacity="1"
              d="M0,224L48,229.3C96,235,192,245,288,256C384,267,480,277,576,266.7C672,256,768,224,864,208C960,192,1056,192,1152,202.7C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
          <div className="flex h-auto w-full flex-col pb-16 mb-2  pt-0 mt-0 rounded-b-lg bg-secondary bg-opacity-20">
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
              {({ errors, touched, handleChange }) => {
                const handleChangeAndClearStatus = (event) => {
                  setSaveStatus(null);
                  handleChange(event);
                };

                return (
                  <Form>
                    <fieldset className="flex flex-col gap-6 px-10 text-center md:flex-none md:grid md:grid-cols-2">
                      <TitleH2 title="Account" />
                      <div className="md:row-start-3 col-start-2">
                        <MyTextInput
                          name="email"
                          type="text"
                          label="Email"
                          placeholder={userData ? userData.email : ""}
                          onChange={handleChangeAndClearStatus}
                        />
                      </div>
                      <div className="md:row-start-3">
                        <MyTextInput
                          name="username"
                          type="text"
                          label="Username"
                          placeholder={userData ? userData.username : ""}
                          onChange={handleChangeAndClearStatus}
                        />
                      </div>
                      <div className="md:row-start-2">
                        <MyTextInput
                          name="name"
                          type="text"
                          label="Name"
                          placeholder={userData ? userData.name : ""}
                          onChange={handleChangeAndClearStatus}
                          className="md:row-start-3"
                        />
                      </div>
                      <div className="md:row-start-2">
                        <MyTextInput
                          name="surname"
                          type="text"
                          label="Surname"
                          placeholder={userData ? userData.surname : ""}
                          onChange={handleChangeAndClearStatus}
                        />
                      </div>
                      <div className="md:row-start-5 col-start-2">
                        <MyTextInput
                          name="organisation"
                          type="text"
                          label="Organisation"
                          placeholder={userData ? userData.organisation : ""}
                          onChange={handleChangeAndClearStatus}
                        />
                      </div>
                      <div className="md:row-start-6 col-start-2 md:space-y-4">
                        <button
                          type="submit"
                          className="mt-4 h-12 w-full rounded-lg bg-primary text-white transition-all duration-300 hover:bg-tertiary"
                        >
                          SAVE CHANGES
                        </button>
                        {saveStatus === "saved" && (
                          <p className="text-success text-xl pt-4 md:pt-0">
                            Account has been updated.
                          </p>
                        )}
                      </div>
                    </fieldset>
                  </Form>
                );
              }}
            </Formik>
            <fieldset>
              <PasswordUpdateForm />
            </fieldset>
            <div className="flex flex-col gap-6 px-10 text-center mt-8 md:grid md:grid-cols-2">
              <button
                className="mt-4 h-12 w-full rounded-lg bg-primary text-white transition-all duration-300 hover:bg-danger md:col-start-2"
                onClick={() => setShowModal(true)}
              >
                DELETE ACCOUNT
              </button>
              <DeleteModal
                showModal={showModal}
                setShowModal={setShowModal}
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
