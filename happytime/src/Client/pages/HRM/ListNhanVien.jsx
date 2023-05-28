import React, { useEffect, useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Form from "react-bootstrap/Form";

import axios from "axios";
import { useParams } from "react-router-dom";

const ListNhanVien = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Họ",
      headerClassName: "header",
      flex: 1.5,
    },
    {
      field: "firstName",
      headerName: "Tên",
      headerClassName: "header",
      flex: 1.5,
    },
    {
      field: "birthDate",
      headerClassName: "header",
      headerName: "Ngày sinh",
      flex: 2,
    },

    {
      field: "email",
      headerName: "Email",
      headerClassName: "header",
      flex: 2,
    },

    {
      field: "company.department",
      headerName: "Phòng ban",
      headerClassName: "header",
      flex: 1,
    },
  ];

  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState();
  const [searchTask, setSearchTask] = useState();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="profile-container vh-100">
      <div className="list-content">
        <h6 className="pl-3 pt-3" style={{ color: "orange" }}>
          DANH SÁCH NHÂN VIÊN
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
              value={searchUser}
              placeholder="Nhập tên khách hàng"
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </form>
        </div>
        <div className="mt-2 mx-3" style={{ maxHeight: "400px" }}>
          <DataGrid
            getRowHeight={() => "auto"}
            // checkboxSelection
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            rows={users}
            columns={columns}
            sx={{
              [`& .${gridClasses.cell}`]: {
                py: 1.5,
              },
              "& .header": {
                backgroundColor: "orange",
                fontWeight: "700px",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListNhanVien;
