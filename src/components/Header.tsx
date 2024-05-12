"use client";
import { faBars, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LOGO from "./images/LOGO.jpg";
import { authStore } from "../stores/profile";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { userId, profile, setUserId } = authStore();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    const url = "";
    const formData = {
      username: "",
      mobile_number: "",
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.warn("Invalid credentials. Please try again.");
      }

      // window.location.href = "./profile";
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    // console.log("Searching for address:", address);
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
                {/* <span onClick={toggleModal} className="close" style={{ marginLeft: '110%',paddingTop:'100%' }}>&times;</span> */}
                <h2
                  style={{
                    marginTop: "-14%",
                    color: "white",
                    paddingRight: "3px",
                    fontSize: "27px",
                  }}
                >
                  Login
                </h2>
                <br />
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
                  />
                  <br />
                  <input
                    type="password"
                    name="password"
                    className="password form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <br />

                  <input
                    className="btn login"
                    type="button"
                    onClick={login}
                    value="Login"
                    style={{ backgroundColor: " #e2520f" }}
                  />
                  {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
                  <a
                    href=""
                    style={{ color: "white", paddingLeft: "29%" }}
                    onClick={forgotPassword}
                  >
                    {" "}
                    Forgot Password
                  </a>
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
        <div style={{ display: "flex", width: "75px" , alignItems: "center"}}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: "8px",
            }}
          >
            {profile ? (
              <h6 style={{ marginRight: "4px" }}>{profile.first_name}</h6>
            ) : null}
           
           <FontAwesomeIcon
              icon={userId ? faUser : faLock}
              onClick={() => (userId ? null : toggleModal())}
              style={{ fontSize: "25px", color: userId ? "#222155" : "red" }}
            />
          </div>
            <label
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-btn"
              htmlFor="btn"
            >
              <FontAwesomeIcon icon={faBars} style={{ fontSize: "25px" }} />
            </label>
          <div className="wrapper">
            <nav style={{ display: menuOpen ? "block" : "none" }} id="sidebar">
              <ul className="list-items">
                <li>
                  {" "}
                  <Link href="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/service">
                    <i className="fas fa-sliders-h"></i> About us
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/fibreplane">
                    <i className="fas fa-address-book"></i> Fibre Plans
                  </Link>
                </li>
                <li>
                  <Link href="/managesubscription" className="dropdown-item">
                    Manage Subscription
                  </Link>
                </li>
                <li>
                  <Link href="blog.html" className="dropdown-item">
                    Cancel Fibre Account
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link me-4 dropdown-toggle link-dark"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/profile"> My Profile</Link>
                </li>

                <li>
                  <Link href="#">
                    <i className="fas fa-globe-asia"></i>Re-charge
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fas fa-envelope"></i>Cancel & Upgrade
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fas fa-envelope"></i>Speed Test
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fas fa-envelope"></i>Track Order
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={handleLogout}>
                    <i className="fas fa-envelope"></i>Sign Out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};
