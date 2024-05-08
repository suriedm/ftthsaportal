import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import '../style/page.module.css';
import Link from "next/link";
import router, { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect, SetStateAction } from "react";
import Image from "next/image";
import LOGO from "../components/images/LOGO.jpg";
import { authStore } from "@/stores/profile";
import { TransactionResponse, transactionStore } from "@/stores/Transaction";
import {
  SubscriptionsResponse,
  subscriptionStore,
} from "@/stores/Subscription";
import image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { url } from "@/utils/constants";

export interface handleActivation {
  detail: string;
}

export interface Transaction {
  transaction_date_due: string;
  amount_incl: number;
  currency: string;
  status: string;
  refrence_external: any;
  transaction_method: any;
  portal_subscription_id: number;
  id: number;
  date_updated: string;
  amount_excl: number;
  transaction_date: string;
  transaction_type: string;
  reference: string;
  transaction_description: string;
  portal_end_customer_id: number;
  portal_product_id: any;
  date_created: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: Profile;
}
export interface Profile {
  mobile_number: string;
  city: string;
  alternate_contact_number: string;
  province: string;
  complex_building: string;
  active: boolean;
  last_name: string;
  unit_number: string;
  confirmed: boolean;
  first_name: string;
  street_address: string;
  hashed_password: string;
  identification_reference: string;
  suburbs: string;
  id: number;
  identification_type: string;
  postal_code: string;
  date_created: string;
  email: string;
  postal_address: string;
  date_updated: string;
  account_status: string;
}

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  street_address: string;
  city: string;
  suburbs: string;
  password: string;
  complex_building: string;
}

const UserProfile: NextPage = () => {
  const { push } = useRouter();
  const parameters = useParams();

  const { userId, profile, setProfile } = authStore();
  const { subscriptions, deviceReference, setSubscription } =
    subscriptionStore();
  const { transactions, setTransaction } = transactionStore();

  // const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [formValues, setFormValues] = useState(
    profile ?? {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      street_address: "",
      city: "",
      suburbs: "",
      account_status: "",
      complex_building: "",
      // password: '',
    }
  );

  useEffect(() => {
    console.log("Form values:", formValues);
  }, [formValues]);

  useEffect(() => {
    console.log("{userId, profile}:> ", { userId, profile });
    if (userId && !profile) {
      fetchUserData();
    }
  }, [userId, profile]);

  const handleFormValues = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.currentTarget;
    setFormValues((current) => ({ ...current, [id]: value }));
  };

  const handleinput = (e: { taget: { first_name: any; value: any } }) => {
    const { first_name, value } = e.taget;
    setFormValues({ ...formValues, [first_name]: value });
    console.log(formValues);
  };

  const fetchUserData = async () => {
    console.log(userId);
    const url = `https://stm-dev.intentio.co.za/api/portal/`;
    try {
      const response = await fetch(`${url}subscriptions/${userId}`);
      if (response.ok) {
        const data: SubscriptionsResponse = await response.json();
        setSubscription(data.data);
        console.log("Subscriptions data fetched successfully", data.data);
      } else {
        console.error(
          "Error fetching subscriptions data:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching subscriptions data:", error);
    }
    try {
      const response = await fetch(`${url}user/${userId}`);
      if (response.ok) {
        const userData: ProfileResponse = await response.json();
        setProfile(userData.data);
        setFormValues(userData.data);
        console.log("User data fetched successfully");
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // const deviceReference = searchParams.get("device_reference");
  const handleActivation = async (device: string) => {
    console.log({ device, userId, subscriptions });
    const subscriptionId = subscriptions[0].id;
    console.log(
      "in [handleActivation] device && subscriptionId ===> ",
      subscriptionId
    );
    // setDeviceReference(device)
    if (subscriptionId && device) {
      console.log("in [handleActivation] ");
      const request = await fetch(
        `${url}/subscriptions/activate/${subscriptionId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ device_reference: device }),
        }
      );
      console.log("in [handleActivation] request===> ", request);
      const res = await request.json();
      console.log(" [handleActivation] ", res);
    }
  };

  const handleSubmit = async () => {
    const url = `https://stm-dev.intentio.co.za/api/portal/user`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          mobile_number: formValues.mobile_number,
          // city: formValues.city,
          suburbs: formValues.suburbs,
          street_address: formValues.street_address,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("User data updated successfully", result);
      } else {
        console.error("Error updating user data:");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onhandleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormValues((prevState) => ({
      ...prevState,
      profileImage: file,
    }));
  };

  const onhandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
  };

  const handleImageChange = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      //  setImage(result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function onhandleChange(e: { target: { value: SetStateAction<string> } }) {
    setPassword(e.target.value);
  }

  async function forgotpassword() {
    const url =
      "https://stm-dev.intentio.co.za/api/portal/user/forgot-password";
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
        console.log("forgot password Confirmed successfully");
        // setMessage('forgot password successfully');
        // window.location.href = "./otpconfirmation";
        // clearTimeout(otpTimer);
      } else {
        console.error("Error confirming OTP:", response.statusText);
      }
    } catch (error) {
      console.error("Error confirming OTP:", error);
    }
  }

  const onhandlechange = (e: { target: { files: string | any[] } }) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  async function Accountstatus() {
    const url = `https://stm-dev.intentio.co.za/api/portal/subscriptions`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_status: formValues.account_status,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("User data updated successfully", result);
      } else {
        console.error("Error updating user data:");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  }

  const onActivateHandler = () => {
    console.log("📢 [onActivateHandler] clicked");
    console.log("📢 [transactions] ", transactions);
    console.log({ deviceReference, userId, subscriptions });

    const pendingTransaction = transactions.find(
      (transaction: Transaction) => transaction.status == "pending"
    );
    console.log("📢 [pendingTransaction]> ", pendingTransaction);
    if (pendingTransaction) {
      router.push("/managesubscription");
    } else {
      console.log("📢 [subscriptions[0].id]>> ", subscriptions[0]?.id);
      console.log("📢 [deviceReference]>> ", deviceReference);

      if (subscriptions[0]?.id && deviceReference) {
        handleActivation(deviceReference);
      } else {
        alert(
          `subscription id : ${subscriptions[0]?.id} or device Reference : ${deviceReference} was not found`
        );
      }
    }
    console.log(deviceReference);
  };

  function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  return (
    <main>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <nav>
        <div className="logo">
          <link rel="icon" href="/favicon.ico" />
          <Link href="/">
            {" "}
            <Image
              src={LOGO}
              alt="Logo"
              className="logo"
              width={150}
              height={160}
            />
          </Link>
        </div>
        {/* <FontAwesomeIcon icon={faUser} onClick={toggleModal}style={{fontSize:'25px', paddingLeft:'35%',color:'#222155'}} /> */}
        <input type="checkbox" id="menu-toggle" />
        {/* <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label> */}
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
              <Link href="" onClick={logout}>
                <i className="fas fa-envelope"></i>Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </nav>
      {/* </header> */}

      {/* <link rel="icon" href="/favicon.ico" /> */}
      {/* <div className="navbar1"> */}
      {/* <Image src={LOGO} alt="Logo" className="logo" width={150} height={150} />     */}
      {/* <p style={{ color: '#131D72', fontSize: '15px', fontWeight: 'bold',paddingLeft:'-25%' }}> */}
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
            {/* <Link href="/"> <Image src={LOGO} alt="Logo" className="logo" width={120} height={110} />  </Link>   */}
            <li>
              {" "}
              <Link href="">
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
              <ul className="dropd-menu">
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
              <Link href="" onClick={logout}>
                <i className="fas fa-envelope"></i>Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <br />
      <br />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/css/bootstrap.min.css"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/js/bootstrap.bundle.min.js"
        async
      />
      <br />
      <br />
      <div className="group2">
        <div className="group">
          {/* <h2 style={{paddingLeft:'380px',color:'#E2520F'}}></h2> */}
          <h1
            style={{
              color: "#E2520F",
              fontWeight: "600",
              fontSize: "29px",
              paddingTop: "0",
              position: "relative",
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            Edit My Profile<span className="text-red-500"></span>
          </h1>
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                          <div className="mx-auto" style={{ width: "140px" }}>
                            <div
                              className="d-flex justify-content-center "
                              style={{
                                height: "140px",
                                backgroundColor: "rgb(233, 236, 239)",
                                borderRadius: "45%",
                              }}
                            >
                              {/* { <Image  alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} src={''} /> } */}
                              <span
                                style={{
                                  color: "rgb(166, 168, 170)",
                                  font: "bold 8pt Arial",
                                }}
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-center mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            {/* <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">Your Heading</h4> */}
                            {/* <p className="mb-0">Your paragraph text</p> */}
                            {/* <div className="text-muted"><small>Your small text</small></div> */}
                            <div className="mt-2">
                              <label
                                htmlFor="upload"
                                className="btn btn-primary"
                                style={{
                                  backgroundColor: "#E2520F",
                                  border: "1px solid #E2520F",
                                }}
                              >
                                <i className="fa fa-fw fa-camera"></i>
                                <span>Change Photo</span>
                              </label>
                              <input
                                id="upload"
                                type="file"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={onhandleChange}
                              />
                            </div>
                          </div>
                          {/* {Image && ( */}
                          <div className="d-flex justify-content-center mt-2"></div>
                          {/* )} */}
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap"></h4>
                            <p className="mb-0"></p>
                            <div className="text-muted">
                              <small></small>
                            </div>
                            <div className="mt-2">
                              <label className="">
                                <i className="fa fa-fw fa-camera"></i>
                              </label>
                              <div className="tab-content pt-3">
                                <div className="tab-pane active">
                                  <form className="form">
                                    <div className="row">
                                      <div className="col">
                                        <div className="row">
                                          <div className="col">
                                            <div className="form-group">
                                              <label
                                                style={{
                                                  color: "#E2520F",
                                                  fontSize: "14px",
                                                  fontWeight: "bold",
                                                  paddingLeft: "9px",
                                                }}
                                              >
                                                Account Status
                                              </label>
                                              {/* <input className="form-control" name="first_name" value={formValues.first_name} onChange={handleSubmit} style={{ borderRadius: '15px' }} */}
                                              {/* /> */}
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="form-group">
                                              {/* <label style={{ color: '#E2520F', fontSize: '14px', fontWeight: 'bold', paddingLeft: '9px' }}>Last Name</label> */}
                                              <input
                                                className="form-control"
                                                type=""
                                                placeholder=""
                                                value={
                                                  subscriptions.length
                                                    ? subscriptions[0]
                                                        .subscription_status
                                                    : ""
                                                }
                                                style={{
                                                  borderRadius: "15px",
                                                  marginBottom: "-15%",
                                                  fontSize: "90%",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>

                              <div className="tab-content pt-3">
                                <div className="tab-pane active">
                                  <form className="form">
                                    <div className="row">
                                      <div className="col">
                                        <div className="row">
                                          <div className="col">
                                            <div className="form-group">
                                              <label
                                                style={{
                                                  color: "#E2520F",
                                                  fontSize: "14px",
                                                  fontWeight: "bold",
                                                  paddingLeft: "9px",
                                                }}
                                              >
                                                Account Number:
                                              </label>
                                              {/* <input className="form-control" name="first_name" value={formValues.first_name} onChange={handleSubmit} style={{ borderRadius: '15px' }} */}
                                              {/* /> */}
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="form-group">
                                              {/* <label style={{ color: '#E2520F', fontSize: '14px', fontWeight: 'bold', paddingLeft: '9px' }}>Last Name</label> */}
                                              <input
                                                className="form-control"
                                                type="text"
                                                name=""
                                                placeholder=""
                                                style={{ borderRadius: "15px" }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <div className="tab-content pt-3">
                                <div className="tab-pane active">
                                  <form className="form">
                                    <div className="row">
                                      <div className="col">
                                        {/* <label style={{ color: '#E2520F', fontSize: '14px', fontWeight: 'bold', paddingLeft: '9px' }}>Last Name</label> */}
                                        {!profile?.active && (
                                          <div className="row">
                                            <div className="col">
                                              <div className="form-group">
                                                <label
                                                  style={{
                                                    color: "#E2520F",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    paddingLeft: "9px",
                                                  }}
                                                >
                                                  Activate Account
                                                </label>
                                                {/* <input className="form-control" name="first_name" value={formValues.first_name} onChange={handleSubmit} style={{ borderRadius: '15px' }} */}
                                                {/* /> */}
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="form-group">
                                                <button
                                                  className="btn btn-primary"
                                                  type="button"
                                                  style={{
                                                    backgroundColor: "#E2520F",
                                                    border:
                                                      "1px solid #E2520F ",
                                                    borderRadius: "5px",
                                                    marginTop: "-6%",
                                                  }}
                                                  onClick={() =>
                                                    onActivateHandler()
                                                  }
                                                >
                                                  Activate
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>

                              <label
                                style={{
                                  color: "#222155",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  paddingLeft: "9px",
                                }}
                              ></label>
                              {/* <input className="form-control" type="text" name="" placeholder=""  */}
                              {/* style={{borderRadius:'15px'}}/> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <Link
                            href=""
                            className="active nav-link"
                            style={{
                              color: "#E2520F",
                              fontSize: "14px",
                              fontWeight: "bold",
                              paddingLeft: "9px",
                            }}
                          >
                            User Profile Name
                          </Link>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label
                                        style={{
                                          color: "#E2520F",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                          paddingLeft: "9px",
                                        }}
                                      >
                                        First Name
                                      </label>
                                      <input
                                        className="form-control"
                                        name="first_name"
                                        value={formValues.first_name}
                                        onChange={handleSubmit}
                                        style={{ borderRadius: "15px" }}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label
                                        style={{
                                          color: "#E2520F",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                          paddingLeft: "9px",
                                        }}
                                      >
                                        Last Name
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="last_name"
                                        placeholder=""
                                        value={formValues.last_name}
                                        style={{ borderRadius: "15px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label
                                        style={{
                                          color: "#E2520F",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                          paddingLeft: "9px",
                                        }}
                                      >
                                        Email
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder=""
                                        value={formValues.email}
                                        style={{ borderRadius: "15px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label
                                        style={{
                                          color: "#E2520F",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                          paddingLeft: "9px",
                                        }}
                                      >
                                        Contact Number
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder=""
                                        name="contact number"
                                        defaultValue={formValues.mobile_number}
                                        onChange={handleSubmit}
                                        style={{ borderRadius: "15px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label
                                        style={{
                                          color: "#E2520F",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                          paddingLeft: "9px",
                                        }}
                                      >
                                        Address
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder=""
                                        name="address"
                                        value={formValues.street_address}
                                        onChange={handleSubmit}
                                        style={{ borderRadius: "15px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label
                                    style={{
                                      color: "#E2520F",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      paddingLeft: "9px",
                                    }}
                                  >
                                    Complex{" "}
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="complex_building"
                                    placeholder=""
                                    value={formValues.complex_building}
                                    onChange={handleSubmit}
                                    style={{ borderRadius: "15px" }}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label
                                    style={{
                                      color: "#E2520F",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      paddingLeft: "9px",
                                    }}
                                  >
                                    Suburb
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="city"
                                    placeholder=""
                                    value={formValues.city}
                                    onChange={handleSubmit}
                                    style={{ borderRadius: "15px" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div
                              className="mb-2"
                              style={{
                                color: "#E2520F",
                                fontSize: "14px",
                                fontWeight: "bold",
                                paddingLeft: "9px",
                              }}
                            >
                              <b>Router Details/Web Portal</b>
                            </div>
                            <br />
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label
                                    style={{
                                      color: "#E2520F",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      paddingLeft: "9px",
                                    }}
                                  >
                                    <span className="d-none d-xl-inline">
                                      {" "}
                                      Router SSID Username{" "}
                                    </span>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="password"
                                    placeholder=""
                                    style={{ borderRadius: "15px" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label
                                    style={{
                                      color: "#E2520F",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      paddingLeft: "9px",
                                    }}
                                  >
                                    <span className="d-none d-xl-inline">
                                      Router SSID Password
                                    </span>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="password"
                                    placeholder=""
                                    style={{ borderRadius: "15px" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  {/* <div className="col d-flex justify-content-end"> */}
                                  <button
                                    className="btn btn-primary1"
                                    type="submit"
                                    style={{
                                      backgroundColor: "#E2520F",
                                      border: "1px solid #E2520F",
                                      borderRadius: "9px",
                                      marginLeft: "75%",
                                    }}
                                  >
                                    Reset Router Password{" "}
                                  </button>
                                  {/* </div> */}
                                </div>
                              </div>
                            </div>
                            <div
                              className="mb-2"
                              style={{
                                color: "#E2520F",
                                fontSize: "14px",
                                fontWeight: "bold",
                                paddingLeft: "9px",
                              }}
                            >
                              <b>Change Profile Password</b>
                            </div>
                            <br />
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label
                                    style={{
                                      color: "#E2520F",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      paddingLeft: "9px",
                                    }}
                                  >
                                    <span className="d-none d-xl-inline">
                                      {" "}
                                      New Password{" "}
                                    </span>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="password"
                                    placeholder=""
                                    style={{ borderRadius: "15px" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label
                                    style={{
                                      color: "#E2520F",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      paddingLeft: "9px",
                                    }}
                                  >
                                    <span className="d-none d-xl-inline">
                                      Password
                                    </span>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="password"
                                    placeholder=""
                                    style={{ borderRadius: "15px" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  {/* <div className="col d-flex justify-content-end"> */}
                                  {/* <div className="col d-flex justify-content-end"> */}
                                  <button
                                    className="btn btn-primary1"
                                    type="submit"
                                    style={{
                                      backgroundColor: "#E2520F",
                                      border: "1px solid #E2520F",
                                      borderRadius: "9px",
                                      marginLeft: "75%",
                                    }}
                                  >
                                    Reset Password
                                  </button>
                                  {/* </div> */}
                                </div>
                              </div>
                            </div>
                            <br />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default UserProfile;
