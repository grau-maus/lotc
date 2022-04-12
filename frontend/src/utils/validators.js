const validateEmail = (email) => {
  const emailRegEx = /\S+@\S+\.\S+/;

  return emailRegEx.test(email);
};

export const FEsignupValidation = ({
  email,
  username,
  password,
  confirmPassword,
  setErrors
}) => {
  let noErrors = true;

  if (!email) {
    setErrors((errors) => ({
      ...errors,
      email: "Please provide an email"
    }));
    noErrors = false;
  }

  if (email && !validateEmail(email)) {
    setErrors((errors) => ({
      ...errors,
      email: "Invalid email"
    }));
    noErrors = false;
  }

  // add check for username in db if exists
  if (!username) {
    setErrors((errors) => ({
      ...errors,
      username: "Please provide a username"
    }));
    noErrors = false;
  }

  if (!password) {
    setErrors((errors) => ({
      ...errors,
      password: "Please provide a password"
    }));
    noErrors = false;
  }

  if (!confirmPassword) {
    setErrors((errors) => ({
      ...errors,
      confirmPassword: "Passwords must match"
    }));
    noErrors = false;
  }

  return noErrors;
};

export const BEsignupValidation = ({ BEErrors, setErrors }) => {
  if (!BEErrors || !BEErrors.length) return;

  BEErrors.forEach((error) => {
    const LCError = error.toLowerCase();

    if (LCError.includes("password")) {
      setErrors((errors) => ({
        ...errors,
        password: error
      }));
    }

    if (LCError.includes("username")) {
      setErrors((errors) => ({
        ...errors,
        username: error
      }));
    }

    if (LCError.includes("email")) {
      setErrors((errors) => ({
        ...errors,
        email: error
      }));
    }
  });
};
