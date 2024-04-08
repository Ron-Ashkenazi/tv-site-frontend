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

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [disableButton, setDisableButton] = useState(true);

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
    fetch("http://127.0.0.1:5000/api/v1/users/login", {
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
            <label>Password:</label>
            <input
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
