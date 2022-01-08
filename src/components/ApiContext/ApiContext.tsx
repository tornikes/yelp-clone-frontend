import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { RestaurantPreview } from "../../types";
const baseUrl = "http://localhost:5000/api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface ApiContextType {
  logIn(credentials: LoginCredentials): Promise<void>;
  restaurantCount(): Promise<number>;
  fetchRestaurantsPage(page: number): Promise<RestaurantPreview[]>;
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

  async function restaurantCount() {
    const response = await axios.get<{ count: number }>(
      `${baseUrl}/restaurant/count`
    );

    return response.data.count;
  }

  async function fetchRestaurantsPage(page: number) {
    const response = await axios.get<{ restaurants: RestaurantPreview[] }>(
      `${baseUrl}/restaurant`,
      {
        params: {
          page,
        },
      }
    );

    return response.data.restaurants;
  }

  return (
    <ApiContext.Provider
      value={{
        isLoggedIn,
        logout,
        logIn,
        restaurantCount,
        fetchRestaurantsPage,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  return useContext(ApiContext);
}
