import { Component } from "react";
// import { Image, Menu, Space, Typography } from "antd";

import { useState } from "react";
import DivPerson from "../Components/layouts/Navbar/divPerson";

var LoginPerson = {
  img: " https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
  Name: "Person 1",
  password: "1234",
  Role: "admin",
  Workspace: "VTI Workspace",
};

class Person extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      LoginPerson: {
        img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
        Name: "Person 1",
        Role: "admin",
        Workspace: "VTI Workspace",
      },
    };
  }
  render() {
    const { LoginPerson } = this.state;
    return (
      <div className="btn-left">
        <span>
          <img width="40" src={LoginPerson.img} style={{borderRadius: "50px"}}/>
        </span>
        <span className="btn-text-wrap">
          <p className="btn-bold-text">{LoginPerson.Name}</p>
          <p>{LoginPerson.Role}</p>
        </span>
      </div>
    );
  }
}

export default Person;
