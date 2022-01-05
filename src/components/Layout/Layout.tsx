import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import classes from "./Layout.module.css";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className={classes.layout}>
      <header style={{ height: "50px", borderBottom: "2px solid black" }}>
        This is a header component
        <Link to="/register">Register</Link>
      </header>{" "}
      <div className={classes.layoutContainer}>
        This is a layout component: children are {children}
      </div>
      <footer className={classes.footer}>Copyright 2020 © Yelp-ish</footer>
    </div>
  );
}
