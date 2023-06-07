import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function AddTask() {
    const [customers, setCustomers] = useState(null)

    const [users, setUsers] = useState(null)

    useEffect(() => {
        GetUser();
    }, []);

    const GetUser = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/auth/UserCol/getUser");
        setUsers(result.data);
    };

    useEffect(() => {
        GetCustomer();
    }, []);

    const GetCustomer = async () => {
        const result = await axios.get("http://localhost:8080/customer/getCustomer")
        setCustomers(result.data);
    }

    let navigate = useNavigate();

    const [task, setTask] = useState({
        task_name: "",
        task_description: "",
        task_start: "",
        task_end: "",
        extension_time: "",
        someoneDidIt: false,
        user_creTask: {
            user_id: 0,
            role: ""
        },
        customer: {
            customer_id: "",
            customerName: ""
        },
    });

    const { task_name, task_description, task_start, task_end, extension_time, someoneDidIt, user_creTask, customer } = task;


    const onInputChange = (e) => {
        if (e.target.name === "customer_id") {
            const selectedCustomer = customers.find(
                (customer) => customer.customer_id === parseInt(e.target.value)
            );
            setTask({
                ...task,
                customer: {
                    customer_id: parseInt(e.target.value),
                    customerName: selectedCustomer.customerName,
                },
            });
        } else if (e.target.name === "user_id") {
            const selectedUser = users.find(
                (user) => user.user_id === parseInt(e.target.value)
            );
            setTask({
                ...task,
                user_creTask: {
                    user_id: parseInt(e.target.value),
                    user_fullName: selectedUser.user_fullName,
                    role: selectedUser.role
                },
            });
        } else {
            setTask({ ...task, [e.target.name]: e.target.value });
        }

    };


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/Task/add", task);
            navigate("/admin/task");
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert('Error');
            } else {
                alert('An error occurred. Please try again.');
            }
        }

    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2>Thêm công việc</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="task_name" className="form-label">
                                        Tên công việc:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="Ví dụ: Make website"
                                        name="task_name"
                                        value={task_name}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="customer" className="form-label">
                                        Khách hàng:
                                    </label>
                                    <select
                                        className="form-control text-center"
                                        name="customer_id"
                                        value={customer.customer_id}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    >
                                        <option value="">Chọn khách hàng</option>
                                        {customers?.map((list_customer) => (
                                            <option
                                                key={list_customer.customer_id}
                                                value={list_customer?.customer_id}
                                            >
                                                {list_customer?.customerName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='col-md-12'>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Mô tả:
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="Ví dụ: Create website with Navbar and Sidebar..."
                                        name="task_description"
                                        value={task_description}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="birthdate" className="form-label">
                                        Ngày bắt đầu:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control text-center"
                                        name="task_start"
                                        value={task_start}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>



                                <div className="mb-3">
                                    <label htmlFor="extensiontime" className="form-label">
                                        Kéo dài thời hạn:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control text-center"
                                        name="extension_time"
                                        value={extension_time}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>
                            </div>

                            <div className='col-md-6'>

                                <div className="mb-3">
                                    <label htmlFor="deadline" className="form-label">
                                        Deadline:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control text-center"
                                        name="task_end"
                                        value={task_end}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="user_creTask" className="form-label">
                                        Người tạo:
                                    </label>
                                    <select
                                        className="form-control text-center"
                                        name="user_id"
                                        value={user_creTask.user_id}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    >
                                        <option value="" disabled>Chọn người giao</option>
                                        {users?.map((list_user) => (
                                            <option
                                                key={list_user.user_id}
                                                value={list_user?.user_id}
                                            >
                                                {list_user?.user_fullName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>



                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-outline-primary mt-2">
                                    Thêm
                                </button>
                                <Link
                                    className="btn btn-outline-danger mx-2 mt-2"
                                    to="/admin/task"
                                >
                                    Hủy
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}
