import axios from "axios";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import updateAuthStatus from "../Interceptors/axios";

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
    </>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
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
      const { data } = await axios.post(
        "http://localhost:8000/token/login/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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
      <section className="flex min-h-screen items-center justify-center">
        <div className="relative h-[800px] w-[400px] overflow-hidden rounded-3xl">
          <div
            className="h-full w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://usercontent.one/wp/www.buildwind.net/wp-content/uploads/2021/09/IFF_Guangzhou_Sim_streamlines_global_06_169-768x432.jpg')",
            }}
          ></div>
          <div className="absolute bottom-0 flex h-3/4 w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
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
                  <MyTextInput
                    name="password"
                    type="password"
                    label="Password"
                  />
                  <button
                    type="submit"
                    className="h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-[#1E73BE]"
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
                className="font-semibold text-blue-900 hover:text-blue-800 pl-1"
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
