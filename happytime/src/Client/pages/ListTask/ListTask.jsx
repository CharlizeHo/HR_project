import Form from "react-bootstrap/Form";
import "./style.css";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
// import { mockDataTask } from "./data";
import axios from "axios";

const ListTask = () => {
  const columns = [
    {
      field: "task_id",
      headerName: "Mã công việc",
      headerClassName: "header",
      flex: 1,
    },
    {
      field: "task_name",
      headerName: "Tiêu đề",
      headerClassName: "header",
      flex: 2,
    },
    {
      field: "task_description",
      headerName: "Mô tả công việc",
      headerClassName: "header",

      flex: 3.5,
    },
    // {
    //   field: "customer",
    //   headerClassName: "header",
    //   headerName: "Khách hàng",
    //   flex: 2,
    // },

    {
      field: "someoneDidIt",
      headerName: "Trạng thái",
      headerClassName: "header",
      flex: 1,
    },
  ];

  const [tasks, setTasks] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/Task/getTask")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
                getRowId={(row) => row.statId}
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
                // rows={mockDataTask}
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
