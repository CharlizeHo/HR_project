import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Sidebar = ({ isOpen }) => {
  const menuItem = [
    {
      path: "/home",
      name: "Trang chủ",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      path: "/listTask",
      name: "Danh sách công việc",
      icon: <i className="fa-solid fa-list-ul"></i>,
    },
    {
      path: "/bangCong",
      name: "Bảng công ",
      icon: <i className="fa-solid fa-bars-progress"></i>,
    },
    {
      path: "/quanLyNhanSu",
      name: "Quản lý nhân sự",
      icon: <i className="fa-solid fa-user-group"></i>,
    },
  ];
  return (
    <div>
      <div className="sidebar" style={{ width: isOpen ? "200px" : "80px" }}>
        {menuItem.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} className="icon-link">
              <div
                className="icon"
                style={{ marginLeft: isOpen ? "20px" : "28px" }}
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
      </div>
    </div>
  );
};

export default Sidebar;
