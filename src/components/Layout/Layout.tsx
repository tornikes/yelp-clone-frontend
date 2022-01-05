import { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApiContext } from "../ApiContext/ApiContext";
import BasicButton from "../BasicButton/BasicButton";
import classes from "./Layout.module.css";

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { isLoggedIn, logout } = useApiContext();
  const navigate = useNavigate();
  return (
    <div className={classes.layout}>
      <header style={{ height: "50px", borderBottom: "2px solid black" }}>
        This is a header component
        <Link to="/register">Register</Link>
        {isLoggedIn ? (
          <BasicButton
            theme="primary"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </BasicButton>
        ) : (
          <BasicButton theme="primary" onClick={() => navigate("/login")}>
            Sign in
          </BasicButton>
        )}
      </header>{" "}
      <div className={classes.layoutContainer}>{children}</div>
      <footer className={classes.footer}>Copyright 2020 © Yelp-ish</footer>
    </div>
  );
}
