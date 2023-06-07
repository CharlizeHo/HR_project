import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./user_style.css";

export default function User() {
  const [users, setUsers] = useState(null);
  const [filterOption, setFilterOption] = useState("Tất cả");

  const { id } = useParams();

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    const result = await Axios.get("http://localhost:8080/api/v1/auth/UserCol/getUser");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/auth/UserCol/delUser/${id}`);
    GetUser();
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filterUsers = () => {
    switch (filterOption) {
      case "Tất cả":
        return users;
      case "Đang hoạt động":
        return users?.filter((user) => user.user_isActivity === true);
      case "Không hoạt động":
        return users?.filter((user) => user.user_isActivity === false);
      default:
        return users;
    }
  };

  return (
    <div className='container'>
      <h2>User Management</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="filter-container d-flex">
            <label htmlFor="filter" style={{ alignSelf: "bottom"}}>Show:</label>
            <select id="filter" className="form-select mx-3 w-50" value={filterOption} onChange={handleFilterChange}>
              <option value="Tất cả">All</option>
              <option value="Đang hoạt động">Active</option>
              <option value="Không hoạt động">Inactive</option>
            </select>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <Link className='btn btn-add btn-primary' to="/admin/user/add">+ Add</Link>
        </div>
      </div>
      
      <table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope='col'>Username</th>
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
          {filterUsers()?.map((user) => (
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
              <td>{user?.department.id}</td>
              <td>
                {user?.user_isActivity ? (
                  <span className="badge rounded-pill text-bg-success">Active</span>
                ) : (
                  <span className="badge rounded-pill text-bg-secondary">Inactive</span>
                )}
              </td>
              <td>
                <Link className="btn btn-edit btn-success mx-2" to={`/admin/user/edituser/${user?.user_id}`}>
                  Edit
                </Link>
                /
                <button
                  type="button"
                  className="btn btn-delete btn-danger mx-2"
                  onClick={() => deleteUser(user?.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
