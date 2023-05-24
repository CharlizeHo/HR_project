import React from "react";
import Form from "react-bootstrap/Form";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "./data";

const PreviewTasks = () => {
  const columns = [
    { field: "id", headerName: "#", flex: 1 },
    {
      field: "name",
      headerName: "Nhân viên",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "taskdone",
      headerName: "Hoàn thành",
      flex: 1.5,
    },
  ];
  return (
    <div className="task-container">
      <span style={{ fontWeight: "600", marginRight: "25px" }}>
        Top Nhân Viên
      </span>
      <Form.Select>
        <option>Phòng ban</option>
        <option value="1">Sales</option>
        <option value="2">IT</option>
        <option value="3">HR</option>
      </Form.Select>
      
      <div style={{ height: 350, width: 580, marginTop: "10px" }}>
        <DataGrid
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          rows={mockDataTeam}
          columns={columns}
          width={580}
        />
      </div>
    </div>
  );
};

export default PreviewTasks;
