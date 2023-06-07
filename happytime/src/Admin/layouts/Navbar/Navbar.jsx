// import React from 'react';
// // import logo from "../../common/image/logo.png";
// import "./style.css";
// import { Link } from 'react-router-dom';

// function Navbar() {

//   return (
//     <div>
//       <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-admin">
//         <div className='container-fluid'>
//           <Link class="navbar-brand" to="/admin/user">Administrator</Link>
//           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <div class="collapse navbar-collapse" id="navbarNav">
//             <ul class="navbar-nav me-auto">
//               <li class="nav-item active">
//                 <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/user">Quản lý người dùng</Link></button>
//               </li>
//               <li class="nav-item">
//               <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/customer">Quản lý khách hàng</Link></button>
//               </li>
//               <li class="nav-item">
//               <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/department">Quản lý phòng ban</Link></button>
//               </li>
//               <li class="nav-item">
//               <button className='btn btn-outline-warning'><Link class="nav-link" to="/admin/task">Quản lý công việc</Link></button>
//               </li>
//             </ul>
//           </div>
//           <ul class="navbar-nav ml-auto">
//             <li >
//               <span class="nav-link">Xin chào, Hoàng</span>
//             </li>
//             <li >
//               <span class="nav-link">|</span>
//             </li>
//             <li class="nav-item">
//               <Link class="nav-link btn-logout" to="/">
//                 <i class="fas fa-sign-out-alt"></i> Đăng xuất
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (route) => {
    setDropdownOpen(false);
    window.location.href = route;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-admin">
        <div className='container-fluid'>
          <Link className="navbar-brand" to="/admin/user">Administrator</Link>
          <button
            className={`navbar-toggler ${dropdownOpen ? "collapsed" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={dropdownOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleDropdown}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${dropdownOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="btn btn-outline-warning nav-link" to="/admin/user">User Management</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-warning nav-link" to="/admin/customer">Customer Management</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-warning nav-link" to="/admin/department">Department Management</Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className={`btn btn-task btn-outline-warning ${dropdownOpen ? "show" : ""}`}
                  onClick={toggleDropdown}
                  ref={dropdownRef}
                >
                  Task Management
                </button>
                <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOptionClick("/admin/task")}
                  >
                    All Tasks
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOptionClick("/admin/usertask")}
                  >
                    Assigned Task
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ml-auto">
            <li>
              <span className="nav-link">Hello, Hoang</span>
            </li>
            <li>
              <span className="nav-link">|</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn-logout" to="/">
                <i className="fas fa-sign-out-alt"></i> Log out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
