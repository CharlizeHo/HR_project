function Validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const password_pattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{5,}$/;

  if (values.email === " ") {
    error.email = "Email must be filled";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Invalid syntax. Please try again.";
  } else {
    error.email = "";
  }
  if (values.password === " ") {
    error.password = "Password must be filled";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Invalid syntax. Please try again.";
  } else {
    error.password = "";
  }
  return error;
}
export default Validation;
