import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './user_style.css';

export default function User() {
  const [users, setUsers] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filterOption, setFilterOption] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const { id } = useParams();

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    const result = await Axios.get('http://localhost:8080/api/v1/auth/UserCol/getUser');
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/auth/UserCol/delUser/${id}`);
    GetUser();
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterUsers = () => {
    let filteredUsers = users;

    switch (filterOption) {
      case 'Tất cả':
        break;
      case 'Đang hoạt động':
        filteredUsers = filteredUsers.filter((user) => user.user_isActivity === true);
        break;
      case 'Không hoạt động':
        filteredUsers = filteredUsers.filter((user) => user.user_isActivity === false);
        break;
      default:
        break;
    }

    if (searchQuery) {
      filteredUsers = filteredUsers.filter((user) =>
        user.user_fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredUsers;
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filterUsers()?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(selectedUserId);
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="filter-container d-flex">
            <label htmlFor="filter" style={{ alignSelf: 'bottom' }}>
              Show:
            </label>
            <select
              id="filter"
              className="form-select mx-3 w-50"
              value={filterOption}
              onChange={handleFilterChange}
            >
              <option value="Tất cả">All</option>
              <option value="Đang hoạt động">Active</option>
              <option value="Không hoạt động">Inactive</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="fa fa-search search-icon"></i>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <Link className="btn btn-add btn-primary" to="/admin/user/add">
          <i className="fa-solid fa-user-plus"></i>
          </Link>
        </div>
      </div>

      <table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Full name</th>
            <th scope="col">Birthdate</th>
            <th scope="col">Gender</th>
            <th scope="col">Address</th>
            <th scope="col">Phone number</th>
            <th scope="col">Email</th>
            {/* <th scope="col">Mật khẩu</th> */}
            <th scope="col">Department</th>
            <th scope="col">State</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((user) => (
            <tr key={user.user_id}>
              <td>{user?.user_id}</td>
              <td>{user?.username}</td>
              <td>{user?.user_fullName}</td>
              <td>{user?.user_birthdate}</td>
              <td>{user?.user_gender}</td>
              <td>{user?.user_address}</td>
              <td>{user?.user_phonenum}</td>
              <td>{user?.user_email}</td>
              {/* <td>{user?.password}</td> */}
              <td>{user?.department.departmentName}</td>
              <td>
                {user?.user_isActivity ? (
                  <span className="badge rounded-pill text-bg-success">Active</span>
                ) : (
                  <span className="badge rounded-pill text-bg-secondary">Inactive</span>
                )}
              </td>
              <td>
                <Link className="btn btn-edit btn-success mx-2" to={`/admin/user/edituser/${user?.user_id}`}>
                  <i className="fa fa-pen"></i>
                </Link>
                /
                <button
                  type="button"
                  className="btn btn-delete btn-danger mx-2"
                  onClick={() => handleDeleteClick(user?.user_id)}
                >
                  <i className="fa fa-ban"></i>
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
            <p>Are you sure to disable this user?</p>
            <div>
              <button
                className='btn btn-confirm btn-danger'
                onClick={handleConfirmDelete}
              >
                Disable
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

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {users && (
            <>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: Math.ceil(filterUsers()?.length / rowsPerPage) }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(filterUsers()?.length / rowsPerPage) ? 'disabled' : ''
                }`}
              >
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
