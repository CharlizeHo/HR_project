import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function AddUser() {
    const [customers, setCustomers] = useState(null)
    // const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        GetCustomer();
    }, []);

    const GetCustomer = async () => {
        const result = await axios.get("http://localhost:8080/customer/getCustomer")
        setCustomers(result.data);
    }

    // const toggleShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };


    let navigate = useNavigate();

    const [task, setTask] = useState({
        task_name: "",
        task_description: "",
        task_start: "",
        task_end: "",
        extension_time: "",
        someoneDidIt: false,
        task_cre_person: 1,
        customer: {
            customer_id: "",
            customerName: ""
        },
    });

    const { task_name, task_description, task_start, task_end, extension_time, someoneDidIt, task_cre_person, customer } = task;

    // const [validEmail, setValidEmail] = useState(true);

    // const validateEmail = (email) => {
    //     const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //     return emailPattern.test(email);
    // };

    const onInputChange = (e) => {
        if (e.target.name === "customer_id") {
            const selectedCustomer = customer.find(
                (customer) => customer.customer_id === parseInt(e.target.value)
            );
            setTask({
                ...task,
                customer: {
                    customer_id: parseInt(e.target.value),
                    customerName: selectedCustomer.customerName,
                },
            });
        } else {
            setTask({ ...task, [e.target.name]: e.target.value });
        }

        // if (e.target.name === 'email') {
        //     const isValidEmail = validateEmail(e.target.value);
        //     setValidEmail(isValidEmail);
        // }
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        // if (!validateEmail(email)) {
        //     setValidEmail(false)
        // } else {
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
        // }
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
                                    <label htmlFor="name" className="form-label">
                                        Tên:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="Ví dụ: Nguyễn Võ Hoàng"
                                        name="userName"
                                        value={task_name}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>



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

                                {/* <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Giới tính:
                  </label>
                  <select
                    className="form-control text-center"
                    name="gender"
                    value={gender}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    <option>Chọn giới tính</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                    <option value="3">Khác</option>
                  </select>
                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="birthdate" className="form-label">
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
                                    <label htmlFor="birthdate" className="form-label">
                                        Kéo dài thời hạn:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control text-center"
                                        name="extension_time"
                                        value={extension_time}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>

                                {/* <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control text-center ${validEmail ? "" : "is-invalid"
                                            }`}
                                        placeholder="Ví dụ: hr@gmail.com"
                                        name="email"
                                        value={email}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                    {!validEmail && (
                                        <div className="invalid-feedback">
                                            Please enter a valid email address.
                                        </div>
                                    )}
                                </div> */}
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="department" className="form-label">
                                        Khách hàng:
                                    </label>
                                    <select
                                        className="form-control text-center"
                                        name="id"
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


                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        Thêm vào cho đỡ trống chỗ:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="Ví dụ: Ho Chi Minh City"
                                        name="address"
                                        value={task_cre_person}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Mô tả:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="Ví dụ: Nguyễn Võ Hoàng"
                                        name="task_description"
                                        value={task_description}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>



                                {/* <div className="mb-3 row" style={{ marginTop: "19.7px" }}>
                                    <label htmlFor="password" className="col-form-label">
                                        Mật khẩu:
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control text-center"
                                            name="password"
                                            value={password}
                                            onChange={(e) => onInputChange(e)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? (
                                                <i className="fa fa-eye"></i>
                                            ) : (
                                                <i className="fa fa-eye-slash"></i>
                                            )}
                                        </button>
                                    </div>
                                </div> */}
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
