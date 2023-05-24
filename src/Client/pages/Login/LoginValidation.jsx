function Validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const password_pattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{5,}$/;

  if (values.email === "") {
    error.email = "Email không được để trống";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Cú pháp không hợp lệ";
  } else {
    error.email = "";
  }
  if (values.password === "") {
    error.password = "Mật khẩu không được để trống";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Cú pháp không hợp lệ";
  } else {
    error.password = "";
  }
  return error;
}
export default Validation;
