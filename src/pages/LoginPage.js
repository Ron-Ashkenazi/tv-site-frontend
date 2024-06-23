import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import "./SignUpLoginPage.css";
import { setUser } from "../util/auth.js";
import {
  createInvalidValues,
  handleInputChange,
  handleInputBlur,
  validateInputs,
} from "../util/FormFunctions.js";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const URL = process.env.REACT_APP_PROTECTED_URL;
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [disableButton, setDisableButton] = useState(true);
  const [visiblePass, setVisiblePass] = useState(false);

  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    userName: false,
    password: false,
  });

  let invalidValues = createInvalidValues(values, didEdit, "login");

  useEffect(() => {
    validateInputs(values, setDisableButton, "login");
  }, [values]);

  const handleSubmit = (event) => {
    const newUser = {
      password: values.password,
      userName: values.userName,
    };
    event.preventDefault();
    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        setAuth(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-login-root">
      {auth.userName ? (
        <>
          <h2>Welcome back {auth.userName}</h2>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="labels-input-container">
            <label>user-name:</label>
            <input
              className={invalidValues.userName ? "error-input" : ""}
              onChange={(event) =>
                handleInputChange(setValues, setDidEdit, "userName", event)
              }
              onBlur={() => handleInputBlur(setDidEdit, "userName")}
              value={values.userName}
            ></input>
            <div style={{ marginTop: "5px" }}>
              <label>Password:</label>
              {visiblePass && (
                <IoMdEye
                  className="eye-icon"
                  onClick={() => {
                    setVisiblePass(false);
                  }}
                />
              )}
              {!visiblePass && (
                <IoIosEyeOff
                  className="eye-icon"
                  onClick={() => {
                    setVisiblePass(true);
                  }}
                />
              )}
            </div>
            <input
              type={visiblePass ? "" : "password"}
              className={invalidValues.password ? "error-input" : ""}
              onChange={(event) =>
                handleInputChange(setValues, setDidEdit, "password", event)
              }
              onBlur={() => handleInputBlur(setDidEdit, "password")}
              value={values.password}
            ></input>
            <button
              disabled={disableButton}
              className="sign-up-login-confirm-button"
            >
              Login
            </button>
          </div>
          <label onClick={() => navigate("/sign-up")} className="option-label">
            Don't have an account? Sign up
          </label>
        </form>
      )}
    </div>
  );
};

export default Login;
