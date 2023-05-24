import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./SideMenu/Sidebar";

export default () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div>
        <Navbar isOpen={isOpen} setOpen={setOpen} />
        <div style={{ display: "flex" }}>
          <Sidebar className="container" isOpen={isOpen} />
          <div
            className="main-content"
            style={{ marginLeft: isOpen ? "200px" : "80px" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
