import React from "react";
import "./style.css";

const FirstBanner = () => {
  return (
    <div>
      {/* Container */}
      <div className="grid-banner">
        {/* GridLayout */}
        <div className="grid-items">
          {/* box 1 */}
          <span className="grid-title">
            <i className="fa-sharp fa-solid fa-user"></i>
            <p style={{ fontWeight: "600", marginBottom: "5px" }}>
              Nhân viên xuất sắc
            </p>
          </span>
          <span>
            <h4>10</h4>
            <p>So với hôm qua (+2)</p>
          </span>
        </div>
        <div className="grid-items">
          {/* box 2 */}
          <span className="grid-title">
            <i className="fa-sharp fa-solid fa-user"></i>
            <p style={{ fontWeight: "600", marginBottom: "5px" }}>
              Nhân viên xuất sắc
            </p>
          </span>
          <span>
            <h4>10</h4>
            <p>So với hôm qua (+2)</p>
          </span>
        </div>
        <div className="grid-items">
          {/* box 3 */}
          <span className="grid-title">
            <i className="fa-sharp fa-solid fa-user"></i>
            <p style={{ fontWeight: "600", marginBottom: "5px" }}>
              Nhân viên xuất sắc
            </p>
          </span>
          <span>
            <h4>10</h4>
            <p>So với hôm qua (+2)</p>
          </span>
        </div>
        <div className="grid-items">
          {/* box 3 */}
          <span className="grid-title">
            <i className="fa-sharp fa-solid fa-user"></i>
            <p style={{ fontWeight: "600", marginBottom: "5px" }}>
              Nhân viên xuất sắc
            </p>
          </span>
          <span>
            <h4>10</h4>
            <p>So với hôm qua (+2)</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FirstBanner;
