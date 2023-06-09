function Validation(values) {
  let error = {};

  // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // const password_pattern = /^(?=.\d)(?=.*[A-Z])(?=.[a-z])[a-zA-Z0-9].{5,}$/;
  const username_pattern = /^.{3,}$/;
  const password_pattern = /^.{5,}$/;

  if (values.username === " ") {
    error.username = "The field must be filled";
  } else if (!username_pattern.test(values.username)) {
    error.username = "Invalid syntax. Please try again.";
  } else {
    error.username = "";
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
