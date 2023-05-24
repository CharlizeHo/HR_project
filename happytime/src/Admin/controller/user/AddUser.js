import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './user_style.css'

export default function AddUser() {
  const [departments, setDepartments] = useState(null)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    GetDepartment();
  }, []);

  const GetDepartment = async () => {
    const result = await axios.get("http://localhost:8080/Department/getDepartment")
    setDepartments(result.data);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  let navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
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

  const { userName, user_birthdate, gender, address, phonenum, email, password, department, user_avatar, user_isActivity } = user;

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
    } else {
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
          alert('Duplicate phonenum. Please enter a different phonenum.');
        } else {
          alert('An error occurred. Please try again.');
        }
      }
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2>Thêm người dùng</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Họ và tên:
                  </label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Ví dụ: Nguyễn Võ Hoàng"
                    name="userName"
                    value={userName}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="birthdate" className="form-label">
                    Ngày tháng năm sinh:
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
                  <label htmlFor="gender" className="form-label">
                    Giới tính:
                  </label>
                  <select
                    className="form-control text-center"
                    name="gender"
                    value={gender}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option>Chọn giới tính</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                    <option value="3">Khác</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className={`form-control text-center ${validEmail ? "" : "is-invalid"
                      }`}
                    placeholder="Ví dụ: hr@gmail.com"
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
                  <label htmlFor="phonenum" className="form-label">
                    Số điện thoại:
                  </label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Ví dụ: 0123456789"
                    name="phonenum"
                    value={phonenum}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Địa chỉ:
                  </label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Ví dụ: Ho Chi Minh City"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Phòng ban:
                  </label>
                  <select
                    className="form-control text-center"
                    name="id"
                    value={department.id}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option value="">Chọn phòng ban</option>
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

                <div className="mb-3 row" style={{ marginTop: "19.7px" }}>
                  <label htmlFor="password" className="col-form-label">
                    Mật khẩu:
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
                  Thêm
                </button>
                <Link
                  className="btn btn-outline-danger mx-2 mt-2"
                  to="/admin/user"
                >
                  Hủy
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>


  )
}
