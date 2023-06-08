import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import clsx from "clsx";
import axios from "axios";
import "./style.css";
import { blue, green, grey, red } from "@mui/material/colors";

const ListTask = () => {
  function getChipProps(params) {
    switch (params) {
      case "Finish":
        return green;
      case "Doing":
        return blue;
      case "Late":
        return red;
      default:
        return grey;
    }
  }
  const columns = [
    {
      field: "task_id",
      headerName: "No.",
      headerClassName: "header",
      valueGetter: getTaskID,
      flex: 0.5,
    },
    {
      field: "task_name",
      headerName: "Task Title",
      headerClassName: "header",
      valueGetter: getTaskTitle,
      flex: 1.5,
    },
    {
      field: "task_description",
      headerName: "Description",
      headerClassName: "header",
      valueGetter: getTaskDescription,
      flex: 1.5,
    },
    {
      field: "customer",
      headerName: "Customer",
      headerClassName: "header",
      valueGetter: getCustomer,
      flex: 1.2,
    },
    {
      field: "department",
      headerName: "Department",
      headerClassName: "header",
      valueGetter: getDepartment,
      flex: 1.2,
      cellClassName: (params) => {
        return clsx("department", {
          HR: params.value === "Department HR",
          FrontEnd: params.value === "Department FontEnd",
          BackEnd: params.value === "Department BackEnd",
        });
      },
    },
    {
      field: "state",
      headerName: "Task's State",
      headerClassName: "header",
      flex: 0.8,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value}
            variant="outlined"
            size="small"
            style={{
              backgroundColor: getChipProps(params.value)[300],
              color: "white",
            }}
          />
        );
      },
    },
  ];

  function getTaskID(params) {
    return `${params.row.userTaskId}`;
  }
  function getTaskTitle(params) {
    return `${params.row.task.task_name}`;
  }
  function getTaskDescription(params) {
    return `${params.row.task.task_description}`;
  }
  function getCustomer(params) {
    return `${params.row.task.customer.customerName}`;
  }
  function getDepartment(params) {
    return `${params.row.task.user_creTask.department.departmentName}`;
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    GetTask();
  }, []);

  const GetTask = async () => {
    const result = await axios.get("http://localhost:8080/userTask/getAll");
    setTasks(result.data);
  };

  return (
    <div className="profile-container">
      <div className="list-content">
        <div className="list-wrap">
          <h6 className="pl-3 pt-3" style={{ color: "orange" }}>
            LIST OF TASKS
          </h6>

          <div className="mt-4">
            <div
              className=" mx-3"
              style={{ maxHeight: "450px", overflow: "scroll" }}
            >
              <DataGrid
                getRowId={(row) => row.userTaskId}
                getRowHeight={() => "auto"}
                initialState={{
                  pagination: { paginationModel: { pageSize: 6 } },
                  filter: { filterModel: { items: [] } },
                }}
                disableColumnSelector
                disableDensitySelector
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                sx={{
                  [`& .${gridClasses.cell}`]: {
                    py: 1.5,
                  },
                  "& .header": {
                    backgroundColor: "orange",
                  },
                  "& .department.HR": {
                    backgroundColor: "linen",
                    margin: "1px",
                  },
                  "& .department.FrontEnd": {
                    backgroundColor: "lightpink",
                    margin: "1px",
                  },
                  "& .department.BackEnd": {
                    backgroundColor: "lightblue",
                    margin: "1px",
                  },
                }}
                rows={tasks}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTask;
