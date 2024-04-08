export function createInvalidValues(values, didEdit, filter) {
  if (filter === "login") {
    return {
      userName:
        didEdit.userName &&
        (values.userName.trim().indexOf(" ") !== -1 ||
          !(values.userName.trim().length >= 1)),
      password:
        didEdit.password &&
        (values.password.trim().indexOf(" ") !== -1 ||
          !(values.password.trim().length >= 5)),
    };
  } else {
    return {
      userName:
        didEdit.userName &&
        (values.userName.trim().indexOf(" ") !== -1 ||
          !(values.userName.trim().length >= 1)),
      password:
        didEdit.password &&
        (values.password.trim().indexOf(" ") !== -1 ||
          !(values.password.trim().length >= 5)),
      firstName: didEdit.firstName && !(values.firstName.trim().length >= 1),
      lastName: didEdit.lastName && !(values.lastName.trim().length >= 1),
      confirmPassword:
        didEdit.confirmPassword && values.confirmPassword !== values.password,
    };
  }
}

export const handleInputChange = (setValues, setDidEdit, value, event) => {
  setValues((prevValues) => ({
    ...prevValues,
    [value]: event.target.value,
  }));

  if (setDidEdit !== null) {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [value]: false,
    }));
  }
};

export const handleInputBlur = (setDidEdit, value) => {
  setDidEdit((prevValues) => ({
    ...prevValues,
    [value]: true,
  }));
};

export const validateInputs = (values, setDisableButton, filter) => {
  if (filter === "login") {
    if (
      values.userName.trim().indexOf(" ") === -1 &&
      values.userName.trim().length >= 1 &&
      values.password.trim().indexOf(" ") === -1 &&
      values.password.trim().length >= 5
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  } else if (filter === "signup") {
    if (
      values.firstName.length >= 1 &&
      values.lastName.trim().length >= 1 &&
      values.userName.trim().indexOf(" ") === -1 &&
      values.userName.trim().length >= 1 &&
      values.password.trim().indexOf(" ") === -1 &&
      values.password.trim().length >= 5 &&
      values.confirmPassword === values.password
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  } else if (filter === "first-last-names") {
    if (
      values.firstName.trim().length >= 1 &&
      values.lastName.trim().length >= 1
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  } else if (filter === "new-password") {
    if (
      values.password.trim().indexOf(" ") === -1 &&
      values.password.trim().length >= 5 &&
      values.newPassword.trim().indexOf(" ") === -1 &&
      values.newPassword.trim().length >= 5 &&
      values.confirmNewPassword === values.newPassword
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }
};
