import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridCheckIcon,
  GridCloseIcon,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import axios from "axios";
import clsx from "clsx";
import { Chip } from "@mui/material";

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
      headerName: "FullName",
      headerClassName: "header",
      flex: 1.5,
    },
    {
      field: "user_email",
      headerName: "Email",
      headerClassName: "header",
      flex: 1.5,
    },
    {
      field: "departmentName",
      headerName: "Department",
      headerClassName: "header",
      valueGetter: getDepartment,
      flex: 1,
      cellClassName: (params) => {
        return clsx("department", {
          HR: params.value === "Department HR",
          FrontEnd: params.value === "Department FrontEnd",
          BackEnd: params.value === "Department BackEnd",
        });
      },
    },
    {
      field: "user_isActivity",
      headerName: "Employee's State",
      headerClassName: "header",
      flex: 1,
      renderCell: (params) => {
        return params.value ? (
          <Chip
            icon={<GridCheckIcon style={{ color: "green" }} />}
            label="Available"
            variant="outlined"
            style={{
              backgroundColor: getChipProps(params.value)[300],
              color: "green",
            }}
          />
        ) : (
          <Chip
            icon={<GridCloseIcon style={{ color: "gray" }} />}
            label="Unavailable"
            variant="outlined"
            style={{
              backgroundColor: getChipProps(params.value)[300],
              color: "gray",
            }}
          />
        );
      },
    },
  ];

  function getChipProps(params) {
    switch (params) {
      case "True":
        return "green";
      default:
        return "#f5f5f5";
    }
  }

  function getDepartment(params) {
    return `${params.row.department.departmentName}`;
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetUsers();
  }, []);

  const GetUsers = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/auth/UserCol/getUser"
    );
    console.log(result.data);
    setUsers(result.data);
  };

  return (
    <div className="profile-container vh-100">
      <div className="list-content">
        <h6 className="pl-3 pt-3" style={{ color: "orange" }}>
          LIST OF EMPLOYEES
        </h6>

        <div className="mt-4 mx-3" style={{ maxHeight: "400px" }}>
          <DataGrid
            getRowId={(row) => row.user_id}
            getRowHeight={() => "auto"}
            initialState={{
              pagination: { paginationModel: { pageSize: 6 } },
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
              "& .department.HR": {
                backgroundColor: "linen",
                margin: "1px",
              },
              "& .department.FrontEnd": {
                backgroundColor: "lavender",
                margin: "1px",
              },
              "& .department.BackEnd": {
                backgroundColor: "lightblue",
                margin: "1px",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListNhanVien;
