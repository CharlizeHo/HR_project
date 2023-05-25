import { useState } from "react";import "style.css";

function Profile() {
    const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/150x150");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    function handleAvatarInputChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            setAvatarUrl(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function handleSaveButtonClick() {
        console.log({
            avatarUrl,
            name,
            phone,
            email,
        });
    }

    return (
        <div className="profile-container" >
            <h4>Thông tin cá nhân</h4>
            <div className="row">
                <div className="col-md-3 text-center">
                    <img src={avatarUrl} alt="Avatar" className="avatar"/>
                    <button className="btn-block btn-change-avatar" onClick={() => document.getElementById("avatar-input").click()}>
                        Đổi ảnh đại diện
                    </button>
                    <input type="file" id="avatar-input" accept="image/*" style={{ display: "none" }} onChange={handleAvatarInputChange} />
                </div>
                
                <div className="col-md-9">
                <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="tel" className="form-control profile-form-control" id="phone" value={phone} disabled onChange={(e) => setPhone(e.target.value)} />
                </div>
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input type="text" className="form-control profile-form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control profile-form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button className="btn-success btn-save pull-right" onClick={handleSaveButtonClick}>Lưu</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
