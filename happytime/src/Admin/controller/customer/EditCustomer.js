import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';

export default function EditCustomer() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [customer, setCustomer] = useState({
        customerName: "",
        customer_phonenum: "",
        customer_address: ""
    });

    const { customerName, customer_phonenum, customer_address } = customer;

    const onInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadCustomer();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/customer/getCustomer/${id}`, customer);
        navigate("/admin/customer");
    };

    const loadCustomer = async () => {
        const result = await axios.get(`http://localhost:8080/customer/getCustomer/${id}`);
        setCustomer(result.data);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2>Edit customer</h2>
                    <form onSubmit={(e) => onSubmit(e)} style={{display: "block"}}>
                        <div className='"mb-3'>
                            <label htmlFor='name' className='form-label'>
                                Customer name:
                            </label>
                            <input
                                type={'text'}
                                className='form-control text-center'
                                placeholder='For example: VTI'
                                name='customerName'
                                value={customerName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='"mb-3'>
                            <label htmlFor='phonenum' className='form-label'>
                                Phone number:
                            </label>
                            <input
                                type={'text'}
                                className='form-control text-center'
                                placeholder='For example: 0123456789'
                                name='customer_phonenum'
                                value={customer_phonenum}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='"mb-3'>
                            <label htmlFor='address' className='form-label'>
                                Address:
                            </label>
                            <input
                                type={'text'}
                                className='form-control text-center'
                                placeholder='For example: Ho Chi Minh City'
                                name='customer_address'
                                value={customer_address}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                        <button type='submit' className='btn btn-outline-primary mt-2'>Edit</button>
                        <Link className='btn btn-outline-danger mx-2 mt-2' to="/admin/customer">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

