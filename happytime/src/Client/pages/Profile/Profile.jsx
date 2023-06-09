import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://via.placeholder.com/150x150"
  );

  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    user_fullName: "",
    user_phonenum: "",
    user_email: "",
    user_isActivity: true,
    user_avatar: "",
    authorities: {
      authority: "USER",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/auth/UserCol/getUser/4")
      .then((res) => {
        const { data } = res;
        console.log(data);
        setUser(data);
      });
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleAvatarInputChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        setAvatarUrl(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8080/api/v1/auth/UserCol/updateUser/${id}`,
      user
    );
    Navigate("/profile");
  };

  return (
    <div className="profile-container">
      <h4 className="mb-4">Account Information</h4>
      <div className="row">
        <div className="col-md-6 text-center mb-4">
          <img src={avatarUrl} alt="Avatar" className="mb-4 avatar" />
          <button
            className="btn-block btn-change-avatar"
            onClick={() => document.getElementById("avatar-input").click()}
          >
            Change Photo
          </button>
          <input
            type="file"
            id="avatar-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarInputChange}
          />
        </div>

        <div onSubmit={(e) => onSubmit(e)} className="col-md-5">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control profile-form-control"
              id="phone"
              value={user.user_phonenum}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control profile-form-control"
              id="name"
              value={user.username}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control profile-form-control"
              id="email"
              value={user.user_email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button
            className="btn-success btn-save pull-right"
            // onClick={handleSaveButtonClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
