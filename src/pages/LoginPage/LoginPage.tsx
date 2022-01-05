import { Field, Form, Formik } from "formik";
import BasicButton from "../../components/BasicButton/BasicButton";
import { TextField } from "../../components/FormField/FormField";
import classes from "./LoginPage.module.css";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  return (
    <div className={classes.loginContainer}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={loginSchema}
      >
        {({ isValid }) => {
          return (
            <Form className={classes.form}>
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
              <div className={classes.buttons}>
                <BasicButton disabled={!isValid} theme="primary" type="submit">
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
