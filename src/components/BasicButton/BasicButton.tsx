import classes from "./BasicButton.module.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme: "primary" | "secondary";
}

export default function BasicButton(props: ButtonProps) {
  return (
    <button
      className={`${classes.button} ${classes[props.theme]}`}
      {...props}
    />
  );
}
