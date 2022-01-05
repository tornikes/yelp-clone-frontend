import { FieldProps, Field, ErrorMessage } from "formik";
import classes from "./FormField.module.css";

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  type: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
  type = "text",
}) => (
  <div className={classes.formField}>
    <label className={classes.fieldLabel}>{label}</label>
    <Field
      className={classes.fieldInput}
      type={type}
      placeholder={placeholder}
      {...field}
    />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </div>
);
