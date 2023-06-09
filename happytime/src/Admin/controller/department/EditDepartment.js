import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate , Link, useParams } from 'react-router-dom';

export default function EditDepartment() {

  let navigate = useNavigate();

  const {id} = useParams();

  const [department, setDepartment] = useState({
    departmentName: ""
  });

  const { departmentName } = department;

  const onInputChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadDepartment();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/Department/getDepartment/${id}`, department);
    navigate("/admin/department");
  };

  const loadDepartment = async () => {
    const result = await axios.get(`http://localhost:8080/Department/getDepartment/${id}`);
    setDepartment(result.data);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2>Edit</h2>
          <form onSubmit={(e) => onSubmit(e)} style={{ display: 'block' }}>
            <div className='"mb-3'>
              <label htmlFor='name' className='form-label d-flex justify-content-center'>
                Department name:
              </label>
              <input
                type={'text'}
                className='form-control text-center'
                placeholder='For example: Front-end'
                name='departmentName'
                value={departmentName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="d-flex justify-content-center">
            <button type='submit' className='btn btn-outline-primary mt-2'>Edit</button>
            <Link className='btn btn-outline-danger mx-2 mt-2' to="/admin/department">Cancel</Link>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

