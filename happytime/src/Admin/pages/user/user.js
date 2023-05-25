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
      <h2>Quản lý người dùng</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="filter-container d-flex">
            <label htmlFor="filter" style={{ alignSelf: "bottom"}}>Hiển thị:</label>
            <select id="filter" className="form-select mx-3 w-50" value={filterOption} onChange={handleFilterChange}>
              <option value="Tất cả">Tất cả</option>
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Không hoạt động">Không hoạt động</option>
            </select>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <Link className='btn btn-add btn-primary' to="/admin/user/add">+ Thêm</Link>
        </div>
      </div>
      
      <table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Email</th>
            {/* <th scope="col">Mật khẩu</th> */}
            <th scope="col">Phòng ban</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers()?.map((user) => (
            <tr key={user.user_id}>
              <td>{user?.user_id}</td>
              <td>{user?.username}</td>
              <td>{user?.user_birthdate}</td>
              <td>{user?.user_gender}</td>
              <td>{user?.user_address}</td>
              <td>{user?.user_phonenum}</td>
              <td>{user?.user_email}</td>
              {/* <td>{user?.password}</td> */}
              <td>{user?.department.id}</td>
              <td>
                {user?.user_isActivity ? (
                  <span className="badge rounded-pill text-bg-success">Đang hoạt động</span>
                ) : (
                  <span className="badge rounded-pill text-bg-secondary">Không hoạt động</span>
                )}
              </td>
              <td>
                <Link className="btn btn-edit btn-success mx-2" to={`/admin/user/edituser/${user?.user_id}`}>
                  Sửa
                </Link>
                /
                <button
                  type="button"
                  className="btn btn-delete btn-danger mx-2"
                  onClick={() => deleteUser(user?.user_id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
