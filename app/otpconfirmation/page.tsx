"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Link from "next/link";
import { url } from "inspector";
import { authStore } from "../../src/stores/profile";
import type { NextPage } from "next";
export interface RegistrationResponse {
  success: true;
  message: string;
  data: string;
  paymentRedirect: string;
}
export interface Data {
  id: number;
}
export interface RegistrationErrorResponse {
  detail: number;
}

const Popup : NextPage = () => {
  const { userId } = authStore();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const closeButton = useRef(null);
  const closeButton2 = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setShowPopup2(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (showPopup && closeButton.current) {
      closeButton.current;
    }
    if (showPopup2 && closeButton2.current) {
      closeButton2.current;
    }
  }, [showPopup, showPopup2]);
  const handleClose = () => {
    setShowPopup(false);
  };
  const handleClose2 = () => {
    setShowPopup2(false);
  };
  const [message, setMessage] = useState("");
  const [registrationResponse, setRegistrationResponse] =
    useState<RegistrationResponse>();
  const confirmSubscription2 = async () => {
    try {
      const response = await fetch(
        "https://stm-dev.intentio.co.za/api/portal/subscriptions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_start: new Date().toISOString().split("T")[0],
            subscription_initialisation_type: "onceoff",
            preferred_payment_method: "creditcard",
            billing_auto_renew: true,
            application_type: "manual",
            device_reference: "",
            portal_product_id: 1,
            portal_end_customer_id: userId,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("registration created successfully:", registrationResponse);
        window.location.href = result.paymentRedirect;
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  const cashpayment = async () => {
    try {
      const response = await fetch(
        "https://stm-dev.intentio.co.za/api/portal/subscriptions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_start: new Date().toISOString().split("T")[0],
            subscription_initialisation_type: "onceoff",
            preferred_payment_method: "cash/Scode",
            billing_auto_renew: true,
            application_type: "manual",
            device_reference: "",
            portal_product_id: 1,
            portal_end_customer_id: userId,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Subscription created successfully:", result);
        // showAlert(749);
      } else {
        console.error("Subscription creation failed");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };
  function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  }
  const alert = <h2 style={{ color: "white" }}>{message}</h2>;
  return (
    <main>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
      
      {/* </header> */}

      {/* <link rel="icon" href="/favicon.ico" /> */}
      {/* <div className="navbar1"> */}
      {/* <Image src="/images/LOGO.jpg" alt="Logo" className="logo" width={150} height={150} />     */}
      {/* <p style={{ color: '#131D72', fontSize: '15px', fontWeight: 'bold',paddingLeft:'-25%' }}> */}
      <div>
        {/* <FaUser onClick={toggleModal} style={{ */}
        {/* fontSize: '29px', */}
        {/* fontWeight: '600', */}
        {/* color: '#e2520f', */}
        {/* position:'absolute', */}
        {/* marginTop:'1px', */}
        {/* margin:'0', */}

        {/* }} */}

        {/* values={formValues.first_name} */}
        {/* />  */}

        <div>{/* <h1>{isClient ? '' : ''}</h1> */}</div>
      </div>
      {/* </p>    */}
      {/* <FontAwesomeIcon icon={faUser} onClick={toggleModal}style={{fontSize:'25px', paddingLeft:'35%',color:'#222155'}} /> */}

      <div className="wrapper" style={{ top: "-2%" }}>
        <input type="checkbox" id="btn" hidden />
        <label className="menu-btn" htmlFor="btn">
          <div>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "25px" }} />
          </div>
        </label>
        <nav id="sidebar">
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
              <ul className="dropdown-menu">
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
              </ul>
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
              <Link href="#">
                <i className="fas fa-envelope" onClick={logout}></i>Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container4">
        <h2 style={{ marginBottom: "-12%", color: "white" }}>
          <b>Payment Subscription</b>
        </h2>
        {/* {alert} */}
        {showPopup && (
          <div
            className="popup1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog1Title"
          >
            <button id="close" onClick={handleClose} aria-label="close popup">
              &times;
            </button>
            <h2
              id="dialog1Title"
              style={{ fontSize: "17px", fontWeight: "600" }}
            >
              <b>Activation Fee + First Month </b>{" "}
            </h2>

            <p style={{ fontSize: "25px", fontWeight: "600" }}>R749</p>
            <button
              onClick={confirmSubscription2}
              style={{
                backgroundColor: "#E2520F",
                color: "white",
                borderRadius: "60px",
                padding: "9px",
                fontSize: "15px",
                fontWeight: "600",
                border: " 2px solid #E2520F",
              }}
            >
              Pay Now
            </button>
          </div>
        )}
        {showPopup2 && (
          <div
            className="popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog2Title"
          >
            <button id="close" onClick={handleClose2} aria-label="close popup">
              &times;
            </button>
            <h2
              id="dialog2Title"
              style={{ fontSize: "17px", fontWeight: "600" }}
            >
              <b>Activation Fee Payment Only</b>
            </h2>

            <p style={{ fontSize: "25px", fontWeight: "600" }}>R399</p>
            <button
              onClick={confirmSubscription2}
              style={{
                backgroundColor: "#E2520F",
                color: "white",
                borderRadius: "50px",
                padding: "9px",
                fontSize: "15px",
                fontWeight: "600",
                border: " 2px solid #E2520F",
              }}
            >
              Pay Now
            </button>
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <h5
          style={{
            paddingRight: "-19%",
            paddingTop: "250px",
            color: "white",
            fontSize: "12px",
          }}
        >
          * Your monthly payment will be due on completion of installation
        </h5>
      </div>
    </main>
  );
};
export default Popup;

function setUserId(id: any) {
  throw new Error("Function not implemented.");
}
