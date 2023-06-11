import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import clsx from "clsx";
import axios from "axios";

const PreviewTasks = () => {
  const columns = [
    {
      field: "user_id",
      headerName: "#",
      headerClassName: "header",
      // valueGetter: getUserId,
      flex: 1,
    },
    {
      field: "user_fullName",
      headerName: "Employee's Name",
      headerClassName: "header",
      flex: 1.8,
    },

    {
      field: "department",
      headerName: "Department",
      headerClassName: "header",
      valueGetter: getDepartment,
      flex: 1.3,
      cellClassName: (params) => {
        return clsx("department", {
          HR: params.value === "Department HR",
          FrontEnd: params.value === "Department FrontEnd",
          BackEnd: params.value === "Department BackEnd",
        });
      },
    },
  ];

  function getDepartment(params) {
    return `${params.row.department.departmentName}`;
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    GetTask();
  }, []);

  const GetTask = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/auth/UserCol/getUser"
    );
    setTasks(result.data);
  };

  return (
    <div className="task-container mt-md-2 mt-lg-0">
      <span style={{ fontWeight: "600" }}>Top Employees</span>
      <div style={{ height: 420, marginTop: "10px" }}>
        <DataGrid
          getRowId={(tasks) => tasks.user_id}
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
          rows={tasks}
          columns={columns}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
            "& .header": {
              backgroundColor: "orange",
              fontWeight: "bold",
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
  );
};

export default PreviewTasks;
