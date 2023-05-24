import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./customer_style.css"
export default function Customer() {
  const [customers, setCustomers] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    GetCustomer();
  }, []);

  const GetCustomer = async () => {
    const result = await Axios.get("http://localhost:8080/customer/getCustomer")
    setCustomers(result.data);
  }

  const deleteCustomer = async (id) => {
    await axios.delete(`http://localhost:8080/customer/getCustomer/${id}`)
    GetCustomer();
  }

  const handleDeleteClick = (id) => {
    setSelectedCustomerId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteCustomer(selectedCustomerId);
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className='container container-customer'>
      <h2 >Quản lý khách hàng</h2>
      <div style={{ float: "right", marginBottom: "10px" }}>
        <Link className='btn btn-add btn-primary' to="/admin/customer/add">+Thêm</Link>
      </div>

      <table class="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Ngày chỉnh sửa</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>

          {
            customers?.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer?.customer_id}</td>
                <td>{customer?.customerName}</td>
                <td>{customer?.customer_phonenum}</td>
                <td>{customer?.customer_address}</td>
                <td>{customer?.customer_cre_date}</td>
                <td>{customer?.customer_mod_date}</td>
                <td><Link className="btn btn-edit btn-success mx-2" to={`/admin/customer/editcustomer/${customer?.customer_id}`} >Sửa</Link>
                  /
                  <button type="button" class="btn btn-delete btn-danger mx-2" onClick={() => handleDeleteClick(customer?.customer_id)}>Xóa</button></td>
              </tr>
            ))
          }

        </tbody>
      </table>

      {showConfirmDialog && (
        <div className='modal-overlay'>
          <div className='modalContainer'>
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn xóa khách hàng này?</p>
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
