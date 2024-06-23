import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpLoginPage.css";
import AuthContext from "../context/AuthProvider";
import { setUser } from "../util/auth.js";
import {
  createInvalidValues,
  handleInputChange,
  handleInputBlur,
  validateInputs,
} from "../util/FormFunctions.js";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const SignUpLoginPage = () => {
  const URL = process.env.REACT_APP_PROTECTED_URL;
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const [visiblePass, setVisiblePass] = useState(false);

  const [values, setValues] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [didEdit, setDidEdit] = useState({
    userName: false,
    password: false,
    firstName: false,
    lastName: false,
    confirmPassword: false,
  });

  let invalidValues = createInvalidValues(values, didEdit, "signup");

  useEffect(() => {
    validateInputs(values, setDisableButton, "signup");
  }, [values]);

  const handleSubmit = (event) => {
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      userName: values.userName,
      tvShows: [],
      movies: [],
      watchlist: [],
    };
    event.preventDefault();
    fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        return response.json(); // Return the JSON promise
      })
      .then((res) => {
        localStorage.setItem("token", res.token); // Set token to localStorage
        setUser(res.data.user);
        setAuth(res.data.user);
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
          <h2>Sign up</h2>
          <div className="labels-input-container">
            <label>First name:</label>
            <input
              className={invalidValues.firstName ? "error-input" : ""}
              onChange={(event) =>
                handleInputChange(setValues, setDidEdit, "firstName", event)
              }
              onBlur={() => handleInputBlur(setDidEdit, "firstName")}
              value={values.firstName}
            ></input>
            <label>Last name:</label>
            <input
              className={invalidValues.lastName ? "error-input" : ""}
              onChange={(event) =>
                handleInputChange(setValues, setDidEdit, "lastName", event)
              }
              onBlur={() => handleInputBlur(setDidEdit, "lastName")}
              value={values.lastName}
            ></input>{" "}
            <div style={{ marginTop: "5px" }}>
              <label>user-name:</label>
              <label
                title="Username must not contain spaces and should have at least 1 character."
                className="info-label"
              >
                ?
              </label>
            </div>
            <input
              className={invalidValues.userName ? "error-input" : ""}
              onChange={(event) =>
                handleInputChange(setValues, setDidEdit, "userName", event)
              }
              onBlur={() => handleInputBlur(setDidEdit, "userName")}
              value={values.userName}
            ></input>
            <div style={{ marginTop: "5px" }}>
              <div>
                <label>Password:</label>
                <label
                  title="The password must be at least 5 characters long without spaces."
                  className="info-label"
                >
                  ?
                </label>
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
            <label>Confirm password:</label>
            <input
              type={visiblePass ? "" : "password"}
              className={invalidValues.confirmPassword ? "error-input" : ""}
              onChange={(event) =>
                handleInputChange(
                  setValues,
                  setDidEdit,
                  "confirmPassword",
                  event
                )
              }
              onBlur={() => handleInputBlur(setDidEdit, "confirmPassword")}
              value={values.confirmPassword}
            ></input>
            <button
              disabled={disableButton}
              className="sign-up-login-confirm-button"
            >
              Sign up
            </button>
          </div>
          <label className="option-label" onClick={() => navigate("/log-in")}>
            Already have an account? Log in
          </label>
        </form>
      )}
    </div>
  );
};

export default SignUpLoginPage;
