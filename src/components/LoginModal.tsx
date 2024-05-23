import React, { useState } from "react";
import { authStore } from "../stores/profile";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  const { setUserId } = authStore();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    mobile_number: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit() {
    if (isLogin) {
      login();
    } else {
      forgotPassword();
    }
  }

  async function login() {
    const response = await fetch(
      "https://stm-dev.intentio.co.za/api/portal/user/login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: formData.username,
          password: formData.password,
          grant_type: "",
          scope: "",
          client_id: "",
          client_secret: "",
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      // localStorage.setItem("accessToken", data.access_token);
      // localStorage.setItem("deviceReference",data.devicereference);
      // setDeviceReference(data.device_reference);
      setUserId(data.portal_end_customer_id);
      alert("Successfully logged in as: " + formData.username);
      router.push("./profile?username=" + formData.username);
    } else {
      alert("Incorrect password or username. Please try again.");
    }
  }

  async function forgotPassword() {
    setLoading(true);
    const url = "https://stm-dev.intentio.co.za/api/portal";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: formData.mobile_number,
          username: formData.mobile_number,
        }),
      });

      if (!response.ok) {
        console.warn("Invalid credentials. Please try again.");
      }

      // window.location.href = "./profile";
    } catch (error) {
      console.error("password reset error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="login"
      className="modal fade"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog1">
        <div className="modal-content1">
          <div className="modal-body1">
            <span
              onClick={toggleModal}
              className="close"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                marginRight: "103px",
                marginTop: "9px",
              }}
            >
              &times;
            </span>
            <br />
            <br />
            <h2
              style={{
                marginTop: "-14%",
                color: "white",
                paddingRight: "3px",
                fontSize: "27px",
              }}
            >
              {`${isLogin ? "Login" : "Forgot Password"}`}
            </h2>
            <br />
            <br />
            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center "
            >
              <input
                type="text"
                name="username"
                className="username form-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {isLogin ? (
                <input
                  type="password"
                  name="password"
                  className="password form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="tel"
                  name="mobile_number"
                  className="username form-control"
                  placeholder="Mobile number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  required
                />
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
          <a
            href=""
            style={{ color: "white", paddingLeft: "29%" }}
            onClick={() => setIsLogin(isLogin ? false : true)}
          >
            {`${isLogin ? "Forgot Password" : "Login"}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
