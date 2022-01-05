import { Formik, Form, Field } from "formik";
import { TextField } from "../../components/FormField/FormField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import BasicButton from "../../components/BasicButton/BasicButton";
import axios from "axios";

const registerSchema = Yup.object({
  userName: Yup.string().required("Username is required").min(3).max(50),
  email: Yup.string().email().max(90).required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(80, "Password must be less than 80 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className={classes.registerContainer}>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            values
          );
          if (response.status === 201) {
            resetForm();
            navigate("/places");
          }
        }}
        validationSchema={registerSchema}
        validate={({ confirmPassword }) => {
          if (confirmPassword === "")
            return {
              confirmPassword: "Please confirm password",
            };
        }}
      >
        {({ isValid }) => {
          return (
            <Form className={classes.form}>
              <Field
                label="User name"
                placeholder="username"
                name="userName"
                component={TextField}
              />
              <Field
                label="Email"
                placeholder="email"
                name="email"
                type="email"
                component={TextField}
              />
              <Field
                label="Password"
                placeholder="password"
                name="password"
                type="password"
                component={TextField}
              />
              <Field
                label="Confirm password"
                placeholder="confirm password"
                name="confirmPassword"
                type="password"
                value=""
                component={TextField}
              />
              <div className={classes.buttons}>
                <BasicButton theme="primary" type="submit">
                  Register
                </BasicButton>
                <BasicButton theme="secondary" type="reset">
                  Reset
                </BasicButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
