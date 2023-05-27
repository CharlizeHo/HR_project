import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./style.css";
import ListTaskTable from "./ListTaskTable";

const ListTask = () => {
  const [searchTask, setSearchTask] = useState();
  const [searchEmployers, setSearchEmployers] = useState();
  return (
    <div className="profile-container">
      <div className="list-content">
        {/* Main Content */}
        <div className="list-wrap">
          {/* Select Items */}
          <h6 className="pl-3 pt-3" style={{ color: "orange" }}>
            DANH SÁCH CÔNG VIỆC
          </h6>
          <div className="list-wrap-container-task">
            <div>
              <Form.Select className="list-select-items">
                <option>Trạng thái hoạt động</option>
                <option value="1">Tất cả</option>
                <option value="2">Mở</option>
                <option value="3">Đóng</option>
              </Form.Select>
            </div>
            <div>
              <Form.Select className="list-select-items">
                <option>Phòng ban</option>
                <option value="1">Tất cả</option>
                <option value="2">FrontEnd</option>
                <option value="3">BackEnd</option>
                <option value="4">HR</option>
              </Form.Select>
            </div>
            <form>
              <input
                type="text"
                className="list-input"
                value={searchTask}
                placeholder="Nhập tiêu đề công việc"
                onChange={(e) => setSearchTask(e.target.value)}
              />

              <input
                type="text"
                className="list-input"
                value={searchEmployers}
                placeholder="Nhập tên khách hàng"
                onChange={(e) => setSearchEmployers(e.target.value)}
              />
            </form>
          </div>
          <div>
            {/* Table */}
            <ListTaskTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTask;
