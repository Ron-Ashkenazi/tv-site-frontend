import { useState, useEffect } from "react";
import { handleInputChange, validateInputs } from "../util/FormFunctions.js";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSettings = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
  });

  const [passwordValues, setPasswordValues] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [valid, setValid] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    validateInputs(values, setValid, "first-last-names");
  }, [values]);

  useEffect(() => {
    validateInputs(passwordValues, setValidPassword, "new-password");
  }, [passwordValues]);

  const toastHandler = (response, successMsg, errorMsg) => {
    if (response.ok) {
      toast.success(`${successMsg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    } else {
      toast.error(`${errorMsg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();

    const data = {
      dataToUpdate: { firstName: values.firstName, lastName: values.lastName },
    };

    const storedToken = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");

    fetch(`http://127.0.0.1:5000/api/v1/users/${storedUserID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        toastHandler(response, "Your changes saved", "Something went wrong");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setValues(() => ({
      firstName: "",
      lastName: "",
    }));
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    const data = {
      currentPassword: passwordValues.password,
      dataToUpdate: {
        password: passwordValues.newPassword,
      },
    };

    const storedToken = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");

    fetch(`http://127.0.0.1:5000/api/v1/users/${storedUserID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        toastHandler(
          response,
          "Your password changed successfully",
          "Wrong current password"
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setPasswordValues(() => ({
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  return (
    <main>
      <div>
        <h3>First name</h3>
        <input
          onChange={(event) =>
            handleInputChange(setValues, null, "firstName", event)
          }
          value={values.firstName}
        ></input>
      </div>
      <div>
        <h3>Last name</h3>
        <input
          onChange={(event) =>
            handleInputChange(setValues, null, "lastName", event)
          }
          value={values.lastName}
        ></input>
      </div>
      <button onClick={handleSaveChanges} disabled={valid}>
        Save changes
      </button>
      <div>
        <h3>Current password</h3>
        <input
          onChange={(event) =>
            handleInputChange(setPasswordValues, null, "password", event)
          }
          value={passwordValues.password}
        ></input>
      </div>
      <div>
        <h3>New password</h3>
        <input
          onChange={(event) =>
            handleInputChange(setPasswordValues, null, "newPassword", event)
          }
          value={passwordValues.newPassword}
        ></input>
      </div>
      <div>
        <h3>Confirm new password</h3>
        <input
          onChange={(event) =>
            handleInputChange(
              setPasswordValues,
              null,
              "confirmNewPassword",
              event
            )
          }
          value={passwordValues.confirmNewPassword}
        ></input>
      </div>
      <button onClick={handleChangePassword} disabled={validPassword}>
        Change password
      </button>
      <ToastContainer />
    </main>
  );
};

export default ProfileSettings;
