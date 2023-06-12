import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './user_style.css'

export default function AddUser() {
  const [departments, setDepartments] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true);


  useEffect(() => {
    GetDepartment();
  }, []);

  const GetDepartment = async () => {
    const result = await axios.get("http://localhost:8080/Department/getDepartment")
    setDepartments(result.data);
  }

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/auth/UserCol/getUser");
      const users = response.data;
      const isUsernameTaken = users.some((user) => user.username === username);
      setUsernameAvailable(!isUsernameTaken);
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  let navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    fullName: "",
    user_birthdate: "",
    gender: 0,
    address: "",
    phonenum: "",
    email: "",
    password: "",
    department: {
      id: 0,
      departmentName: ""
    },
    user_isActivity: true,
    user_avatar: ""
  });

  const { userName, fullName, user_birthdate, gender, address, phonenum, email, password, department, user_avatar, user_isActivity } = user;

  const [validEmail, setValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const onInputChange = (e) => {
    if (e.target.name === "id") {
      const selectedDepartment = departments.find(
        (department) => department.id === parseInt(e.target.value)
      );
      setUser({
        ...user,
        department: {
          id: parseInt(e.target.value),
          departmentName: selectedDepartment.departmentName,
        },
      });
    } else if (e.target.name === "userName") {
      const enteredUsername = e.target.value;
      setUser({ ...user, [e.target.name]: enteredUsername });
      checkUsernameAvailability(enteredUsername);
    }
    else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }

    if (e.target.name === 'email') {
      const isValidEmail = validateEmail(e.target.value);
      setValidEmail(isValidEmail);
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setValidEmail(false)
    } else {
      try {
        await axios.post("http://localhost:8080/api/v1/auth/register", user);
        navigate("/admin/user");
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert('Error 500 (Please check if phone number or username is duplicated)');
        } else {
          alert('An error occurred. Please try again.');
        }
      }
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
          <h2>Add user</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-6">

                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full name:
                  </label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="For example: Nguyen Vo Hoang"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="birthdate" className="form-label">
                    Birthdate:
                  </label>
                  <input
                    type="date"
                    className="form-control text-center"
                    name="user_birthdate"
                    value={user_birthdate}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className={`form-control text-center ${validEmail ? "" : "is-invalid"
                      }`}
                    placeholder="For example: hr@gmail.com"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                  {!validEmail && (
                    <div className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6">

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender:
                  </label>
                  <select
                    className="form-control text-center"
                    name="gender"
                    value={gender}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option>Choose gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="phonenum" className="form-label">
                    Phone number:
                  </label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="For example: 0123456789"
                    name="phonenum"
                    value={phonenum}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>



                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department:
                  </label>
                  <select
                    className="form-control text-center"
                    name="id"
                    value={department.id}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option value="" disabled>Choose department</option>
                    {departments?.map((list_department) => (
                      <option
                        key={list_department.id}
                        value={list_department?.id}
                      >
                        {list_department?.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='col-md-12'>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="For example: Ho Chi Minh City"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className={`form-control text-center ${usernameAvailable ? "" : "is-invalid"}`}
                    placeholder="For example: wbjn123"
                    name="userName"
                    value={userName}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                  {!usernameAvailable && (
                    <div className="invalid-feedback">
                      Username is taken. Please try another one.
                    </div>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className="mb-3 row" style={{ marginTop: "-16px" }}>
                  <label htmlFor="password" className="col-form-label">
                    Password:
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control text-center"
                      name="password"
                      value={password}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <i className="fa fa-eye"></i>
                      ) : (
                        <i className="fa fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-outline-primary mt-2">
                  Add
                </button>
                <Link
                  className="btn btn-outline-danger mx-2 mt-2"
                  to="/admin/user"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>


  )
}
