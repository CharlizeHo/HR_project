import React, { useState } from "react";
import logo from "../../Components/common/image/logo.png";
import { Link } from "react-router-dom";
import "./LoginValidation";
import Validation from "./LoginValidation";

const LoginForm = () => {
  const [values, setValues] = useState({
    email: " ",
    password: " ",
  });

  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
  };
  return (
    <section className="vh-100">
      <div
        className="vh-100 px-4 px-md-5 text-center text-lg-start"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left */}
            <div className="col-lg-6 mb-5">
              <h1 className="my-5 mr-4 display-2">
                Nền tảng quản lý
                <br />
                <span style={{ color: "orange" }}>
                  nhân sự
                  <br /> tốt nhất
                </span>
              </h1>
              <p style={{ width: "500px", color: "#757f8e" }}>
                @2023 VTI_HappyTime. Một sản phẩm của team VTI.
              </p>
            </div>
            {/* Right */}
            <div className="card col-lg-6 my-5 mb-5">
              <div className="card-body p-5 p-lg-7 text-black">
                <div>
                  <img className="w-50" id="logo" src={logo} alt="logo" />
                  <h5
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    MỜI BẠN ĐĂNG NHẬP
                  </h5>
                  <form className="d-block" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        name="email"
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Nhập tài khoản email"
                        onChange={handleInput}
                      />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        name="password"
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Nhập mật khẩu"
                        onChange={handleInput}
                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>

                    <a className="mx-auto pt-1 mb-4" to="/Home">
                      <button
                        className="d-block btn btn-dark btn-block btn-lg p-2 text-center"
                        type="submit"
                      >
                        Đăng nhập
                      </button>
                    </a>

                    <Link className="small text-muted " to="#!">
                      Quên Mật Khẩu?
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
