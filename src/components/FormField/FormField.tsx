import { FieldProps, Field, ErrorMessage } from "formik";

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
  <div>
    <label>{label}</label>
    <Field type={type} placeholder={placeholder} {...field} />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </div>
);
