import React, { useState } from "react";
import logo from "../../Components/common/logo.png";
import Validation from "./LoginValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = user;

  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(user));
    console.log(user);

    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", user)
      .then((res) => {
        const token = res.data.token;

        // console.log(res.data);
        // const authority = res.data.role[0].authority;

        const user = {
          userName: res.data.userName,
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        navigate("/home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#f5f5f5" }}>
      <div
        className="px-4 px-md-5 text-center text-lg-start"
        style={{ marginTop: "-20px" }}
      >
        <div className="container">
          <div className="row align-items-center text-center">
            {/* Left */}
            <div className="col-lg-6 mb-5">
              <h1
                className="my-5 mr-4 display-5 lh-base"
                style={{ fontWeight: "380" }}
              >
                Human Resources
                <br />
                <span style={{ color: "orange" }}>Management Platform</span>
                <br />
                For Industry
              </h1>
              <p className="mx-auto" style={{ color: "#757f8e" }}>
                @2023 VTI_HappyTime. A product of team VTI.
              </p>
            </div>
            {/* Right */}
            <div className="card col-lg-6 my-lg-5 mb-5 text-center">
              <div className="card-body p-5 p-lg-7 text-black">
                <div>
                  <img className="w-50" id="logo" src={logo} alt="logo" />
                  <h5
                    className="fw-normal fs-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Welcome!
                  </h5>
                  <form className="d-block" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-outline mb-4">
                      <input
                        name="userName"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => handleInput(e)}
                      />
                      {errors.username && (
                        <span className="text-danger">{errors.username}</span>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        name="password"
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handleInput(e)}
                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>

                    <a className="mx-auto pt-1 mb-4" to="/Home">
                      <button
                        className="d-block btn btn-block btn-lg p-2 text-center"
                        style={{ background: "orange", color: "white" }}
                        type="submit"
                      >
                        Log in
                      </button>
                    </a>
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
