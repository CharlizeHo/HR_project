import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-admin">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin/user">
            Administrator
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item active">
                <button className="btn btn-outline-warning">
                  <Link className="nav-link" to="/admin/user">
                    Quản lý người dùng
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-warning">
                  <Link className="nav-link" to="/admin/customer">
                    Quản lý khách hàng
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-warning">
                  <Link className="nav-link" to="/admin/department">
                    Quản lý phòng ban
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-warning">
                  <Link className="nav-link" to="/admin/task">
                    Quản lý công việc
                  </Link>
                </button>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ml-auto">
            <li>
              <span className="nav-link">Xin chào, Hoàng</span>
            </li>
            <li>
              <span className="nav-link">|</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn-logout" to="/">
                <i className="fas fa-sign-out-alt"></i> Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
