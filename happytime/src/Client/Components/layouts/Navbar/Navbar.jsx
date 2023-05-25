import React, { useState } from "react";
import logo from "../../common/image/logo.png";
import "./style.css";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Person from "./Person/Person";
import { Button, Modal } from "react-bootstrap";

function Navbar({ isOpen = false, setOpen = () => {} }) {
  const toggle = () => setOpen(!isOpen);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
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
          <button className="btn-1">
            {/* noti icon */}
            <span className="noti-icon">
              <i class="fa-solid fa-bell"></i>
            </span>
          </button>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="btn btn-2">
                <Person />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink
                  className="d-flex gap-2 align-items-center text-decoration-none text-black"
                  to="/profile"
                >
                  <i className="fa-solid fa-pen"></i>
                  <p className="dropdown-text">Thông tin cá nhân</p>
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink
                  className="d-flex gap-2 align-items-center text-decoration-none text-black"
                  onClick={handleShow}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <p className="dropdown-text">Đăng xuất</p>
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Bạn muốn đăng xuất tài khoản?</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>Hello,you're reading this text in a modal!</Modal.Body> */}
            <Modal.Footer>
              <div className="btn btn-secondary p-2" onClick={handleShow}>
                Quay lại
              </div>
              <NavLink className="btn btn-primary p-2" to="/">
                Đồng ý
              </NavLink>
            </Modal.Footer>
          </Modal>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
