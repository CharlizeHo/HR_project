import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./task_style.css";

export default function Task() {
  const [tasks, setTasks] = useState(null);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTaskIdForAssign, setSelectedTaskIdForAssign] = useState(null);


  const { id } = useParams();
  const [users, setUsers] = useState(null)

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/auth/UserCol/getUser");
    setUsers(result.data);
  };
  useEffect(() => {
    GetTask();
  }, []);

  const GetTask = async () => {
    const result = await Axios.get("http://localhost:8080/Task/getTask");
    setTasks(result.data);
    console.log(tasks);
  };

  const [userTask, setuserTask] = useState({
    task: {
      task_id: 0
    },
    user:{
      user_id: 0
    }
  })

  const {task, user} = userTask;
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/Task/deleteTask/${id}`);
    GetTask();
  };

  const handleDeleteClick = (id) => {
    setSelectedTaskId(id);
    setShowDeleteConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(selectedTaskId);
    setShowDeleteConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmDialog(false);
  };

  const handleAssignClick = (id) => {
    setSelectedTaskIdForAssign(id);
    setuserTask({
      ...userTask,
      task: {
        task_id: id
      }
    })
    setShowAssignDialog(true);
  };


  const handleAssignTask = async () => {
    console.log(userTask);
    try {
      await axios.post("http://localhost:8080/userTask/add", userTask);
      alert('success');
  } catch (error) {
      if (error.response && error.response.status === 500) {
          alert('Error');
      } else {
          alert('An error occurred. Please try again.');
      }
  }
    setShowAssignDialog(false);
  };

  const handleCancelAssign = () => {
    setShowAssignDialog(false);
  };

  const onInputChange = (e) => {
 if (e.target.name === "user_id") {
        setuserTask({
            ...userTask,
            user: {
                user_id: parseInt(e.target.value)
            },
        });
    }  else {
        setuserTask({ ...userTask, [e.target.name]: e.target.value });
    }
};

  return (
    <div className='container container-task'>
      <h2>Quản lý công việc</h2>
      <div style={{ float: "right", marginBottom: "10px" }}>
        <Link className='btn btn-add btn-primary' to="/admin/task/add">+Thêm</Link>
      </div>

      <table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên công việc</th>
            <th scope="col">Mô tả công việc</th>
            <th scope="col">Khách hàng</th>
            <th scope="col">Ngày bắt đầu</th>
            <th scope="col">Ngày kết thúc</th>
            <th scope="col">Thời gian thêm</th>
            <th scope='col'>Người giao</th>
            <th scope="col">Thao tác</th>
            <th scope='col'>Phân công</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.task_id}>
              <td>{task?.task_id}</td>
              <td>{task?.task_name}</td>
              <td>{task?.task_description}</td>
              <td>{task?.customer.customerName}</td>
              <td>{task?.task_start}</td>
              <td>{task?.task_end}</td>
              <td>{task?.extension_time}</td>
              <td>{task?.user_creTask.user_fullName}</td>
              <td>
                <Link className="btn btn-edit btn-success mx-2" to={`/admin/task/edittask/${task?.task_id}`}>Sửa</Link>/
                <button type="button" className="btn btn-delete btn-danger mx-2" onClick={() => handleDeleteClick(task?.task_id)}>Xóa</button>
              </td>
              <td>
                <button className='btn btn-dotask btn-info' style={{ color: "#FFF" }} onClick={() => handleAssignClick(task?.task_id)}>Phân công</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn xóa công việc này?</p>
            <div>
              <button className='btn btn-confirm btn-danger' onClick={handleConfirmDelete}>Xóa</button>
              <button className='btn btn-cancel btn-secondary' onClick={handleCancelDelete}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {showAssignDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Phân công</h3>
            <label>Tên công việc:</label>
            <input
              type="text"
              className="form-control text-center"
              name="task_id"
              value={selectedTaskIdForAssign ? tasks.find((task) => task.task_id === selectedTaskIdForAssign)?.task_name : ''}
              disabled
              required
            />



            <label>Chọn người làm:</label>
            <select className="form-select" aria-label="Người phân công" name = "user_id" value={user.user_id} onChange={(e) => onInputChange(e)}>
              {
                users?.map((list_user) => (
                  <option
                    key={list_user.user_id}
                    value={list_user?.user_id}
                  >
                    {list_user?.user_fullName}
                  </option>
                ))
              }
            </select>
            <div>
              <button className='btn btn-confirm btn-primary mt-2' onClick={() => handleAssignTask(selectedTaskIdForAssign)}>Phân công</button>
              <button className='btn btn-cancel btn-secondary mt-2' onClick={handleCancelAssign}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
