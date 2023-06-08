import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Person = () => {
  const [user, setUser] = useState({
    username: "",
    user_fullName: "",
    user_phonenum: "",
    user_email: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/auth/UserCol/getUser/4")
      // .get(`http://localhost:8080/api/v1/auth/UserCol/getUser/${id}`)
      .then((res) => {
        const { data } = res;
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center gap-2 ">
      <img
        width="35"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
        style={{ borderRadius: "50px" }}
      />

      <span>
        <span
          style={{ fontSize: "14px", fontWeight: "600"  }}
        >
          Hello {user.username}
          <p style={{ fontSize: "10px", fontWeight: "480", marginBottom: "0"}}>{user.role}</p>
        </span>
      </span>
    </div>
  );
};

export default Person;
