import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./style.css";

const ListTask = () => {
  const columns = [
    {
      field: "task_id",
      headerName: "Mã công việc",
      headerClassName: "header",
      valueGetter: getTaskID,
    },
    {
      field: "task_name",
      headerName: "Tiêu đề công việc",
      headerClassName: "header",
      valueGetter: getTaskTitle,
      flex: 2,
    },
    {
      field: "task_description",
      headerName: "Mô tả công việc",
      headerClassName: "header",
      valueGetter: getTaskDescription,
      flex: 2,
    },
    {
      field: "customer",
      headerClassName: "header",
      headerName: "Khách hàng",
      valueGetter: getCustomer,
      flex: 2,
    },
    {
      // field: "department",
      headerName: "Phòng ban",
      headerClassName: "header",
      valueGetter: getDepartment,
      flex: 2,
    },
    {
      field: "state",
      headerName: "Trạng thái",
      headerClassName: "header",
      flex: 1,
    },
  ];

  function getTaskID(params) {
    return `${params.row.task.task_id}`;
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
          </div>
          <div>
            {/* Table */}
            <div
              className="mt-2 mx-3"
              style={{ maxHeight: "400px", overflow: "scroll" }}
            >
              <DataGrid
                getRowId={(row) => row.userTaskId}
                getRowHeight={() => "auto"}
                initialState={{
                  pagination: { paginationModel: { pageSize: 4 } },
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
      </div>
    </div>
  );
};

export default ListTask;
