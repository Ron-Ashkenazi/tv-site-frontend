import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import MediaItemPage from "./pages/MediaItemPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { setUser } from "./util/auth";
import AuthContext from "./context/AuthProvider";

function App() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");

    const data = {
      id: storedUserID,
    };

    fetch("http://127.0.0.1:5000/api/v1/users/autoLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json(); // Return the JSON promise
      })
      .then((res) => {
        localStorage.setItem("token", res.token); // Set token to localStorage
        setUser(res.user);
        setAuth(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setAuth]);

  return (
    <div className="app-root" style={{ height: "100%" }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/:mediaType/:mediaID" element={<MediaItemPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
