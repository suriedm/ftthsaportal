"use client";
import { faBars, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import LOGO from "./images/LOGO.jpg";
import { authStore } from "../stores/profile";
import { useRouter } from "next/navigation";
import { transactionStore } from "../stores/Transaction";
import { subscriptionStore } from "../stores/Subscription";
import useMouseLeave from "use-mouse-leave";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  id: number;
  mobile: string;
  email: string;
  open: boolean;
  onClose: () => void;
}
export const Header = () => {
  const [mouseLeft, ref] = useMouseLeave();
  const { setTransaction } = transactionStore();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loginPopUp, forgotPopUp] = useState(false);
  const { setSubscription, setProductId } = subscriptionStore();
  const { userId, profile, setUserId, setProfile } = authStore();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [showNewPasswordSection, setShowNewPasswordSection] = useState(false);
  const [otpValue, setOTPValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const inputRefs = useRef([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const refz = useRef(null);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isMyAccountOpen, setIsMyAccountOpen] = useState(false);
  const refy = useRef(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [message, setMessage] = useState("");
  const handleOtpChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (value.length === 1 && !isNaN(Number(value))) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next input field
      const nextIndex = index + 1;
      if (nextIndex < otp.length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    }
  };

  // const [OTPModal,setOTPModal] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    newPassword: "",
    confirmedPassword: "",
    mobile_number: "",
    email: "",
    confirmation_mobile_number: "",
    new_password: "",
    id: "",
  });
  const sendOTP = () => {
    setShowForgotPasswordModal(false);
    setShowOTPSection(true);
  };

  async function forgotPassword() {
    const params = new URLSearchParams({
      mobile_number: formData.mobile_number,
      username: formData.mobile_number,
      // email: formData.email,
    });
    const url = `https://stm-dev.intentio.co.za/api/portal/user/forgot-password?${params}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      if (!response.ok) {
        console.log("Failed to reset password.");
      } else {
        alert("Successfully sent OTP.");
        setLoading(true);
        if (otpValue === "") {
          setShowOTPSection(true);
          setShowForgotPasswordModal(false);
        } else {
          alert("Incorrect OTP. Please try again.");
        }
      }
    } catch (error) {
      console.error("password reset error:", error);
    }
  }

  async function reset() {
    const params = new URLSearchParams({
      new_password: formData.new_password,
      confirmedPassword: formData.confirmedPassword,
    });
    const url = `https://stm-dev.intentio.co.za/api/portal/user/reset-password?${params}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      if (!response.ok) {
        console.log("Failed to reset password.");
      } else {
        alert("Successfully reset password.");
        setLoading(true);
        if (otpValue === "") {
          setShowOTPSection(true);
          setShowForgotPasswordModal(false);
        } else {
          alert("Incorrect OTP. Please try again.");
        }
      }
    } catch (error) {
      console.error("password reset error:", error);
    }
  }

  async function confirmOTP() {
    const url = `https://stm-dev.intentio.co.za/api/portal/user/reset-password`;
    const data = {
      confirmation_mobile_number: formData.mobile_number,
      confirmation_pin: otp.join(""),
      confirmation_email: formData.email,
      new_password: formData.new_password,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        const error = await response.json();
        console.error("Error confirming OTP: ", error);
      }
      const result = await response.json();
      console.log("OTP Confirmed successfully ", result);
      alert("OTP Confirmed successfully");
      setShowOTPSection(false);
      //   router.push("/otpconfirmation");
    } catch (error) {
      console.error("Error confirming OTP:", error);
    }
  }

  useEffect(() => {
    console.log("📢 [Header.tsx:37] menuOpen ", menuOpen);
  }, [menuOpen]);

  const handleMouseEnter = () => {
    setMenuOpen(true);
  };
  const handleMouseLeave = () => {
    setMenuOpen(false);
  };

  const toggleModal = () => {
    setShowModal(false);
  };
  const toggleModal1 = () => {
    setShowModal(true);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      // Delete the value in the current input field and move focus to the previous input field
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleInputClick = (index: number) => {
    inputRefs.current[index]?.focus();
  };
  const handleChange = (e: { target: { name: any; value: any } }) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    // Focus the first input field when component mounts
    if (inputRefs.current && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  //Login
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
          ...formData,
          grant_type: "",
          scope: "",
          client_id: "",
          client_secret: "",
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setShowModal(false); // Hide the login popup
      // localStorage.setItem("accessToken", data.access_token);
      // localStorage.setItem("deviceReference",data.devicereference);
      // setDeviceReference(data.device_reference);
      setUserId(data.portal_end_customer_id);
      alert("Successfully logged in as: " + formData.username);
      setIsLoggedIn(true);
      router.push("./profile?username=" + formData.username);
    } else {
      alert("Incorrect password or username. Please try again.");
    }
  }

  const handleLogout = () => {
    setProfile(null);
    setUserId(null);
    setProductId(null);
    setTransaction([]);
    setSubscription([]);
    router.push("/");
  };

  const toggleForgotPasswordModal = () => {
    setShowModal(false);
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setShowModal(true);
  };

  const closeOtpSection = () => {
    setShowOTPSection(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <header className="header">
      {showModal && (
        <div
          id="login"
          className="modal fade"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog1">
            <div className="modal-content1" style={{ position: "relative" }}>
              <span
                onClick={toggleModal}
                className="close"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  margin: "15px",
                  cursor: "pointer",
                }}
              >
                &times;
              </span>
              <br />
              <br />
              <div className="modal-body1">
                <h2
                  style={{
                    marginTop: "-14%",
                    color: "white",
                    fontSize: "27px",
                  }}
                >
                  Login
                </h2>
                <br />
                <form className="d-flex justify-content-center ">
                  <input
                    type="text"
                    name="username"
                    className="username form-control"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ color: "white" }}
                  />
                  <br />
                  <div
                    className="password-input-container"
                    style={{ position: "relative" }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="password form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ color: "white", paddingRight: "40px" }} // Add padding to the right for the icon
                    />
                    <span
                      onClick={toggleShowPassword}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "white",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <br />

                  <input
                    className="btn login"
                    type="button"
                    onClick={login}
                    value="Login"
                    style={{ backgroundColor: "#e2520f" }}
                  />

                  <a
                    href=""
                    style={{ color: "white", paddingLeft: "29%" }}
                    onClick={login}
                  ></a>
                  <input
                    className="btn login"
                    type="button"
                    onClick={toggleForgotPasswordModal}
                    value="Forgot Password"
                    style={{ backgroundColor: "#e2520f" }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForgotPasswordModal && (
        <div
          id="forgotPassword"
          className="modal fade"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog1">
            <div className="modal-content1" style={{ position: "relative" }}>
              <span
                onClick={closeForgotPasswordModal}
                className="close"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  margin: "15px",
                  cursor: "pointer",
                }}
              >
                &times;
              </span>
              <div className="modal-body1">
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
                  Forgot Password
                </h2>
                <br />
                <br />
                {/* Add the form for resetting password */}
                <form className="d-flex justify-content-center">
                  {/* Email input */}
                  <input
                    type="text"
                    name="email"
                    className="username form-control"
                    placeholder="email"
                    value={formData?.email}
                    onChange={handleChange}
                    required
                  />
                  <br />
                  <input
                    type="text"
                    name="mobile_number"
                    className="username form-control"
                    placeholder="mobile number"
                    value={formData?.mobile_number}
                    onChange={handleChange}
                    required
                  />
                  <br />
                  {/* Button to send OTP */}
                  <input
                    className="btn login"
                    type="button"
                    onClick={forgotPassword}
                    value="Send OTP"
                    style={{ backgroundColor: "#e2520f" }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP input */}
      {showOTPSection && (
        <div
          className="modal-overlay"
          style={{
            backgroundColor: "#11143405",
            width: "50%",
            maxWidth: "500px",
            margin: "13% auto",
            padding: "2%",
            position: "absolute",

            left: "30%",
            borderRadius: "5px",
          }}
        >
          <div className="modal-content">
            <section
              className="otp"
              aria-label="OTP Verification"
              style={{
                backgroundColor: "rgb(17 20 52 / 6%)",
                width: "85%",
                maxWidth: "500px",
                margin: "13% auto",
                padding: "2%",
                paddingTop: "10%",
                borderRadius: "5px",
              }}
            >
              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "2rem",
                }}
              >
                OTP Verification:
              </h1>

              {/* OTP verification form */}
              <br />
              <form
                id="otp-form"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                {/* Render OTP input fields */}
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    aria-label={`OTP digit ${index + 1}`}
                    className="otp-input"
                    style={{
                      width: `19%`,
                      margin: "0.2%",
                      // padding: "1%",
                      borderRadius: "3px",
                      boxSizing: "border-box",
                      textAlign: "center",
                      fontSize: "1.5rem",
                    }}
                    onChange={(event) => handleOtpChange(index, event)}
                    //  value={data}
                    //  maxLength={1}
                    //  onChange={(event) => handleOtpChange(index, event)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onClick={() => handleInputClick(index)}
                    value={data}
                    maxLength={1}
                    ref={(input) => {
                      if (input) {
                        inputRefs.current[index] = input;
                      }
                    }}
                  />
                ))}

                {/* Display OTP verification message */}
                <h2 style={{ textAlign: "center", color: "#fff" }}></h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* Verify OTP button */}
                  <br />
                  <br />
                </div>
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  Reset new Password
                </p>
                <input
                  type="text"
                  name="new_password"
                  className="username form-control"
                  placeholder=""
                  value={formData?.new_password}
                  onChange={handleChange}
                  required
                  style={{
                    width: `150%`,
                    margin: "0.2%",
                    // padding: "1%",
                    borderRadius: "3px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                />
                <br />
                <button
                  type="button"
                  onClick={confirmOTP}
                  style={{
                    backgroundColor: "#E2520F",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 22px",
                    margin: "15px 10px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  <b>RESET OTP</b>
                  <br />
                </button>
                {/* Resend OTP button */}
                <button
                  type="button"
                  onClick={confirmOTP}
                  style={{
                    backgroundColor: "#E2520F",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 22px",
                    margin: "15px 10px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  <b>RESEND OTP</b>
                </button>
              </form>
            </section>
          </div>
        </div>
      )}

      {/* New password input */}
      {showNewPasswordSection && (
        <div
          id="newPasswordSection"
          className="modal fade"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog1">
            <div className="modal-content1">
              <div className="modal-body1">
                <span
                  onClick={closeForgotPasswordModal}
                  className="close"
                  style={{
                    position: "fixed",
                    top: "0",
                    right: "0",
                    marginRight: "150px",
                    marginTop: "9px",
                    cursor: "pointer",
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
                  Create New Password
                </h2>
                <br />
                <br />
                {/* Add the form for resetting password */}
                <form className="d-flex justify-content-center ">
                  <input
                    type="password"
                    name="newPassword"
                    className="newPassword form-control"
                    value={formData.new_password}
                    required
                  />
                  <br />
                  {/* Input for confirming new password */}
                  <input
                    type="password"
                    name="confirmNewPassword"
                    className="confirmNewPassword form-control"
                    placeholder="Confirm New Password"
                    value={formData.confirmedPassword}
                    required
                  />
                  <br />
                  {/* Button to reset password */}
                  <input
                    className="btn"
                    type="button"
                    onClick={reset}
                    value="Reset Password"
                    style={{ backgroundColor: "#e2520f" }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
          width: "auto",
        }}
      >
        <Link className="logo" href="/">
          <Image
            src="/images/LOGO.jpg"
            alt="Logo"
            className="logo"
            width={120}
            height={110}
          />{" "}
        </Link>
        <div style={{ display: "flex", width: "70px", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              // flexDirection: "row",
              marginRight: "8px",
            }}
          >
            {profile ? (
              <h6
                style={{
                  marginLeft: "-48px",
                  fontSize: "16px",
                  alignContent: "center",
                }}
              >
                {profile.first_name}
              </h6>
            ) : null}

            <FontAwesomeIcon
              icon={userId ? faUser : faLock}
              onClick={() => (userId ? null : toggleModal1())}
              style={{ fontSize: "23px", color: userId ? "#222155" : "red" }}
            />
          </div>
          <label
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-btn"
            htmlFor="btn"
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "25px" }} />
          </label>
          <div
            className="wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <nav style={{ display: menuOpen ? "block" : "none" }} id="sidebar">
              <ul ref={ref} id="menuList" className="list-items">
                <li>
                  <Link href="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li>
                  <Link href="/#service">
                    <i className="fas fa-sliders-h"></i> About us
                  </Link>
                </li>
                <li>
                  <Link href="/fibreplane">
                    <i className="fas fa-address-book"></i> Fibre Plans
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link href="/managesubscription" className="dropdown-item"> */}
                {/* Manage Subscription */}
                {/* </Link> */}
                {/* </li> */}
                {isLoggedIn && (
                  <>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        id="accountDropdown"
                        data-bs-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-expanded="true"
                      >
                        My Account
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="accountDropdown"
                      >
                        <li>
                          <Link href="/profile" className="dropdown-item">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/managesubscription"
                            className="dropdown-item"
                          >
                            Manage Subscription
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <li> */}
                    {/* <Link href="/profile"> */}
                    {/* <i className="fas fa-user"></i> My Profile */}
                    {/* </Link> */}
                    {/* </li> */}
                    <li>
                      <Link href="#">
                        <i className="fas fa-globe-asia"></i> Recharge
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-envelope"></i> Speed Test
                      </Link>
                    </li>
                    <li>
                      <Link href="/" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Sign Out
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};
