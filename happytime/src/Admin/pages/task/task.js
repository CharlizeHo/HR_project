// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import "./task_style.css";

// export default function Task() {
//   const [tasks, setTasks] = useState(null);
//   const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
//   const [showAssignDialog, setShowAssignDialog] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [selectedTaskIdForAssign, setSelectedTaskIdForAssign] = useState(null);
//   const [users, setUsers] = useState(null);
//   const [userTask, setuserTask] = useState({
//     task: {
//       task_id: 0
//     },
//     user: {
//       user_id: 0,
//       role: ""
//     }
//   });
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);

//   const { id } = useParams();
//   const {task, user} = userTask;

//   useEffect(() => {
//     GetUser();
//     GetTask();
//   }, []);

//   const GetUser = async () => {
//     const result = await axios.get("http://localhost:8080/api/v1/auth/UserCol/getUser");
//     setUsers(result.data);
//   };

//   const GetTask = async () => {
//     const result = await Axios.get("http://localhost:8080/Task/getTask");
//     setTasks(result.data);
//   };

//   const deleteTask = async (id) => {
//     const isTaskAssigned = tasks.find((task) => task.task_id === id && task.user_id !== null);
//     if (isTaskAssigned) {
//       alert("Cannot delete because this task is currently assigned to an employee!");
//       return;
//     }
  
//     await axios.delete(`http://localhost:8080/Task/deleteTask/${id}`);
//     GetTask();
//   };

//   const handleDeleteClick = (id) => {
//     setSelectedTaskId(id);
//     setShowDeleteConfirmDialog(true);
//   };

//   const handleConfirmDelete = () => {
//     deleteTask(selectedTaskId);
//     setShowDeleteConfirmDialog(false);
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteConfirmDialog(false);
//   };

//   const handleAssignClick = (id) => {
//     setSelectedTaskIdForAssign(id);
//     setuserTask({
//       ...userTask,
//       task: {
//         task_id: id
//       }
//     });
//     setShowAssignDialog(true);
//   };

//   const checkDuplicateAssignment = async () => {
//     try {
//       const result = await axios.get("http://localhost:8080/userTask/getAll");
//       const existingAssignments = result.data;
//       const isDuplicate = existingAssignments.some(
//         (assignment) =>
//           assignment.task.task_id === selectedTaskIdForAssign &&
//           assignment.user.user_id === user.user_id
          
//       );
//       return isDuplicate;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   const handleAssignTask = async () => {
//     const isDuplicate = await checkDuplicateAssignment();
//     if (isDuplicate) {
//       setShowErrorMessage(true);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8080/userTask/add", userTask);
//       setShowSuccessMessage(true);
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         alert('Error');
//       } else {
//         alert('An error occurred. Please try again.');
//       }
//     }
//     setShowAssignDialog(false);
//   };

//   const handleCancelAssign = () => {
//     setShowAssignDialog(false);
//   };

//   const onInputChange = (e) => {
//     if (e.target.name === "user_id") {
//       const selectedUser = users.find(
//         (user) => user.user_id === parseInt(e.target.value)
//       );
//       setuserTask({
//         ...userTask,
//         user: {
//           user_id: parseInt(e.target.value),
//           role: selectedUser.role
//         },
//       });
//     } else {
//       setuserTask({ ...userTask, [e.target.name]: e.target.value });
//     }
//   };

//   useEffect(() => {
//     let timer;
//     if (showSuccessMessage) {
//       timer = setTimeout(() => {
//         setShowSuccessMessage(false);
//       }, 3000);
//     }
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [showSuccessMessage]);

//   return (
//     <div className='container container-task'>
//       <h2>Task Management</h2>
//       <div style={{ float: "right", marginBottom: "10px" }}>
//         <Link className='btn btn-add btn-primary' to="/admin/task/add">+Add</Link>
//       </div>

//       {showSuccessMessage && (
//         <div className="float-message success-message">
//           Assign successfully!
//         </div>
//       )}

//       {showErrorMessage && (
//         <div className="float-message error-message">
//           This task has already been assigned to this employee.
//         </div>
//       )}

//       <table className="table table-striped table-hover shadow">
//         <thead>
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Task name</th>
//             <th scope="col">Task description</th>
//             <th scope="col">Customer</th>
//             <th scope="col">Start date</th>
//             <th scope="col">Deadline</th>
//             <th scope="col">Extension time</th>
//             <th scope='col'>Created by</th>
//             <th scope="col">Operation</th>
//             <th scope='col'>Assign to</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks?.map((task) => (
//             <tr key={task.task_id}>
//               <td>{task?.task_id}</td>
//               <td>{task?.task_name}</td>
//               <td>{task?.task_description}</td>
//               <td>{task?.customer.customerName}</td>
//               <td>{task?.task_start}</td>
//               <td>{task?.task_end}</td>
//               <td>{task?.extension_time}</td>
//               <td>{task?.user_creTask.user_fullName}</td>
//               <td>
//                 <Link className="btn btn-edit btn-success mx-2" to={`/admin/task/edittask/${task?.task_id}`}>Edit</Link>/
//                 <button type="button" className="btn btn-delete btn-danger mx-2" onClick={() => handleDeleteClick(task?.task_id)}>Delete</button>
//               </td>
//               <td>
//                 <button className='btn btn-dotask btn-info' style={{ color: "#FFF" }} onClick={() => handleAssignClick(task?.task_id)}>Assign</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showDeleteConfirmDialog && (
//         <div className='modal-overlay'>
//           <div className='modalContainer'>
//             <h3>Confirm</h3>
//             <p>Are you sure you want to delete this task?</p>
//             <button className='btn btn-confirm btn-danger' onClick={handleConfirmDelete}>Delete</button>
//             <button className='btn btn-cancel' onClick={handleCancelDelete}>Cancel</button>
//           </div>
//         </div>
//       )}

//        {showAssignDialog && (
//         <div className='modal-overlay'>
//           <div className='modalContainer'>
//             <h3>Assign</h3>
//             <label>Task name:</label>
//             <input
//               type="text"
//               className="form-control text-center"
//               name="task_id"
//               value={selectedTaskIdForAssign ? tasks.find((task) => task.task_id === selectedTaskIdForAssign)?.task_name : ''}
//               disabled
//               required
//             />

//             <label>Assign to:</label>
//             <select className="form-select" aria-label="Người phân công" name="user_id" value={user.user_id} onChange={(e) => onInputChange(e)}>
//               {users?.map((list_user) => (
//                 <option
//                   key={list_user.user_id}
//                   value={list_user?.user_id}
//                 >
//                   {list_user?.user_fullName}
//                 </option>
//               ))}
//             </select>
//             <div>
//               <button className='btn btn-confirm btn-primary mt-2' onClick={() => handleAssignTask(selectedTaskIdForAssign)}>Assign</button>
//               <button className='btn btn-cancel btn-secondary mt-2' onClick={handleCancelAssign}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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

  const { id } = useParams();
  const {task, user} = userTask;

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
      setShowAssignDialog(false);
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

  return (
    <div className='container container-task'>
      <h2>Task Management</h2>
      <div style={{ float: "right", marginBottom: "10px" }}>
        <Link className='btn btn-add btn-primary' to="/admin/task/add">+Add</Link>
      </div>

      {showSuccessMessage && (
        <div className="float-message success-message">
          Assign successfully!
        </div>
      )}

      {showErrorMessage && (
        <div className="float-message error-message">
          {errorMessage}
        </div>
      )}

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
                <Link className="btn btn-edit btn-success mx-2" to={`/admin/task/edittask/${task?.task_id}`}>Edit</Link>/
                <button type="button" className="btn btn-delete btn-danger mx-2" onClick={() => handleDeleteClick(task?.task_id)}>Delete</button>
              </td>
              <td>
                <button className='btn btn-dotask btn-info' style={{ color: "#FFF" }} onClick={() => handleAssignClick(task?.task_id)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Confirmation</h3>
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

    </div>
  );
}
