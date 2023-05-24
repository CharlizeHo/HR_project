// import React from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../../Components/common/image/logo.png";
// import "./style.css";

// class LoginPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//     };
//   }
//   render() {
//     return (
//       <div className="container">
//         <div className="card card-container">
//           <img id="logo" src={logo} alt="logo" />
//           <h3>Welcome!</h3>
//           <form className="form-signin">
//             <div className="form-control">
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <span className="input-group-text">
//                     <i className="fa-solid fa-phone"></i>
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   id="username"
//                   className="form-control"
//                   placeholder="Số điện thoại"
//                   required
//                   autoFocus
//                 />
//               </div>
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <span className="input-group-text">
//                     <i className="fa-solid fa-lock d-inline"></i>
//                   </span>
//                 </div>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   placeholder="Mật khẩu"
//                   required
//                 />
//               </div>
//             </div>
//             <a href="#" className="forgot-password">
//               Quên mật khẩu?
//             </a>
//             <button
//               className="btn btn-lg btn-primary btn-block btn-signin"
//               type="submit"
//             >
//               <NavLink className="btn-signin" to="/home">
//                 Đăng nhập
//               </NavLink>
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default LoginPage;
