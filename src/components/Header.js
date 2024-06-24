import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../util/auth";
import AuthContext from "../context/AuthProvider";
import { HiUser } from "react-icons/hi";
import ClipLoader from "react-spinners/ClipLoader";
import "@fontsource/antonio";

const Header = (props) => {
  const { dbConnection } = props;
  const { auth, setAuth } = useContext(AuthContext);
  const [connectionStatus, setConnectionStatus] = useState("connecting"); // "connecting", "failed", "succeeded"
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    removeUser();
    setAuth({});
  };

  const buttonStyle = {
    fontFamily: "Antonio, sans-serif",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!dbConnection) {
      const timer = setTimeout(() => {
        setConnectionStatus("failed");
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [dbConnection]);

  useEffect(() => {
    if (dbConnection) {
      setConnectionStatus("succeeded");
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [dbConnection]);

  return (
    <header className="main-header">
      <div className="profile-button-container">
        {auth.userName && (
          <HiUser
            onClick={() => navigate("profile")}
            className="profile-button"
          />
        )}
      </div>
      <div className="home-button-container">
        <button
          onClick={() => navigate("")}
          className="home-button"
          style={buttonStyle}
        >
          RMDB
        </button>
      </div>
      {connectionStatus === "connecting" && (
        <div className="log-in-sign-up-container">
          <p>Connecting to server</p>
          <ClipLoader className="clip-loader" color="white" />
        </div>
      )}
      {connectionStatus === "failed" && (
        <div className="log-in-sign-up-container">
          <p style={{ color: "red" }}>Connection to server failed</p>
        </div>
      )}
      {connectionStatus === "succeeded" && showSuccessMessage && (
        <div className="log-in-sign-up-container">
          <p style={{ color: "green" }}>Connection succeeded!</p>
        </div>
      )}
      {connectionStatus === "succeeded" && !showSuccessMessage && (
        <>
          {auth.userName ? (
            <div className="log-in-sign-up-container">
              <button onClick={logOutHandler} className="sign-in-button">
                Log out
              </button>
            </div>
          ) : (
            <div className="log-in-sign-up-container">
              <button
                onClick={() => navigate("log-in")}
                className="log-in-button"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("sign-up")}
                className="sign-in-button"
              >
                Sign up
              </button>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
