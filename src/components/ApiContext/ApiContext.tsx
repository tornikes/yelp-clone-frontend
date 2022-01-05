import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
const baseUrl = "http://localhost:5000/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface ApiContextType {
  logIn(credentials: LoginCredentials): Promise<void>;
  isLoggedIn: boolean;
  logout(): void;
}

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export default function ApiContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [token, setToken] = useState<string | null>();
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof token === "string" && Boolean(token.length)
  );

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    if (t) {
      setToken(t);
      setIsLoggedIn(true);
    } else {
      setToken(null);
      setIsLoggedIn(false);
    }
  }, []);

  function updateToken(token: string) {
    localStorage.setItem("access_token", token);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setToken(null);
    setIsLoggedIn(false);
  }

  async function logIn(credentials: { email: string; password: string }) {
    const response = await axios.post<{ token: string }>(
      `${baseUrl}/auth/login`,
      credentials
    );
    if (response.status === 200) {
      console.log("login success");
      setIsLoggedIn(true);
      updateToken(response.data.token);
    }
  }

  return (
    <ApiContext.Provider value={{ isLoggedIn, logout, logIn }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  return useContext(ApiContext);
}
