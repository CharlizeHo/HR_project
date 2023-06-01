import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import Form from "react-bootstrap/Form";
import axios from "axios";

const ListNhanVien = () => {
  const columns = [
    {
      field: "user_id",
      headerName: "ID",
      headerClassName: "header",
      flex: 0.5,
    },
    {
      field: "user_fullName",
      headerName: "Tên nhân viên",
      headerClassName: "header",
      flex: 2,
    },
    {
      field: "user_email",
      headerName: "Email",
      headerClassName: "header",
      flex: 1.5,
    },
    {
      field: "departmentName",
      headerName: "Phòng ban",
      headerClassName: "header",
      valueGetter: getDepartment,
      flex: 1,
    },
    {
      field: "user_isActivity",
      headerName: "Trạng thái hoạt động",
      headerClassName: "header",
      flex: 1,
    },
  ];

  function getDepartment(params) {
    // return console.log(params);
    return `${params.row.department.departmentName}`;
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetUsers();
  }, []);

  const GetUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/auth/UserCol/getUser");
    console.log(result.data);
    setUsers(result.data);
  };

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
        </div>
        <div className="mt-2 mx-3" style={{ maxHeight: "400px" }}>
          <DataGrid
            getRowId={(row) => row.user_id}
            getRowHeight={() => "auto"}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
              filter: {
                filterModel: {
                  items: [],
                },
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
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

//{* ============ *}

// import * as React from "react"
// import Box from "@mui/material/Box"
// import { DataGrid } from "@mui/x-data-grid"

// function getFullName(params) {
//   return `${params.row.firstName || ""} ${params.row.lastName || ""}`
// }

// function getCarModel(params) {
//   return `${params.row.car.model}`
// }

// function getCarMark(params) {
//   return `${params.row.car.mark}`
// }

// const columns = [
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     width: 160,
//     valueGetter: getFullName
//   },
//   { field: "car.mark", headerName: "Car", width: 130, valueGetter: getCarMark },
//   {
//     field: "car.model",
//     headerName: "Car Model",
//     width: 130,
//     valueGetter: getCarModel
//   }
// ]

// const rows = [
//   {
//     id: 1,
//     lastName: "Snow",
//     firstName: "Jon",
//     car: { model: "Corolla", mark: "Toyota" }
//   },
//   {
//     id: 2,
//     lastName: "Lannister",
//     firstName: "Cersei",
//     car: { model: "Corolla", mark: "Toyota" }
//   },
//   {
//     id: 3,
//     lastName: "Lannister",
//     firstName: "Jaime",
//     car: { model: "Corolla", mark: "Toyota" }
//   },
//   {
//     id: 4,
//     lastName: "Stark",
//     firstName: "Arya",
//     car: { model: "Corolla", mark: "Toyota" }
//   },
//   {
//     id: 5,
//     lastName: "Targaryen",
//     firstName: "Daenerys",
//     car: { model: "Corolla", mark: "Toyota" }
//   }
// ]

// export default function ValueGetterGrid() {
//   return (
//     <Box sx={{ height: 400, width: "100%" }}>
//       <DataGrid rows={rows} columns={columns} />
//     </Box>
//   )
// }
