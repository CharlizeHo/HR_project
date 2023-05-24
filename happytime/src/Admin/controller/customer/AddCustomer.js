import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';

export default function AddCustomer() {

  let navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerName: "",
    customer_phonenum: "",
    customer_address: ""
  });

  const { customerName, customer_phonenum, customer_address } = customer;

  const onInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/customer/add", customer);
    navigate("/admin/customer");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2>Thêm khách hàng</h2>
          <form onSubmit={(e) => onSubmit(e)} style={{display: "block"}}>
            <div className='"mb-3 '>
              <label htmlFor='name' className='form-label'>
                Tên khách hàng:
              </label>
              <input
                type={'text'}
                className='form-control text-center'
                placeholder='Ví dụ: VTI'
                name='customerName'
                value={customerName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='"mb-3'>
              <label htmlFor='phonenum' className='form-label'>
                Số điện thoại:
              </label>
              <input
                type={'text'}
                className='form-control text-center'
                placeholder='Ví dụ: 0123456789'
                name='customer_phonenum'
                value={customer_phonenum}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='"mb-3'>
              <label htmlFor='address' className='form-label'>
                Địa chỉ:
              </label>
              <input
                type={'text'}
                className='form-control text-center'
                placeholder='Ví dụ: Ho Chi Minh City'
                name='customer_address'
                value={customer_address}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="d-flex justify-content-center">
            <button type='submit' className='btn btn-outline-primary mt-2'>Thêm</button>
            <Link className='btn btn-outline-danger mx-2 mt-2' to="/admin/customer">Hủy</Link>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
