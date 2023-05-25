import React from "react";
import Form from "react-bootstrap/Form";
import { Chart } from "react-google-charts";

const StatTable = () => {
  const data = [
    ["Department", "Sớm", "Trễ", "Không hoàn thành"],
    ["Mon", 7, 2, 1],
    ["Tue", 8, 3, 3],
    ["Wed", 6, 2, 2],
    ["Thu", 8, 4, 0],
    ["Fri", 9, 3, 0],
  ];

  const options = {
    title: "Số lượng",
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <div className="stat-container">
      <span style={{ fontWeight: "600", marginRight: "25px" }}>
        Bảng thống kê
      </span>
      <div className="d-flex">
        <Form.Select className="w-50 p-1">
          <option>Phòng ban</option>
          <option value="1">Sales</option>
          <option value="2">IT</option>
          <option value="3">HR</option>
        </Form.Select>
        <input
          type="datetime-local"
          className="w-50 rounded-2 border border-2 "
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ maxWidth: 600, marginTop: "10px" }}>
        <Chart
          chartType="LineChart"
          maxWidth="600px"
          width="480px"
          height="350px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default StatTable;
