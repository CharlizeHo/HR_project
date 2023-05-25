import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Client/pages/Home/Home";
import ListTask from "./Client//pages/ListTask/ListTask";
import NotFound from "./Client/pages/NotFound/NotFound";
import Layout from "./Client/Components/layouts/layout";
import LoginForm from "./Client/pages/Login/LoginForm";
import "./App.css";
import TaskAssigned from "./Client/pages/ListTask/AssignTask";
import Profile from"./Client/pages/Profile/Profile";

import Department from "./Admin/pages/department/Department";
import Customer from "./Admin/pages/customer/Customer";
import AddCustomer from "./Admin/controller/customer/AddCustomer";
import EditCustomer from "./Admin/controller/customer/EditCustomer";
import AddDepartment from "./Admin/controller/department/AddDepartment";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EditDepartment from "./Admin/controller/department/EditDepartment";
import LayoutAdmin from "./Admin/layouts/layout";
import User from "./Admin/pages/user/user";
import AddUser from "./Admin/controller/user/AddUser";
import EditUser from "./Admin/controller/user/EditUser";
import Task from "./Admin/pages/task/task";
import AddTask from "./Admin/controller/task/AddTask";
import ListNhanVien from "./Client/pages/HRM/ListNhanVien";
import Profile from "./Client/pages/Profile/Profile";
const MenuCtx = React.createContext({
  isNavOpen: true,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: true,
      openNav: (isOpen) => {
        this.setState({
          ...this.state,
          isNavOpen: isOpen,
        });
      },
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <MenuCtx.Provider value={this.state}>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Layout />}>
                <Route path="/home" index element={<Home />} />
                <Route path="/profile" index element={<Profile />} />
                <Route path="/nhanvien" element={<ListNhanVien />} />
                <Route path="/ListTask" element={<ListTask />} />
                <Route
                  path="/ListTask/task-assignments"
                  element={<TaskAssigned />}
                />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="/admin" element={<LayoutAdmin />}>
                <Route
                  exact
                  path="/admin/department"
                  element={<Department />}
                />
                <Route
                  exact
                  path="/admin/department/add"
                  element={<AddDepartment />}
                />
                <Route
                  exact
                  path="/admin/department/editdepartment/:id"
                  element={<EditDepartment />}
                />
                <Route exact path="/admin/customer" element={<Customer />} />
                <Route
                  exact
                  path="/admin/customer/add"
                  element={<AddCustomer />}
                />
                <Route
                  exact
                  path="/admin/customer/editcustomer/:id"
                  element={<EditCustomer />}
                />
                <Route exact path="/admin/user" element={<User />} />
                <Route exact path="/admin/user/add" element={<AddUser />} />
                <Route
                  exact
                  path="/admin/user/edituser/:id"
                  element={<EditUser />}
                />
                <Route exact path="/admin/task" element={<Task />} />
                <Route exact path="/admin/task/add" element={<AddTask />} />
              </Route>
            </Routes>
          </MenuCtx.Provider>
        </div>
      </BrowserRouter>
    );
  }
}
App.MenuCtx = MenuCtx;

export default App;
