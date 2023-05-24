import React from 'react';
// import logo from "../../common/image/logo.png";
import "./style.css";
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-admin">
        <div className='container-fluid'>
          <Link class="navbar-brand" to="/admin/user">Administrator</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item active">
                <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/user">Quản lý người dùng</Link></button>
              </li>
              <li class="nav-item">
              <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/customer">Quản lý khách hàng</Link></button>
              </li>
              <li class="nav-item">
              <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/department">Quản lý phòng ban</Link></button>
              </li>
              <li class="nav-item">
              <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/task">Quản lý công việc</Link></button>
              </li>
            </ul>
          </div>
          <ul class="navbar-nav ml-auto">
            <li >
              <span class="nav-link">Xin chào, Hoàng</span>
            </li>
            <li >
              <span class="nav-link">|</span>
            </li>
            <li class="nav-item">
              <Link class="nav-link btn-logout" to="/">
                <i class="fas fa-sign-out-alt"></i> Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
