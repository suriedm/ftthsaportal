"use client";
import Image from "next/image";
import type { NextPage } from "next";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";

import { SetStateAction, useEffect, useRef, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { before } from "node:test";
import { authStore } from "../../src/stores/profile";
import React from "react";
import { transactionStore } from "../../src/stores/Transaction";
import { Header } from "../../src/components/Header";
export interface RegistrationResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
}
export interface RegistrationErrorResponse {
  detail: string;
}
interface PostObject {
  message: string;
  role: string;
  first_name: string;
  last_name: string;
  identification_reference: string;
  identification_type: string;
  passportNumber: string;
  complex_building: string;
  unit_number: string;
  street_address: string;
  province: string;
  postal_code: string;
  postal_address: string;
  email: string;
  landLine: string;
  mobile_number: string;
  alternate_contact_number: string;
  password: string;
  city: string;
  application_type: string;
  preferred_payment_method: string;
  // ricaOne: File | null;
  //  ricaTwo: File | null;
}

const TenMegabytes: NextPage = () => {
  const { userId, setUserId } = authStore();
  const [showOTP, setShowOTP] = useState(false);
  const [registrationResponse, setRegistrationResponse] =
    useState<RegistrationResponse>();
  const [formValues, setFormValues] = useState<PostObject>({
    role: "",
    first_name: "",
    last_name: "",
    identification_reference: "",
    identification_type: "",
    passportNumber: "",
    complex_building: "",
    unit_number: "",
    street_address: "",
    province: "",
    postal_code: "",
    postal_address: "",
    email: "",
    landLine: "",
    mobile_number: "",
    alternate_contact_number: "",
    password: "",
    message: "",
    city: "",
    application_type: "",
    preferred_payment_method: "",
    //  ricaOne: null,
    //  ricaTwo: ull,
  });

  const handleFormValues = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.currentTarget;
    setFormValues((current) => ({ ...current, [id]: value }));
  };
  useEffect(() => {
    console.log(" [ten-megabytes.tsx:53]", formValues);
  }, [formValues]);
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files, id } = e.target;
    if (files) {
      const newFile: File = files[0];

      setFormValues((qualification) => ({
        ...qualification,
        [id]: newFile,
      }));
    } else {
      console.log(" [ files are missing");
    }
  }
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const handleChange = (event: { target: { name: any; checked: any } }) => {
    const { name, checked } = event.target;
    console.log("clicked", name);
    if (name === "rsaid") {
      setIsChecked1(checked);
      if (checked) {
        setIsChecked2(false);
        setFormValues((current) => ({
          ...current,
          identification_type: "rsaid",
        }));
      } else {
        setFormValues((current) => ({ ...current, identification_type: "" }));
      }
    } else if (name === "passport") {
      setIsChecked2(checked);
      if (checked) {
        setIsChecked1(false);
        setFormValues((current) => ({
          ...current,
          identification_type: "Passport ",
        }));
      } else {
        setFormValues((current) => ({ ...current, identification_type: "" }));
      }
    }
  };

  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const onhandle = (event: { target: { name: any; checked: any } }) => {
    const { name, checked } = event.target;
    console.log("clicked", name);
    if (name === "creditcard") {
      setIsChecked3(checked);
      if (checked) {
        setIsChecked4(false);
        setFormValues((current) => ({
          ...current,
          preferred_payment_method: "creditcard",
        }));
      } else {
        setFormValues((current) => ({
          ...current,
          preferred_payment_method: "",
        }));
      }
    } else if (name === "CASH/SCODE") {
      setIsChecked4(checked);
      if (checked) {
        setIsChecked3(false);
        setFormValues((current) => ({
          ...current,
          preferred_payment_method: "CASH/SCODE ",
        }));
      } else {
        setFormValues((current) => ({
          ...current,
          preferred_payment_method: "",
        }));
      }
    }
  };
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [message, setMessage] = useState("");
  const handleOtpChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    console.log("newOtp=> ", newOtp);
    setOtp(newOtp);
    console.log("otp=> ", otp);
    if (event.target.value.length === 1 && index !== 3) {
      inputRefs.current[index + 1];
    }
  };
  useEffect(() => {
    inputRefs.current[0];
  }, []);
  let confirmation_pin = "";
  let otpTimer: string | number | NodeJS.Timeout | undefined;
  function generateOTP() {
    let otp = Math.floor(1000 + Math.random() * 9000);
    let otpExpiryTime = new Date().getTime() + 15 * 60 * 1000;
    return { otp, otpExpiryTime };
  }
  function verif(otp: string, otpExpiryTime: number) {
    if (new Date().getTime() <= otpExpiryTime) {
      return otp === confirmation_pin;
    }
    return false;
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [otpVerificationVisible, setOtpVerificationVisible] = useState(false);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://stm-dev.intentio.co.za/api/portal/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        const failed: RegistrationErrorResponse = await response.json();
        //to have the log in json form
        console.error(JSON.stringify(failed, null, "\t"));
        alert(failed.detail);

        throw new Error("Network response was not ok");
      }
      const data: RegistrationResponse = await response.json();
      console.log(data);
      if (data.success) {
        setUserId(data.data.id);
        setRegistrationResponse(data);

        setShowOTP(true);
      } else {
        console.error("Submission unsuccessful:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const submitSalesCallRequest = async () => {
    try {
      const salesCallResponse = await fetch(
        "https://stm-dev.intentio.co.za/api/portal/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            application_type: "salesagent",
            portal_end_customer_id: registrationResponse?.data.id,
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            identification_reference: formValues.identification_reference,
            identification_type: formValues.identification_type,
            mobile_number: formValues.mobile_number,
            email: formValues.email,
            password: formValues.password,
            street_address: formValues.street_address,
            role: formValues.role,
            passportNumber: formValues.passportNumber,
            complex_building: formValues.complex_building,
            unit_number: formValues.unit_number,
            province: formValues.province,
            postal_code: formValues.postal_code,
            postal_address: formValues.postal_address,
            landLine: formValues.landLine,
            city: formValues.city,
            preferred_payment_method: formValues.preferred_payment_method,
          }),
        }
      );
      if (!salesCallResponse.ok) {
        console.log(
          "Your information is successfully submitted to a Sales agent call "
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleLoginIconClick = () => {
    setShowModal(true);
  };
  async function confirmOTP() {
    if (!registrationResponse?.data) alert(" the user id is not available");
    const url = "https://stm-dev.intentio.co.za/api/portal/user/confirmation";
    const data = {
      portal_end_customer_id: registrationResponse?.data.id,
      confirmation_mobile_number: formValues.mobile_number,
      confirmation_pin: otp.join(""),
      confirmation_email: formValues.email,
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
      setShowOTP(false);
      router.push("/otpconfirmation");
      // window.location.href = "./otpconfirmation";
      clearTimeout(otpTimer);
    } catch (error) {
      console.error("Error confirming OTP:", error);
    }
  }

  async function resendOTP() {
    const url =
      "https://stm-dev.intentio.co.za/api/portal/user/forgot-password?mobile_number=";
    const data = {
      confirmation_email: "",
      confirmation_mobile_number: "",
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("resendOTP is sent  successfully");
        setMessage("resendOTP is sent  successfully");
        clearTimeout(otpTimer);
      } else {
        console.error("Error confirming OTP:", response.statusText);
      }
    } catch (error) {
      console.error("Error confirming OTP:", error);
    }
  }
  function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // const PopupModal = ({ onClose }) => {
  const router = useRouter();

  const onhandleSubmit = () => {
    window.location.reload();
    setShowOTP(true);
  };
  const [value, setValue] = useState("");

  const onhandleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  return (
    <main>
      <section className="form-container">
        <br />
        <br />
        <br />
        <h1
          style={{
            color: "#E2520F",
            fontWeight: "bold",
            fontSize: "29px",
            paddingTop: "0",
            position: "relative",
            textAlign: "center",
          }}
        >
          10MBPS PAYMENT PLAN<span className="text-red-500"></span>
        </h1>
        <br />
        <div className="group2">
          <div className="group">
            <form id="register" onSubmit={handleSubmit}>
              <h1
                style={{
                  paddingLeft: "-37px",
                  color: "#E2520F",
                  fontWeight: "bold",
                  fontSize: "20px",
                  paddingTop: "-70px",
                  fontFamily: "sans-serif",
                }}
              >
                <b> 10MBPS PAYMENT PLAN</b>
                <span className="text-red-500"></span>
              </h1>
              <br />
              <hr></hr>
              <p
                style={{
                  paddingLeft: "-37px",
                  color: "#263547",
                  fontWeight: "bold",
                  fontSize: "16px",
                  paddingTop: "-70px",
                  fontFamily: "sans-serif",
                }}
              >
                Select FTTH sales representative that assisted you:
                <span className="text-red-500"></span>
              </p>
              <select
                id="role"
                name="role"
                onChange={handleFormValues}
                value={formValues.role}
                style={{
                  padding: "8px",
                  width: "100%",
                  fontFamily: "sans-serif",
                  fontSize: "17px",
                }}
              >
                <option>FTTHSA OFFICES</option>
                <option>WCSS</option>
                <option>VAR 1</option>
                <option>VAR 2</option>
                <option>VAR 3</option>
                <option>Tumelo</option>
                <option>Maggy</option>
                <option>Eunice</option>
                <option>Themba</option>
                <option>Tshiko</option>
                <option>Tishan</option>
                <option>Lloyd</option>
                <option>April</option>
                <option>Joel</option>
                <option>Thembinkosi</option>
                <option>Samual</option>
                <option>Calvin</option>
                <option>Michelle</option>
                <option>Sakhile</option>
              </select>
              <div className="zeile">
                <div className="input-container">
                  <br />
                  <label
                    htmlFor="first_name"
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    First Name
                  </label>
                  <br />
                  <input
                    type="text"
                    id="first_name"
                    name="#first_name"
                    placeholder=""
                    style={{ width: "96%", padding: "8px" }}
                    value={formValues.first_name}
                    onChange={handleFormValues}
                  />
                  <br />
                  <br />
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="vorname"
                  >
                    <b>ID (SA) or Passport (Non SA)</b>
                  </label>
                  <br /> <br />
                  <input
                    id="radioA"
                    type="checkbox"
                    name="rsaid"
                    style={{
                      color: "#263547",
                      paddingBottom: "20px",
                      fontFamily: "sans-serif",
                    }}
                    onChange={handleChange}
                    checked={isChecked1}
                    value={formValues.identification_type}
                  />
                  <label
                    id="radioA-label"
                    style={{
                      color: "#263547",
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    RSAID
                  </label>
                </div>
                <div className="input-container">
                  <br />
                  <label
                    htmlFor="last_name"
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Last Name{" "}
                  </label>
                  <div>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder=""
                      value={formValues.last_name}
                      onChange={handleFormValues}
                      style={{ width: "96%", padding: "8px" }}
                    />
                  </div>
                  <br />
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="identification_type"
                  >
                    <b>Passport (Non SA)</b>
                  </label>
                  <br />
                  <br />
                  <input
                    style={{ color: "#263547" }}
                    id="passport"
                    type="checkbox"
                    name="passport"
                    onChange={handleChange}
                    checked={isChecked2}
                    value={formValues.identification_type}
                  />
                  <label
                    id="radioA"
                    style={{
                      color: "#263547",
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Passport (Non SA)
                  </label>
                </div>
              </div>
              <br />
              <div className="input-container">
                <label
                  style={{
                    color: "#263547",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                  htmlFor="ID_number"
                >
                  <b>Identity Number (SA) or Passport Number (Non SA)</b>
                </label>
                <div>
                  <input
                    type="identification_reference"
                    id="identification_reference"
                    name="ID_number"
                    placeholder=""
                    onChange={handleFormValues}
                    value={formValues.identification_reference}
                    required
                    style={{ width: "98%", padding: "8px" }}
                  />
                </div>
              </div>
              <br />
              <div className="zeile">
                <div className="input-container">
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="complex_building"
                  >
                    Complex
                  </label>
                  <select
                    id="complex_building"
                    name="complex_building"
                    onChange={handleFormValues}
                    value={formValues.complex_building}
                    style={{
                      width: "96%",
                      padding: "8px",
                      fontFamily: "sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    <option>Larosa 52 Abel Rd,Berea</option>
                    <option>Ridge Plaza 50 Primrose Terrace, Berea</option>
                    <option>The Mark 32 Oreilly Street,Berea</option>
                    <option>Toward Close 60 Hillbrow St,Berea</option>
                    <option>Collette Court 66 Hillbrow Street, Berea</option>
                    <option>Devemport 50 OReilly Rd, Berea</option>
                    <option>Patberne 31 Claim Str, Berea </option>
                    <option>Sorrento Olivia Str,Berea </option>
                    <option>11 Olivia 11 Olivia Rd,Berea </option>
                    <option>Agin Court 6 Hadfield Rd, Berea </option>
                    <option>Aintree 44 Oreilly & Thudhope St, Berea </option>
                    <option>Algarve Flats 44 Oreilly Thudhope St,Berea</option>
                    <option>Amlah Court Jager Str, Berea</option>
                    <option>Andy Bostonian Hotel 29 Abel Rd, Berea</option>
                    <option>Annper Heights 42 Catherine Ave, Berea </option>
                    <option>Arvin Court Oreilly rd , Berea </option>
                    <option>Ayoba Court Olivia Street, Berea </option>
                    <option>Barnato View Barnato Str, Berea </option>
                    <option>Berea Gardens Barnato & Beatrice, Berea</option>
                    <option>Bergsig Flats Cnr Fife str & Bernado </option>
                    <option>Camelot Cnr Fife str & Bernado </option>
                    <option>Cardiff Arms Abel Rd, Berea </option>
                    <option>
                      425 Windsor Place,48 Dukes Ave, windsor East{" "}
                    </option>
                    <option>Aandrus,45 Lords Ave, Windsor East </option>
                    <option>Afroula,74 Viscounts Ave, Windsr East </option>
                    <option>
                      8th on Eileen,8 Eileen Rd, Blairgowrie, Randburg{" "}
                    </option>
                    <option>Apartments on Oak,352 Oak Ave, Randburg</option>
                  </select>
                  {/* <div><input type="text" id="complex_building" name="complex" placeholder=""  */}
                  {/* value={formValues.complex_building} */}
                  {/* onChange={handleFormValues} */}
                  {/* style={{ width: '96%',padding:'8px',}} /></div> */}
                </div>
                <div className="input-container">
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="suburbs"
                  >
                    Suburbs
                  </label>
                  {/* <div><input type="text" id="unit_number" name="unit_no" placeholder="" */}
                  {/* value={formValues.unit_number} */}
                  {/* onChange={handleFormValues} */}
                  {/* style={{ width: '96%',padding:'8px', }}  /></div> */}
                  <select
                    id="city"
                    name="city"
                    onChange={handleFormValues}
                    value={formValues.city}
                    style={{
                      width: "96%",
                      padding: "8px",
                      fontFamily: "sans-serif",
                      fontSize: "17px",
                    }}
                  >
                    <option>Randburg CBD</option>
                    <option>Strydom Park</option>
                    <option>Windsor East</option>
                    <option>Windsor West</option>
                    <option>Hillbrow Johannesburg</option>
                    <option>Berea Johannesburg</option>
                  </select>
                </div>
              </div>
              <br />
              <div className="zeile">
                <div className="input-container">
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="unit_number"
                  >
                    Unit Number
                  </label>
                  <div>
                    <input
                      type="text"
                      id="unit_number"
                      name="unit_number"
                      placeholder=""
                      value={formValues.unit_number}
                      onChange={handleFormValues}
                      style={{ width: "96%", padding: "8px" }}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="street_address"
                  >
                    Street Address
                  </label>
                  <div>
                    <input
                      type="text"
                      id="street_address"
                      name="street_address"
                      value={formValues.street_address}
                      onChange={handleFormValues}
                      placeholder=""
                      style={{ width: "96%", padding: "8px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="zeile">
                <div className="input-container">
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="province"
                  >
                    Province
                  </label>
                  <div>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      placeholder=""
                      value={formValues.province}
                      onChange={handleFormValues}
                      style={{ width: "96%", padding: "8px" }}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <label
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                    htmlFor="postal_code"
                  >
                    ZIP / Postal Code
                  </label>
                  <div>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={formValues.postal_code}
                      onChange={handleFormValues}
                      placeholder=""
                      style={{ width: "96%", padding: "8px" }}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="input-container">
                <label
                  style={{
                    color: "#263547",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                  htmlFor="postal_address"
                >
                  <b>Postal Address</b>
                </label>
              </div>
              <div className="input-container" style={{ width: "60%" }}>
                <div>
                  <textarea
                    id="postal_address"
                    name="postal_address"
                    placeholder=""
                    value={formValues.postal_address}
                    onChange={handleFormValues}
                    style={{
                      width: "155%",
                      padding: "5%",
                      fontFamily: "sans-serif",
                    }}
                  ></textarea>
                </div>
              </div>
              <br />
              <div className="zeile">
                <div className="input-container">
                  <label
                    htmlFor="email"
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Email
                  </label>
                  <div>
                    {" "}
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder=""
                      value={formValues.email}
                      onChange={handleFormValues}
                      style={{ width: "96%", padding: "8px" }}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <label
                    htmlFor="landLine"
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Landline Number
                  </label>
                  <div>
                    <input
                      type="text"
                      id="landLine"
                      name="Landline"
                      placeholder=""
                      value={formValues.landLine}
                      onChange={handleFormValues}
                      style={{
                        width: "96%",
                        padding: "9px",
                        color: "#26354",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="zeile">
                <div className="input-container">
                  <label
                    htmlFor="mobile_number"
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Mobile Number{" "}
                  </label>
                  <div>
                    <input
                      type="text"
                      id="mobile_number"
                      name="Mobile_number"
                      placeholder=""
                      value={formValues.mobile_number}
                      onChange={handleFormValues}
                      style={{ width: "96%", padding: "8px" }}
                    />
                  </div>
                </div>

                <div className="input-container">
                  <label
                    htmlFor="password"
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Create Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    // value={formValues.mobile_number}
                    value={formValues.password}
                    onChange={handleFormValues}
                    maxLength={8}
                    required
                    style={{
                      width: "96%",
                      padding: "8px",
                      fontFamily: "sans-serif",
                    }}
                  />
                </div>
              </div>
              <br />
            </form>
          </div>
          <br />
          <br />
          <div className="upload">
            <h1
              style={{
                paddingLeft: "-37px",
                color: "#E2520F",
                fontWeight: "bold",
                fontSize: "19px",
                paddingTop: "-70px",
                fontFamily: "sans-serif",
              }}
            >
              <b>RICA DOCUMENTS</b>
              <span className="text-red-500"></span>
            </h1>
            <br />
            <hr />
            <br />
            <div className="zeile">
              <div className="input-container">
                <label
                  htmlFor="mobile_number"
                  style={{
                    color: "#263547",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                >
                  Identity or Passport{" "}
                </label>
                <br />
                <br />
                <input
                  type="file"
                  id="real-file"
                  style={{
                    backgroundColor: "#E2520F",
                    margin: "-4px 0 0",
                    padding: "10px",
                    color: "white",
                    borderRadius: "7px",
                    borderColor: "#E2520F",
                    fontFamily: "sans-serif",
                  }}
                />
                {/* <button style={{ backgroundColor: '#E2520F', margin: '-4px 0 0', padding: '10px', color: 'white', borderRadius: '7px', borderColor: '#E2520F' }} type="button" id="custom-button"><b>CHOOSE A FILE</b></button> */}
                {/* <span id="custom-text">  No file chosen.</span> */}
              </div>

              <div className="input-container">
                <div className="input-container">
                  <label
                    htmlFor="mobile_number"
                    style={{
                      color: "#263547",
                      fontSize: "18px",
                      fontWeight: "bold",
                      width: "40%",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Proof of Residential Address{" "}
                  </label>
                  <br />
                  <br />
                  <input
                    type="file"
                    id="real-file"
                    style={{
                      backgroundColor: "#E2520F",
                      margin: "-4px 0 0",
                      padding: "10px",
                      color: "white",
                      borderRadius: "7px",
                      borderColor: "#E2520F",
                      fontFamily: "sans-serif",
                    }}
                  />
                  {/* <button style={{ backgroundColor: '#E2520F', margin: '-4px 0 0', padding: '10px', color: 'white', borderRadius: '7px', borderColor: '#E2520F' }} type="button" id="custom-button"><b>CHOOSE A FILE</b></button> */}
                  {/* <span id="custom-text">  No file chosen.</span> */}
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="upload">
            <h1
              style={{
                paddingLeft: "-37px",
                color: "#E2520F",
                fontWeight: "bold",
                fontSize: "19px",
                paddingTop: "-70px",
                fontFamily: "sans-serif",
              }}
            >
              <b>TERMS & CONDITIONS</b>
              <span className="text-red-500"></span>
            </h1>
            <br />
            <hr />
            <br />
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="acceptTerms"
                >
                  <b>I Accept the Terms & Conditions</b>
                </label>
                <br />
                <input
                  id="radioA"
                  type="checkbox"
                  value="Terms & Conditions"
                  name="Terms & Conditions"
                  className="custom-checkbox"
                  onChange={handleChange}
                  checked={isChecked1}
                />
                <label
                  id="radioA"
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                >
                  Yes
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="upload">
            <h1
              style={{
                paddingLeft: "-37px",
                color: "#E2520F",
                fontWeight: "bold",
                fontSize: "19px",
                paddingTop: "-70px",
                fontFamily: "sans-serif",
              }}
            >
              <b>ORDER SUMMARY</b>
              <span className="text-red-500"></span>
            </h1>
            <br />
            <hr />
            <br />
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="vorname"
                >
                  Provider
                </label>
              </div>
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="zuname"
                >
                  <b>FTTHSA</b>
                </label>
              </div>
            </div>
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="vorname"
                >
                  Download Speed
                </label>
              </div>
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="zuname"
                >
                  <b>10Mpbs</b>
                </label>
              </div>
            </div>
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="vorname"
                >
                  Upload Speed
                </label>
              </div>
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="zuname"
                >
                  <b>10Mpbs</b>
                </label>
              </div>
            </div>
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="vorname"
                >
                  Router
                </label>
              </div>
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="zuname"
                >
                  <b>Free</b>
                </label>
              </div>
            </div>
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="vorname"
                >
                  Once-Off Activation Fee
                </label>
              </div>
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="zuname"
                >
                  <b>R 399</b>
                </label>
              </div>
            </div>
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="vorname"
                >
                  Monthly Payment
                </label>
              </div>
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="zuname"
                >
                  <b>R 350</b>
                </label>
              </div>
            </div>
            <hr />
            <div className="zeile">
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="vorname"
                >
                  <b>Total</b>
                </label>
              </div>
              <div className="input-container">
                <label
                  style={{ color: "#263547", fontFamily: "sans-serif" }}
                  htmlFor="zuname"
                >
                  <b>R 749 pm</b>
                </label>
              </div>
            </div>
            <hr />
            <br />
          </div>
          <br />
          <br />
          <div className="upload">
            <h1
              style={{
                paddingLeft: "-37px",
                color: "#E2520F",
                fontWeight: "bold",
                fontSize: "19px",
                paddingTop: "-70px",
                fontFamily: "sans-serif",
              }}
            >
              <b>SELECT PAYMENT METHOD</b>
              <span className="text-red-500"></span>
            </h1>
            <br />
            <hr />
            <br />
            <input
              type="checkbox"
              id="credit_card"
              name="creditcard"
              onChange={onhandle}
              checked={isChecked3}
            />
            <label
              id=" checkbox3"
              style={{ color: "#263547", fontFamily: "sans-serif" }}
            >
              <b>CREDIT CARD/DEBIT CARD</b>
            </label>
            <br />
            <input
              type="checkbox"
              id="VOUCHER"
              onChange={handleChange}
              checked={isChecked}
            />
            <label
              id="radioA-label"
              style={{ color: "#263547", fontFamily: "sans-serif" }}
            >
              <b>VOUCHER</b>
            </label>
            <br />
            <input
              type="checkbox"
              id="CASH/SCODE"
              name="CASH/SCODE"
              onChange={onhandle}
              checked={isChecked4}
            />
            <label
              id="radioA-label"
              style={{ color: "#263547", fontFamily: "sans-serif" }}
            >
              <b>* CASH/SCODE</b>
            </label>
            <br />

            <p>
              <Image
                className=""
                src="/images/Checkers-01.png"
                alt=""
                width={89}
                height={13}
                style={{ marginRight: "9px" }}
              />{" "}
              <Image
                className=""
                src="/images/Checkers-02.png"
                alt=""
                width={89}
                height={13}
                style={{ marginRight: "9px" }}
              />{" "}
              <Image
                className=""
                src="/images/House-and-Home-Logo.png"
                alt=""
                width={116}
                height={12}
              />{" "}
              <Image
                className=""
                style={{ marginRight: "10px" }}
                src="/images/Shoprite-04.png"
                alt=""
                width={95}
                height={13}
              />{" "}
              <Image
                className=""
                style={{ marginRight: "10px" }}
                src="/images/Post-Office-07.png"
                alt=""
                width={104}
                height={23}
              />
              <Image
                className=""
                style={{ marginRight: "10px" }}
                src="/images/Shoprite-U-Save-05.png"
                alt=""
                width={53}
                height={20}
              />{" "}
              <Image
                className=""
                style={{ marginRight: "10px" }}
                src="/images/Ok-06.png"
                alt=""
                width={38}
                height={31}
              />
            </p>
            <p
              style={{
                fontSize: "14px",
                fontFamily: "sans-serif",
                color: "#263547",
              }}
            >
              * Cash Payments can be made at any of these participating stores.
              You will have to select CASH as your payment method above. You
              will receive your SCode Barcode to complete your payment at these
              stores. Your installation will be pending until we receive your
              payment.
            </p>
          </div>
          <br />
          <button
            id="submitBtn"
            type="submit"
            form="register"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#E2520F",
              margin: "-4px 0 0",
              padding: "10px",
              color: "white",
              borderRadius: "9px",
              borderColor: "#E2520F",
            }}
          >
            ORDER NOW
          </button>

          {showOTP && (
            <div
              className="modal-overlay"
              style={{
                backgroundColor: "#11143405",
                width: "50%",
                maxWidth: "500px",
                margin: "13% auto",
                padding: "2%",
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
                  <p
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    Please enter your OTP sent to your mobile number
                  </p>
                  {/* OTP verification form */}
                  <form
                    id="otp-form"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      flexWrap: "wrap",
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
                          width: `${80 / otp.length}%`,
                          margin: "0.2%",
                          padding: "1%",
                          borderRadius: "3px",
                          boxSizing: "border-box",
                          textAlign: "center",
                          fontSize: "1.5rem",
                        }}
                        onChange={(event) => handleOtpChange(index, event)}
                        value={data}
                        maxLength={1}
                      />
                    ))}
                    {/* Display OTP verification message */}
                    <h2 style={{ textAlign: "center", color: "#fff" }}>
                      {message}
                    </h2>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {/* Verify OTP button */}
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
                        <b>VERIFY OTP</b>
                      </button>
                      {/* Resend OTP button */}
                      <button
                        type="button"
                        onClick={resendOTP}
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
                    </div>
                  </form>
                </section>
              </div>
            </div>
          )}
          <button
            id="submitBtn"
            name="REQUEST SALES CALL"
            type="submit"
            form="register"
            onClick={submitSalesCallRequest}
            style={{
              backgroundColor: "#E2520F",
              margin: "-4px 0 0",
              padding: "10px",
              color: "white",
              borderRadius: "9px",
              borderColor: "#E2520F",
              marginLeft: "56px",
            }}
          >
            REQUEST SALES CALL
          </button>
        </div>
      </section>
    </main>
  );
};

export default TenMegabytes;
