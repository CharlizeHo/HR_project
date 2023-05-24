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
      <Form.Select style={{ padding: "2px" }}>
        <option>Phòng ban</option>
        <option value="1">Sales</option>
        <option value="2">IT</option>
        <option value="3">HR</option>
      </Form.Select>
      <input type="datetime-local" style={{ marginLeft: "10px" }} />

      <div style={{ marginTop: "10px" }}>
        <Chart
          chartType="LineChart"
          max-width="600px"
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
