import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./style.css";
import AssignTaskTable from "./AssignTaskTable/AssignTaskTable";

const TaskAssigned = () => {
  const [searchEmployees, setSearchEmployees] = useState();
  const [startDate, setStartDate] = useState();
  return (
    <div className="list-container">
      <div className="btn-list">
        <NavLink to="/listTask" key="1" className="btn-list-item">
          <div className="btn-list-icon">
            <i className="fa-solid fa-table-list"></i>
          </div>
          <div className="btn-list-name">Danh sách công việc</div>
        </NavLink>
        <NavLink
          to="/listTask/task-assignments"
          key="2"
          className="btn-list-item"
          style={{ borderLeft: "3px solid rgb(255, 159, 10)", color: "orange" }}
        >
          <div className="btn-list-icon">
            <i className="fa-solid fa-calendar-day"></i>
          </div>
          <div className="btn-list-name">Phân công</div>
        </NavLink>
      </div>

      <div className="list-content">
        {/* Main Content */}
        <div className="list-wrap">
          {/* Select Items */}
          <span>
            <h6>DANH SÁCH PHÂN CÔNG LÀM VIỆC</h6>
          </span>
          <div className="list-wrap-container-assign">
            <div>
              <Form.Select className="list-select-items">
                <option>Đối tượng áp dụng</option>
                <option value="1">Toàn phòng ban</option>
                <option value="2">Vị trí công việc</option>
                <option value="3">Nhân viên</option>
              </Form.Select>
            </div>
            <form>
              <input
                type="text"
                className="list-input"
                value={searchEmployees}
                placeholder="Nhập tên nhân viên"
                onChange={(e) => setSearchEmployees(e.target.value)}
              />
            </form>
            <form>
              <input
                type="text"
                className="list-input"
                value={searchEmployees}
                placeholder="Nhập tên phòng ban"
                onChange={(e) => setSearchEmployees(e.target.value)}
              />
            </form>
            <form>
              <input
                type="date"
                className="list-input-date"
                value={startDate}
                placeholder="Ngày tạo"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </form>
            <button className="list-add-btn">
              <i className="fa-solid fa-plus"></i> THÊM MỚI
            </button>
          </div>
          <div>
            {/* Table */}
            <AssignTaskTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssigned;
