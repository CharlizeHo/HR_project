import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./task_style.css"
export default function Task() {
  const [tasks, setTasks] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    GetTask();
  }, []);

  const GetTask = async () => {
    const result = await Axios.get("http://localhost:8080/Task/getTask")
    setTasks(result.data);
    console.log(tasks);
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/Task/deleteTask/${id}`)
    GetTask();
  }

  const handleDeleteClick = (id) => {
    setSelectedTaskId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(selectedTaskId);
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className='container container-task'>
      <h2 >Quản lý công việc</h2>
      <div style={{ float: "right", marginBottom: "10px" }}>
        <Link className='btn btn-add btn-primary' to="/admin/task/add">+Thêm</Link>
      </div>

      <table class="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên công việc</th>
            <th scope="col">Mô tả công việc</th>
            <th scope="col">Khách hàng</th>
            <th scope="col">Ngày bắt đầu</th>
            <th scope="col">Ngày kết thúc</th>
            <th scope="col">Thời gian thêm</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>

          {
            tasks?.map((task) => (
              <tr key={task.task_id}>
                <td>{task?.task_id}</td>
                <td>{task?.task_name}</td>
                <td>{task?.task_description}</td>
                <td>{task?.customer.customer_id}</td>
                <td>{task?.task_start}</td>
                <td>{task?.task_end}</td>
                <td>{task?.extension_time}</td>
                <td><Link className="btn btn-edit btn-success mx-2" to={`/admin/task/edittask/${task?.task_id}`} >Sửa</Link>
                  /
                  <button type="button" class="btn btn-delete btn-danger mx-2" onClick={() => handleDeleteClick(task?.task_id)}>Xóa</button></td>
              </tr>
            ))
          }

        </tbody>
      </table>

      {showConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn xóa công việc này?</p>
            <div>
              <button
                className='btn btn-confirm btn-danger'
                onClick={handleConfirmDelete}
              >
                Xóa
              </button>
              <button
                className='btn btn-cancel btn-secondary'
                onClick={handleCancelDelete}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
