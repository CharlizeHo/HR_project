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
  const [users, setUsers] = useState(null);
  const [userTask, setuserTask] = useState({
    task: {
      task_id: 0
    },
    user: {
      user_id: 0,
      role: ""
    }
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");
  const [startDateFilter, setStartDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;


  const { id } = useParams();
  const { task, user } = userTask;

  useEffect(() => {
    GetUser();
    GetTask();
  }, []);

  const GetUser = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/auth/UserCol/getUser");
    setUsers(result.data);
  };

  const GetTask = async () => {
    const result = await Axios.get("http://localhost:8080/Task/getTask");
    setTasks(result.data);
  };

  const deleteTask = async (id) => {
    const isTaskAssigned = tasks.find((task) => task.task_id === id && task.user_id !== null);
    if (isTaskAssigned) {
      alert("Cannot delete because this task is currently assigned to an employee!");
      return;
    }

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
    });
    setShowAssignDialog(true);
  };

  const checkDuplicateAssignment = async () => {
    try {
      const result = await axios.get("http://localhost:8080/userTask/getAll");
      const existingAssignments = result.data;
      const isDuplicate = existingAssignments.some(
        (assignment) =>
          assignment.task.task_id === selectedTaskIdForAssign &&
          assignment.user.user_id === user.user_id
      );
      if (isDuplicate) {
        setErrorMessage("This task has already been assigned to this employee.");
      } else {
        setErrorMessage('');
      }
      return isDuplicate;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleAssignTask = async () => {
    const isDuplicate = await checkDuplicateAssignment();
    if (isDuplicate) {
      // setShowAssignDialog(false);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      return;
    }

    try {
      await axios.post("http://localhost:8080/userTask/add", userTask);
      setShowSuccessMessage(true);
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
      const selectedUser = users.find(
        (user) => user.user_id === parseInt(e.target.value)
      );
      setuserTask({
        ...userTask,
        user: {
          user_id: parseInt(e.target.value),
          role: selectedUser.role
        },
      });
    } else if (e.target.name === "customer_name") {
      setCustomerQuery(e.target.value);
      setCurrentPage(1);
    } else {
      setuserTask({ ...userTask, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessMessage]);

  const filteredTasks = tasks?.filter(
    (task) =>
      task?.task_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      task?.customer.customerName.toLowerCase().includes(customerQuery.toLowerCase()) &&
      (startDateFilter === '' || task?.task_start.includes(startDateFilter))
  );

  const indexOfLastTask = currentPage * rowsPerPage;
  const indexOfFirstTask = indexOfLastTask - rowsPerPage;
  const currentTasks = filteredTasks?.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks?.length / rowsPerPage);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className='container container-task'>
      <h2>Task Management</h2>


      {showSuccessMessage && (
        <div className="float-message success-message">
          Assign successfully!
        </div>
      )}

      <div className="search-container" style={{ marginTop: "30px" }}>
        <div>
          <label>Start Date: </label>
          <input
            type="date"
            placeholder="Filter by start date"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
            className="search-input mx-2"
            style={{maxWidth: "190px"}}
          />
        </div>
        <div style={{marginLeft: "-330px"}}> 
          <input
            type="text"
            placeholder="Search by task name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-input'
          />
          <i className="fa fa-search"></i>
        </div>
        <div  style={{marginLeft: "-310px"}}>
          <input
            type="text"
            placeholder="Search by customer name"
            value={customerQuery}
            onChange={(e) => onInputChange(e)}
            className="search-input"
            name="customer_name"
          />
          <i className="fa fa-search"></i>
        </div>

        <Link className='btn btn-add btn-primary' to="/admin/task/add">+ <i class="fas fa-tasks"></i></Link>
      </div>

      <table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Task name</th>
            <th scope="col">Task description</th>
            <th scope="col">Customer</th>
            <th scope="col">Start date</th>
            <th scope="col">Deadline</th>
            <th scope="col">Extension time</th>
            <th scope='col'>Created by</th>
            <th scope="col">Operation</th>
            <th scope='col'>Assign to</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks?.map((task) => (
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
                <Link className="btn btn-edit btn-success mx-2" to={`/admin/task/edittask/${task?.task_id}`}><i className='fa fa-pen'></i></Link>/
                <button type="button" className="btn btn-delete btn-danger mx-2" onClick={() => handleDeleteClick(task?.task_id)}><i className='fa fa-trash'></i></button>
              </td>
              <td>
                <button className='btn btn-dotask btn-info' style={{ color: "#FFF" }} onClick={() => handleAssignClick(task?.task_id)}><i className='fa fa-user-pen'></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {showDeleteConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Confirm</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className='modal-buttons'>
              <button className='btn btn-delete btn-danger' onClick={handleConfirmDelete}>Delete</button>
              <button className='btn btn-cancel btn-secondary' onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAssignDialog && (
        <div className="modal-overlay">
          <div className="modalContainer">
            <h3>Assign</h3>
            <label>Task name:</label>
            <input
              type="text"
              className="form-control text-center"
              name="task_id"
              value={
                selectedTaskIdForAssign
                  ? tasks.find((task) => task.task_id === selectedTaskIdForAssign)
                    ?.task_name
                  : ""
              }
              disabled
              required
            />

            <label>Assign to:</label>
            <select
              className="form-select"
              aria-label="Người phân công"
              name="user_id"
              value={user.user_id}
              onChange={(e) => onInputChange(e)}
            >
              {users?.map((list_user) => (
                <option key={list_user.user_id} value={list_user?.user_id}>
                  {list_user?.user_fullName}
                </option>
              ))}
            </select>
            <div>
              <button
                className="btn btn-confirm btn-primary mt-2"
                onClick={() => handleAssignTask(selectedTaskIdForAssign)}
              >
                Assign
              </button>
              <button
                className="btn btn-cancel btn-secondary mt-2"
                onClick={handleCancelAssign}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showErrorMessage && (
        <div className="float-message error-message">{errorMessage}</div>
      )}
    </div>
  );
}
