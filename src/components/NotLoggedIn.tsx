import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useApiContext } from "./ApiContext/ApiContext";

export default function NotLoggedIn({ children }: PropsWithChildren<{}>) {
  const { isLoggedIn } = useApiContext();
  console.log(`Not supposed to render ${isLoggedIn}`);
  return isLoggedIn ? <Navigate to="/places" /> : <>{children}</>;
}
