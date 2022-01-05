import { Formik, Form, Field } from "formik";
import { TextField } from "../../components/FormField/FormField";
import * as Yup from "yup";

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
  return (
    <div>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          console.log(values);
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
            <Form>
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
              <button disabled={!isValid} type="submit">
                Register
              </button>
              <button type="reset">Clear</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
