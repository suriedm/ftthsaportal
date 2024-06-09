"use client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useEffect, SetStateAction } from "react";
import { authStore } from "../../src/stores/profile";
import { transactionStore } from "../../src/stores/Transaction";
import {
  Subscription,
  SubscriptionsResponse,
  subscriptionStore,
} from "../../src/stores/Subscription";
import { useParams } from "next/navigation";
import { url } from "../../src/utils/constants";
import { left } from "@popperjs/core";
import { PagesRouteModule } from "next/dist/server/future/route-modules/pages/module.compiled";
import axios from 'axios'; 
const PaymentStatus = () => {
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    //server
    const ws = new WebSocket('https://stm-dev.intentio.co.za/api/portal/#/');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.status) {
        setStatus(message.status);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);
  
};
 







export interface WifiResponse {
  data: WifiData,
  message: string,
  success: boolean
}
export interface WifiData {
  wifi_ssid: string
  wifi_password: string
}

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
  preferred_payment_method: string;
  confirm_Password:string;

}

const UserProfile: NextPage = () => {
  const { push } = useRouter();
  const { userId, profile, setProfile } = authStore();
  const { subscriptions, deviceReference, subscriptionId, wifi_password, wifi_ssid, setSubscription, setWifiDetails } =
    subscriptionStore();
  const { transactions, setTransaction } = transactionStore();
  // const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [formValues, setFormValues] = useState<Profile>();

  const [formData, setFormData] = useState({
    wifi_ssid: "",
    wifi_password: "",
    new_password:"",
    confirmpassword:""
  });

  const onhandleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const data = await fetchWifiData();
      // Handle fetched data
      console.log("Fetched data:", data);
    } catch (error) {
      // Handle fetch error
      console.error("Error fetching WiFi data:", error);
    }
  };

  const [portal_subscription_id, setPortal_subscription_id] = useState();

  async function fetchWifiData() {
    const subscriptionId = subscriptions[0].id;
    console.log({ subscriptionId });
    try {
      const response = await fetch(`https://stm-dev.intentio.co.za/api/portal/subscriptions/details/${subscriptionId}`, {
        headers: {
          'accept': 'application/json'
        },
        // body: JSON.stringify({portal_subscription_id:formData?.subscriptionId})
      });
      if (response.ok) {
        const { data, success }: WifiResponse = await response.json();
        if (success) {
          setWifiDetails(data);
          setFormData(state => ({ ...state, wifi_password: data.wifi_password, wifi_ssid: data.wifi_ssid }))
        }
        console.log("subscription details retrieved successfully", data)
       return data;
      } else {
        // alert("wifi details not found.");
      }
    } catch (error) {
      console.error("Error fetching WiFi data:", error);
      throw error;
    }
  }
  useEffect(() => {
    if (subscriptions.length) {

      fetchWifiData();
    }
  }, [subscriptions]);

  useEffect(() => {

    if (wifi_password && formData.wifi_password.length < 1) {
      setFormData(state => ({ ...state, wifi_password: wifi_password }))
    }
    if (wifi_ssid && formData.wifi_ssid.length < 1) {
      setFormData(state => ({ ...state, wifi_ssid: wifi_ssid }))
    }
  }, [wifi_password, wifi_ssid, formData]);


  useEffect(() => {
    if (profile) {
      setFormValues(() => ({ ...profile }));
    }
    if (userId && !profile) {
      fetchUserData();
    }
  }, [userId, profile]);

  const fetchUserData = async () => {
    console.log(userId);
    const url = `https://stm-dev.intentio.co.za/api/portal/`;
    try {
      const response = await fetch(`${url}subscriptions/customer/${userId}`);
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
//////////////
  async function reset() {
    const params = new URLSearchParams({
    new_password:formData.new_password,
    confirmedPassword:formData.confirmpassword
    });
    const url = `https://stm-dev.intentio.co.za/api/portal/user/reset-password?${params}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({newpassword:formData.new_password})
      });
      if (!response.ok) {
        console.log("Failed to reset password.");
      } else {
        alert("Successfully reset password.");
      }
    } catch (error) {
      console.error("password reset error:", error);
    }
  };



  //   async function fetchWifiData() {
  //     try {
  //         const response = await fetch(`https://stm-dev.intentio.co.za/api/portal/subscriptions/details/`, {
  //             method: "GET",
  //             headers: {
  //                 accept: "application/json",
  //                 "Content-Type": "application/json",
  //             },
  //         });

  //         if (response.ok) {
  //             const data = await response.json();
  //             return data;
  //         } else {
  //             throw new Error("Failed to fetch WiFi data. Please try again.");
  //         }
  //     } catch (error) {
  //         // Handle errors
  //         console.error("Error fetching WiFi data:", error);
  //         throw error; // Rethrow the error for the caller to handle
  //     }
  // }



// New code for the Active status









  // Handle input change

      useEffect(() => {
        fetchUserData();
      }, []);
  
     



  interface EncryptedData {
    wifi_ssid: string;
    wifi_password: string;
  }

  async function storeWifiCredentials(): Promise<void> {
    const url = `https://stm-dev.intentio.co.za/api/portal/subscriptions/details/${subscriptionId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        console.error("Failed to store WiFi credentials.");
      } else {
        alert("Successfully  WiFi credentials found.");
      }
    } catch (error) {
      console.error("Error storing WiFi credentials:", error);
    }
  }





  function onhandleChange(e: { target: { value: SetStateAction<string> } }) {
    setPassword(e.target.value);
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
      push("/managesubscription");
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

  return (
    <main>
      <section style={{ width: "80%", height: "80%" }}>
        <div className="group">

          <h1
            style={{
              color: "#E2520F",
              fontWeight: "600",
              fontSize: "29px",
              paddingTop: "5%",
              position: "relative",
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >

            Edit My Profile<span className="text-red-500"></span>
          </h1>
          <br />
          <div className="card">
            <div className="card-body">
              <div className="e-profile">
                <div className="item-row">
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
                        <div className="mt-2">
                          {/* <label */}
                          {/* htmlFor="upload" */}
                          {/* className="btn btn-primary" */}
                          {/* style={{ */}
                          {/* backgroundColor: "#E2520F", */}
                          {/* border: "1px solid #E2520F", */}
                          {/* }} */}
                          {/* > */}
                          {/* <i className="fa fa-fw fa-camera"></i> */}
                          {/* <span>Change Photo</span> */}
                          {/* </label> */}
                          <input
                            id="upload"
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={onhandleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col d-flex flex-column flex-sm-item-row justify-content-between mb-3">
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

                              <input
                                className="form-control"
                                type=""
                                placeholder=""
                                value={
                                  subscriptions.length
                                    ? subscriptions[0].subscription_status
                                    : ""
                                }
                                style={{
                                  borderRadius: "15px",
                                  fontSize: "90%",
                                }}
                              />
                              {/* <input className="form-control" name="first_name" value={formValues?.first_name} onChange={handleSubmit} style={{ borderRadius: '15px' }} */}
                              {/* /> */}
                            </div>
                            <br />
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
                              <input
                                className="form-control"
                                type="text"
                                name=""
                                placeholder=""
                                value={
                                  subscriptions.length
                                    ? subscriptions[0].subscription_account_reference
                                    : ""
                                }
                                style={{ borderRadius: "15px" }}
                              />
                              {/* <input className="form-control" name="first_name" value={formValues?.first_name} onChange={handleSubmit} style={{ borderRadius: '15px' }} */}
                              {/* /> */}
                            </div>
                            <div
                              className="item-row "
                              style={{ marginTop: "16px" }}
                            >


                              {/* <input className="form-control" name="first_name" value={formValues?.first_name} onChange={handleSubmit} style={{ borderRadius: '15px' }} */}
                              {/* /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="container" style={{ borderRadius: "20px", border: "1px solid #ccc", padding: "20px", width: "95%" }}>
                  {/* Sub-heading with dividing line */}
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                    <h2 style={{ marginRight: "20px", color: "#201F58", fontSize: "20px", fontWeight: "700", paddingLeft: "9px", }}>Personal Details</h2>
                  </div>
                  <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                  <br />

                  {/* Form content */}

                  <div>
                    <div className="form-container" >

                      <div className="form-group">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" id="first_name" name="first_name" className="form-control" value={formValues?.first_name} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" id="last_name" name="last_name" className="form-control" value={formValues?.last_name} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email" className="form-control" value={formValues?.email} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contact_number" className="form-label">Contact Number</label>
                        <input type="text" id="contact_number" name="contact_number" className="form-control" value={formValues?.mobile_number} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="suburb" className="form-label">Suburb</label>
                        <input type="text" id="suburb" name="suburb" className="form-control" value={formValues?.city} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="complex_building" className="form-label" >Complex</label>
                        <input type="text" id="complex_building" name="complex_building" className="form-control" value={formValues?.complex_building} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="suburb" className="form-label">Street Address</label>
                        <input type="text" id="suburb" name="suburb" className="form-control" value={formValues?.street_address} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="complex_building" className="form-label" >Unit</label>
                        <input type="text" id="complex_building" name="complex_building" className="form-control" value={formValues?.unit_number} />
                      </div>
                    </div>
                  </div>
                </div>
                <br /><br />
                {/* ROUTER DETAILS */}
                <div className="container" style={{ borderRadius: "20px", border: "1px solid #ccc", padding: "20px", width: "95%" }}>
                  {/* Sub-heading with dividing line */}
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                    <h2 style={{ marginRight: "20px", color: "#201F58", fontSize: "20px", fontWeight: "700", paddingLeft: "9px", }}>Router Details</h2>
                  </div>
                  <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                  <br />
                  {/* Form content */}
                  <div>
                    <div className="form-group" >
                      <label htmlFor="suburb" className="form-label">  Router SSID Username{" "}</label>

                      <input type="text" id="wifi_ssid" name="wifi_ssid" className="form-control" value={formData.wifi_ssid} onChange={storeWifiCredentials} style={{ width: "80%" }} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="complex_building" className="form-label" > Router SSID Password</label>
                      <input type="text" id="wifi_ssid" name="wifi_ssid" className="form-control" value={formData.wifi_password} style={{ width: "80%" }} />
                    </div>
                    <button
                      className="button5"
                      onClick={fetchWifiData}
                      // onClick={() => push("/hundred-megabytes")}
                      type="submit"
                      style={{
                        backgroundColor: "#E2520F",
                        border: "1px solid #E2520F",
                        borderRadius: "9px",
                        color:"white",
                        fontWeight:500,
                        fontSize:"15px"
                        //  marginLeft:"-100%",
                      }}
                    >
                      {/* <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}> */}
                     <b> Reset Password</b>
                      {/* </h4> */}
                    </button>
                  </div>
                </div>
              </div>

              <br /><br />
              {/* CHANGE PORTAL PASSWORD */}

              <div className="container" style={{ borderRadius: "20px", border: "1px solid #ccc", padding: "20px", width: "95%" }}>
                {/* Sub-heading with dividing line */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                  <h2 style={{ marginRight: "20px", color: "#201F58", fontSize: "20px", fontWeight: "700", paddingLeft: "9px", }}>Change Portal Password</h2>
                </div>
                <div style={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                <br />

                {/* Form content */}

                <div>
                  <div className="form-group">
                    <label htmlFor="complex_building" className="form-label" >New   Password</label>
                    <input type="text" id="complex_building" name="complex_building" className="form-control" value={formData.new_password}style={{ width: "80%" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="complex_building" className="form-label" >Confirm Password</label>
                    <input type="text" id="complex_building" name="complex_building" className="form-control" value={formData.confirmpassword} style={{ width: "80%" }} />
                  </div>
                  <button
                    className="button5"
                    onClick={reset}
                    // onClick={() => push("/hundred-megabytes")}
                    type="submit"
                    style={{
                      backgroundColor: "#E2520F",
                      border: "1px solid #E2520F",
                      borderRadius: "9px",
                      fontSize:"15px",
                      fontWeight:500,
                      //  marginLeft:"-100%",
                    }}
                  >
                    {/* <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}> */}
                    <b>Reset Password</b>
                    {/* </h4> */}
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default UserProfile;

function updateBtnText(arg0: string) {
  throw new Error("Function not implemented.");
}

