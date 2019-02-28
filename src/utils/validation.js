export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const isEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const passwordMatch = (pass1, pass2) => {
  if (!(pass1 === pass2)) {
    return false;
  }
  return true;
};

export const signupValidate = ({ password, email }, password2) => {
  // const { password, email } = userData;
  let errors = {};

  if (password.length <= 5) {
    errors.password = "Please use a stronger password";
  }

  if (!passwordMatch(password, password2)) {
    errors.password2 = "Passwords don't match.";
  }
  if (!isEmail(email)) {
    errors.email = "Please enter a valid email.";
  }

  return errors;
};
