import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './department_style.css';

export default function Department() {
  const [departments, setDepartments] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    GetDepartment();
  }, []);

  const GetDepartment = async () => {
    const result = await Axios.get('http://localhost:8080/Department/getDepartment');
    setDepartments(result.data);
  };

  const deleteDepartment = async (id) => {
    await axios.delete(`http://localhost:8080/Department/getDepartment/${id}`);
    GetDepartment();
  };

  const sortedDepartments = departments?.sort(
    (a, b) => a.id - b.id
  );

  const handleDeleteClick = (id) => {
    setSelectedDepartmentId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteDepartment(selectedDepartmentId);
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className='container container-department'>
      <h2>Department Management</h2>
      <div style={{ float: 'right', marginBottom: '10px' }}>
        <Link className='btn btn-add btn-primary' to='/admin/department/add'>
        <i class="fa-solid fa-calendar-plus"></i>
        </Link>
      </div>

      <table className='table table-striped table-hover shadow'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Operation</th>
          </tr>
        </thead>
        <tbody>
          {sortedDepartments?.map((department) => (
            <tr key={department.id}>
              <td>{department?.id}</td>
              <td>{department?.departmentName}</td>
              <td>
                <Link
                  className='btn btn-edit btn-success mx-2'
                  to={`/admin/department/editdepartment/${department?.id}`}
                >
                  <i className='fa fa-pen'></i>
                </Link>
                /
                <button
                  type='button'
                  className='btn btn-delete btn-danger mx-2'
                  onClick={() => handleDeleteClick(department?.id)}
                >
                  <i className='fa fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {showConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Confirm</h3>
            <p>Are you sure to delete this department?</p>
            <div>
              <button
                className='btn btn-confirm btn-danger'
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className='btn btn-cancel btn-secondary'
                onClick={handleCancelDelete}
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