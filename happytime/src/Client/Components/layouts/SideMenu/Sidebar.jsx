import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./style.css";

const Sidebar = ({ isOpen }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      path: "/listTask",
      name: "Tasks' List",
      icon: <i className="fa-solid fa-list-ul"></i>,
    },
    {
      path: "/nhanvien",
      name: "Employees' List",
      icon: <i className="fa-solid fa-user-group"></i>,
    },
  ];
  return (
    <div className="d-flex flex-column justify-content-center">
      <div
        className="sidebar min-vh-100"
        style={{ width: isOpen ? "145px" : "70px", marginTop: "-2px" }}
      >
        {menuItem.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} className="icon-link">
              <div
                className="icon"
                style={{ marginLeft: isOpen ? "14px" : "27px" }}
              >
                {item.icon}
              </div>
              <div
                className="item-name"
                style={{ display: isOpen ? "block" : "none" }}
              >
                {item.name}
              </div>
            </NavLink>
          );
        })}
        <hr />
        <div
          className="hover icon-link "
          style={{ paddingTop: "15px", paddingBottom: "15px" }}
          onClick={handleShow}
        >
          <div
            className="hover d-flex gap-2 align-items-center text-decoration-none"
            style={{
              marginLeft: isOpen ? "14px" : "27px",
            }}
          >
            <i className="fas fa-sign-out-alt" />
            <span style={{ display: isOpen ? "block" : "none",  fontSize: "14px" }}>Log out</span>
          </div>
        </div>
      </div>
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
  );
};

export default Sidebar;
