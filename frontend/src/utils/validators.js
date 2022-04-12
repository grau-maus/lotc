const validateEmail = (email) => {
  const emailRegEx = /\S+@\S+\.\S+/;

  return emailRegEx.test(email);
};

export const signupValidation = ({
  email,
  username,
  password,
  confirmPassword,
  setErrors
}) => {
  let noErrors = true;

  if (!email || !validateEmail(email)) {
    setErrors((errors) => ({
      ...errors,
      email: true
    }));
    noErrors = false;
  }

  // add check for username in db if exists
  if (!username) {
    setErrors((errors) => ({
      ...errors,
      username: true
    }));
    noErrors = false;
  }

  if (!password) {
    setErrors((errors) => ({
      ...errors,
      password: true
    }));
    noErrors = false;
  }

  if (!confirmPassword) {
    setErrors((errors) => ({
      ...errors,
      confirmPassword: true
    }));
    noErrors = false;
  }

  return noErrors;
};
