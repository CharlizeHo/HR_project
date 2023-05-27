import React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { mockDataTask } from "./data";

const ListTaskTable = () => {
  const columns = [
    {
      field: "id",
      headerName: "Mã task",
      headerClassName: "header",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      headerClassName: "header",
      flex: 2,
    },
    {
      field: "description",
      headerName: "Mô tả công việc",
      headerClassName: "header",

      flex: 3.5,
    },
    {
      field: "customer",
      headerClassName: "header",
      headerName: "Khách hàng",
      flex: 2,
    },

    {
      field: "state",
      headerName: "Trạng thái",
      headerClassName: "header",
      flex: 1,
    },

    {
      field: "department",
      headerName: "Phòng ban",
      headerClassName: "header",
      flex: 1,
    },
  ];
  return (
    <div>
      {/* Layout */}
      <div
        className="mt-2 mx-3"
        style={{ maxHeight: "400px", overflowX: "scroll" }}
      >
        <DataGrid
          getRowHeight={() => "auto"}
          initialState={{
            pagination: { paginationModel: { pageSize: 4 } },
          }}
          rows={mockDataTask}
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
  );
};

export default ListTaskTable;
