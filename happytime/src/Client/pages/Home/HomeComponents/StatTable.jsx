import React from "react";
import Form from "react-bootstrap/Form";
import { Chart } from "react-google-charts";

const StatTable = () => {
  const data = [
    ["Department", "Finish", "Late", "Fail"],
    ["Mon", 6, 2, 1],
    ["Tue", 5, 3, 0],
    ["Wed", 6, 2, 1],
    ["Thu", 5, 4, 0],
    ["Fri", 3, 3, 0],
  ];

  const options = {
    title: "No. of tasks",
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <div className="stat-container">
      <span style={{ fontWeight: "600" }}>Statistic Chart</span>
      <div className="d-flex mt-2">
        <Form.Select className="w-50 p-1">
          <option>Department</option>
          <option value="1">Department HR</option>
          <option value="2">Department FrontEnd</option>
          <option value="3">Department BackEnd</option>
        </Form.Select>
      </div>
      <div className="ml-lg-4" style={{ maxWidth: 600, marginTop: "10px" }}>
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
