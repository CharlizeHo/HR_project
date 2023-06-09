import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function EditUser() {
    const [departments, setDepartments] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        GetDepartment();
    }, []);

    const GetDepartment = async () => {
        const result = await axios.get("http://localhost:8080/Department/getDepartment")
        setDepartments(result.data);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [user, setUser] = useState({
        username: "",
        user_fullName: "",
        user_birthdate: "",
        user_gender: 0,
        user_address: "",
        user_phonenum: "",
        user_email: "",
        password: "",
        department: {
            id: 0,
            departmentName: ""
        },
        user_isActivity: true,
        user_avatar: "",
        authorities:
        {
            authority: "USER"
        }
    });


    const { username, user_fullName, user_birthdate, user_gender, user_address, user_phonenum, user_email, password, department, user_avatar, user_isActivity, authorities } = user;
    // const formattedBirthdate = format(user_birthdate, 'dd/MM/yyyy');

    const [validEmail, setValidEmail] = useState(true);

    const validateEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        // if (name === "user_birthdate") {
        //     const parsedDate = new Date(value);
        //     setUser((prevState) => ({ ...prevState, [name]: parsedDate }));
        // } else {
        //     setUser((prevState) => ({ ...prevState, [name]: value }));
        // }

        if (name === "department.id") {
            const selectedDepartment = departments.find((department) => department.id === parseInt(value));
            setUser((prevState) => ({
                ...prevState,
                department: {
                    id: parseInt(value),
                    departmentName: selectedDepartment.departmentName,
                },
            }));
        } else {
            setUser((prevState) => ({ ...prevState, [name]: value }));
        }
        if (e.target.name === 'user_email') {
            const isValidEmail = validateEmail(e.target.value);
            setValidEmail(isValidEmail);
        }
    };

    useEffect(() => {
        loadUser();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(user_email)) {
            setValidEmail(false)
        } else {
            await axios.put(`http://localhost:8080/api/v1/auth/UserCol/updateUser/${id}`, user);
            navigate("/admin/user");
        }
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/auth/UserCol/getUser/${id}`);
        setUser(result.data);
    }

    const switchActivity = (e) => {
        setUser({ ...user, user_isActivity: !user_isActivity });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
                    <h2 className="text-center">Edit User</h2>
                    <form onSubmit={(e) => onSubmit(e)} style={{ display: "block" }}>
                        <div className="row justify-content-center mb-3">
                            <label htmlFor="Activity" className="form-label col-12 text-center">
                                State:
                            </label>
                            <div className="form-check form-switch d-flex justify-content-center align-items-center col-12">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={user_isActivity}
                                    onClick={(e) => switchActivity(e)}
                                />
                            </div>
                        </div>

                        {/*


                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="birthdate" className="form-label">
                                    Ngày tháng năm sinh:
                                </label>
                                <input
                                    type="date"
                                    className="form-control text-center"
                                    name="user_birthdate"
                                    value={user_birthdate}
                                    onChange={(e) => onInputChange(e)}
                                    required
                                />
                            </div>

                        </div>
 */}



                        <div className="row">
                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">
                                        Full name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="For example: Nguyễn Võ Hoàng"
                                        name="user_fullName"
                                        value={user_fullName}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="birthdate" className="form-label">
                                        Birthdate:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control text-center"
                                        name="user_birthdate"
                                        value={user_birthdate}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control text-center ${validEmail ? "" : "is-invalid"
                                            }`}
                                        placeholder="For example: hr@gmail.com"
                                        name="user_email"
                                        value={user_email}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                    {!validEmail && (
                                        <div className="invalid-feedback">
                                            Please enter a valid email address.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label">
                                        Gender:
                                    </label>
                                    <select
                                        className="form-control text-center"
                                        name="user_gender"
                                        value={user_gender}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    >
                                        <option>Choose gender</option>
                                        <option value="1">Nam</option>
                                        <option value="2">Nữ</option>
                                        <option value="3">Khác</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phonenum" className="form-label">
                                        Phone number:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="For example: 0123456789"
                                        name="user_phonenum"
                                        value={user_phonenum}
                                        onChange={(e) => onInputChange(e)}
                                        disabled
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="department" className="form-label">
                                        Department:
                                    </label>
                                    <select
                                        className="form-control text-center"
                                        name="department.id"
                                        value={department.id}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                        disabled
                                    >
                                        <option disabled>Choose department</option>
                                        {departments &&
                                            departments?.map((list_department) => (
                                                <option
                                                    key={list_department.id}
                                                    value={list_department?.id}
                                                >
                                                    {list_department?.departmentName}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className='col-md-12'>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        Address:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="For example: Ho Chi Minh City"
                                        name="user_address"
                                        value={user_address}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        placeholder="For example: wbjn123"
                                        name="username"
                                        value={username}
                                        onChange={(e) => onInputChange(e)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mb-3 row" style={{ marginTop: "-16px" }}>
                                    <label htmlFor="password" className="col-form-label">
                                        Password:
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
                                </div>
                            </div>

                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-outline-primary mt-2">
                                    Edit
                                </button>
                                <Link
                                    className="btn btn-outline-danger mx-2 mt-2"
                                    to="/admin/user"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

