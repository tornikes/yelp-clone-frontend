import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApiContextProvider from "./components/ApiContext/ApiContext";
import Layout from "./components/Layout/Layout";
import NotLoggedIn from "./components/NotLoggedIn";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <ApiContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/places"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <NotLoggedIn>
                  <RegisterPage />
                </NotLoggedIn>
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <NotLoggedIn>
                  <LoginPage />
                </NotLoggedIn>
              </Layout>
            }
          />
        </Routes>
      </ApiContextProvider>
    </Router>
  );
}

export default App;
