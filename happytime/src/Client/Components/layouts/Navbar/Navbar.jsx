import React, { useState } from "react";
import logo from "../../common/logo.png";
import "./style.css";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Person from "./Person";
import { Modal } from "react-bootstrap";

function Navbar({ isOpen = false, setOpen = () => {} }) {
  // $("#test").hide();
  const toggle = () => setOpen(!isOpen);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <div>
      <header className="navbar">
        <div className="nav-items-left">
          <button className="menu-trigger" onClick={toggle}>
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>

          <NavLink to="/home">
            <img id="logo" src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="nav-items-right" id="test">
          <button className="btn-1">
            <span className="noti-icon">
              <i className="fa-solid fa-bell"></i>
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
                  <p className="dropdown-text">Profile</p>
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink
                  className="d-flex gap-2 align-items-center text-decoration-none text-black"
                  onClick={handleShow}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <p className="dropdown-text">Logout</p>
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Are you sure signing out?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <div className="btn btn-secondary p-2" onClick={handleShow}>
                Back
              </div>
              <NavLink className="btn btn-primary p-2" to="/">
                Agree
              </NavLink>
            </Modal.Footer>
          </Modal>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
