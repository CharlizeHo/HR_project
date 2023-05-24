import React from "react";
import logo from "../../common/image/logo.png";
import "./style.css";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Person from "../../../Render/Person";

function Navbar({ isOpen = false, setOpen = () => {} }) {
  const toggle = () => setOpen(!isOpen);

  return (
    <div>
      <header className="navbar">
        <div className="nav-items-left">
          <button className="menu-trigger" onClick={toggle}>
            {/* <MenuIcon /> */}
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>

          {/* logo */}
          <NavLink to="/home">
            <img id="logo" src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="nav-items-right">
          <button className="btn-3">
            {/* noti icon */}
            <span className="noti-icon">
              <i class="fa-solid fa-bell"></i>
            </span>
          </button>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="btn btn-4">
                <Person />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/profile">
                <span className="btn-left">
                  <i className="fa-solid fa-pen"></i>
                  <p className="dropdown-text">Thông tin cá nhân</p>
                </span>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to="/">
                  <span className="btn-left">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <p className="dropdown-text">Đăng xuất</p>
                  </span>
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
