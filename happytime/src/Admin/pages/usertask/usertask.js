import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function UserTask() {
  const [usertasks, setUsertasks] = useState(null);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [showCompleteConfirmDialog, setShowCompleteConfirmDialog] = useState(false);
  const [showFailConfirmDialog, setShowFailConfirmDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [filterState, setFilterState] = useState('');
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFullNameQuery, setSearchFullNameQuery] = useState('');


  const { id } = useParams();

  useEffect(() => {
    GetUsertask();
  }, []);

  const GetUsertask = async () => {
    const result = await axios.get("http://localhost:8080/userTask/getAll");
    setUsertasks(result.data);
    const completedTasks = result.data.filter(task => task.state === "Finish" || task.state === "Late" || task.state === "Fail");
    const completedTaskIds = completedTasks.map(task => task.userTaskId);
    setCompletedTaskIds(completedTaskIds);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/userTask/deleteUserTask/${id}`);
    GetUsertask();
  };

  const confirmTask = async (id) => {
    await axios.post(`http://localhost:8080/userTask/submit-task/${id}`);
    GetUsertask();
  };

  const failTask = async (id) => {
    await axios.post(`http://localhost:8080/userTask/fail-task/${id}`);
    GetUsertask();
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

  const handleTaskCompleteClick = (id) => {
    setSelectedTaskId(id);
    setShowCompleteConfirmDialog(true);
    setIsTaskCompleted(false);
  };

  const handleCompleteConfirm = () => {
    confirmTask(selectedTaskId);
    setShowCompleteConfirmDialog(false);
    setIsTaskCompleted(true);
    window.location.reload(true);
  };

  const handleCancelComplete = () => {
    setShowCompleteConfirmDialog(false);
  };

  const handleTaskFailClick = (id) => {
    setSelectedTaskId(id);
    setShowFailConfirmDialog(true);
    setIsTaskCompleted(false);
  };

  const handleFailConfirm = () => {
    failTask(selectedTaskId);
    setShowFailConfirmDialog(false);
    setIsTaskCompleted(true);
    window.location.reload(true);
  };

  const handleCancelFail = () => {
    setShowFailConfirmDialog(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFullNameSearchChange = (e) => {
    setSearchFullNameQuery(e.target.value);
    setCurrentPage(1);
  };

  const getBadgeClass = (state) => {
    switch (state) {
      case "Finish":
        return "badge rounded-pill bg-success";
      case "Doing":
        return "badge rounded-pill bg-primary";
      case "Late":
        return "badge rounded-pill bg-warning";
      case "Fail":
        return "badge rounded-pill bg-danger";
      case "Waiting":
        return "badge rounded-pill bg-secondary";
      default:
        return "badge rounded-pill bg-light";
    }
  };

  const handleFilterChange = (e) => {
    setFilterState(e.target.value);
    setCurrentPage(1);
  };

  const filteredTasks = filterState
    ? usertasks?.filter(task => task.state === filterState)
    : usertasks;

  const searchedTasks = searchQuery
    ? filteredTasks?.filter(task =>
      task.task.task_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : filteredTasks;

  const searchedFullNameTasks = searchFullNameQuery
    ? searchedTasks?.filter(task =>
      task.user.user_fullName.toLowerCase().includes(searchFullNameQuery.toLowerCase())
    )
    : searchedTasks;
  const indexOfLastTask = currentPage * rowsPerPage;
  const indexOfFirstTask = indexOfLastTask - rowsPerPage;
  const currentTasks = searchedFullNameTasks?.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(searchedFullNameTasks?.length / rowsPerPage);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className='container container-task'>
      <h2>Assigned Task Management</h2>

      <div className="filter filter-container d-flex" style={{ marginTop: "30px" }}>
        <label htmlFor="filterState">Show:</label>
        <select
          id="filterState"
          className="form-select mx-3"
          style={{ maxWidth: "13%" }}
          value={filterState}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Finish">Finish</option>
          <option value="Doing">Doing</option>
          <option value="Late">Late</option>
          <option value="Fail">Fail</option>
          {/* <option value="Waiting">Waiting</option> */}
        </select>

        <div>
          <input
            type="text"
            className="search-input"
            placeholder="Search by task name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <i className="fa fa-search"></i>
        </div>

        <div className='mx-4'>
          <input
            type="text"
            className="search-input"
            placeholder="Search by person-in-charge"
            value={searchFullNameQuery}
            onChange={handleFullNameSearchChange}
          />
          <i className="fa fa-search"></i>
        </div>
      </div>

      <table className="table table-striped table-hover shadow" style={{ marginTop: "30px" }}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Task name</th>
            <th scope="col">Task description</th>
            <th scope="col">Person-in-charge</th>
            <th scope="col">Deadline</th>
            <th scope="col">Time finished</th>
            <th scope="col">State</th>
            <th scope="col">Completion</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks?.map((usertask) => (
            <tr key={usertask.userTaskId}>
              <td>{usertask?.userTaskId}</td>
              <td>{usertask?.task.task_name}</td>
              <td>{usertask?.task.task_description}</td>
              <td>{usertask?.user.user_fullName}</td>
              <td>{usertask?.task.task_end}</td>
              <td>{usertask?.time_finished}</td>
              <td>
                {usertask?.state && (
                  <span className={`badge rounded-pill ${getBadgeClass(usertask.state)}`}>
                    {usertask.state}
                  </span>
                )}
              </td>

              <td>
                <button
                  type="button"
                  className="btn btn-success mx-2"
                  onClick={() => handleTaskCompleteClick(usertask?.userTaskId)}
                  disabled={completedTaskIds.includes(usertask?.userTaskId) || isTaskCompleted}
                >
                  <i className='fa fa-check'></i>
                </button>
                /
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => handleTaskFailClick(usertask?.userTaskId)}
                  disabled={completedTaskIds.includes(usertask?.userTaskId) || isTaskCompleted}
                >
                  <i className='fa fa-xmark'></i>
                </button>
              </td>

              <td>
                <button
                  type="button"
                  className="btn btn-delete btn-danger mx-2"
                  onClick={() => handleDeleteClick(usertask?.userTaskId)}
                >
                  <i className='fa fa-trash'></i>
                </button>
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
            <p>Are you sure to delete this task?</p>
            <div>
              <button className='btn btn-confirm btn-danger' onClick={handleConfirmDelete}>Delete</button>
              <button className='btn btn-cancel btn-secondary' onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showCompleteConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Confirm</h3>
            <p>Are you sure to complete this task?</p>
            <div>
              <button className='btn btn-confirm btn-success' onClick={handleCompleteConfirm}>Complete</button>
              <button className='btn btn-cancel btn-secondary' onClick={handleCancelComplete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showFailConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Confirm</h3>
            <p>Are you sure to fail this task?</p>
            <div>
              <button className='btn btn-confirm btn-danger' onClick={handleFailConfirm}>Yes</button>
              <button className='btn btn-cancel btn-secondary' onClick={handleCancelFail}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
