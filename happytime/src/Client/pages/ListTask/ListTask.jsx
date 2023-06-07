import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import clsx from "clsx";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./style.css";
import { red } from "@mui/material/colors";

const ListTask = () => {
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
      cellClassName: (params) => {
        return (
          <Chip
            variant="outlined"
            size="small"
            color="warning"
            {...getChipProps(params)}
          />
        );
      },
    },
  ];

  function getChipProps(params) {
    if (params.value === "Late") {
      return {
        label: params.value,
        style: {
          borderColor: red[500],
        },
      };
    }
  }
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
          <div className="list-wrap-container-task">
            <div>
              <Form.Select
                className="list-select-items"
                defaultValue={"default"}
              >
                <option disabled value="default">
                  Choose a Department
                </option>
                <option value="1">HR</option>
                <option value="2">BackEnd</option>
                <option value="3">FrontEnd</option>
              </Form.Select>
            </div>
            <div>
              <Form.Select
                className="list-select-items"
                name="Task's State"
                defaultValue={"default"}
              >
                <option disabled value="default">
                  Choose a task's state
                </option>
                <option value="1">Open</option>
                <option value="2">Doing</option>
                <option value="3">Finish</option>
                <option value="4">Late</option>
              </Form.Select>
            </div>
          </div>
          <div>
            <div
              className="mt-2 mx-3"
              style={{ maxHeight: "400px", overflow: "scroll" }}
            >
              <DataGrid
                getRowId={(row) => row.userTaskId}
                getRowHeight={() => "auto"}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                  filter: { filterModel: { items: [] } },
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
                  // "& .state.Late": {
                  //   backgroundColor: "tomato",
                  //   color: "white",
                  //   width: "10px",
                  //   marginTop: "5px",
                  //   marginBottom: "5px",
                  //   borderRadius: "5px",
                  // },
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
