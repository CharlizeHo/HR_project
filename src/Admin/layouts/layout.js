import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";


export default () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div>
        <Navbar isOpen={isOpen} setOpen={setOpen} />
        {/* <div style={{ display: "flex" }}> */}
          <div className="main-content">
            <Outlet />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};
