import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import MediaPage from "./pages/MediaPage";
import { setUser } from "./util/auth";
import AuthContext from "./context/AuthProvider";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const URL = process.env.REACT_APP_PROTECTED_URL;

  const { setAuth, setLoading } = useContext(AuthContext);
  const [dbConnection, setDbConnection] = useState(false);

  useEffect(() => {
    const makePingRequest = async () => {
      try {
        const response = await fetch(`${URL}/ping`);
        const data = await response.json();
        console.log(data);
        setDbConnection(true);
      } catch (error) {
        console.error(error);
      }
    };

    makePingRequest();
  }, [URL]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");

    if (storedToken && storedUserID) {
      const data = { id: storedUserID };

      fetch(`${URL}/autoLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          localStorage.setItem("token", res.token);
          setUser(res.user);
          setAuth(res.user);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [setAuth, setLoading, URL]);

  return (
    <Router>
      <Layout>
        <Header dbConnection={dbConnection} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/:mediaType/:mediaID" element={<MediaPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
