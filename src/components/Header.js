import "./Header.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../util/auth";
import AuthContext from "../context/AuthProvider";
import "@fontsource/antonio";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    removeUser();
    setAuth({});
  };

  const buttonStyle = {
    fontFamily: "Antonio, sans-serif",
  };

  const navigate = useNavigate();
  return (
    <header className="main-header">
      <div className="profile-button-container">
        {auth.userName && (
          <button
            onClick={() => navigate("profile")}
            className="profile-button"
          >
            {auth.userName}
          </button>
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
      {auth.userName ? (
        <>
          <div className="log-in-sign-up-container">
            <button onClick={logOutHandler} className="sign-in-button">
              Log out
            </button>
          </div>
        </>
      ) : (
        <div className="log-in-sign-up-container">
          <button onClick={() => navigate("log-in")} className="log-in-button">
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
    </header>
  );
};

export default Header;
