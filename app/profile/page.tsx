"use client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useEffect, SetStateAction } from "react";
import { authStore } from "../../src/stores/profile";
import { transactionStore } from "../../src/stores/Transaction";
import {
  SubscriptionsResponse,
  subscriptionStore,
} from "../../src/stores/Subscription";
import { useParams } from "next/navigation";
import { url } from "../../src/utils/constants";

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
  preferred_payment_method:string;
}

const UserProfile: NextPage = () => {
  const { push } = useRouter();
  const { userId, profile, setProfile } = authStore();
  const { subscriptions, deviceReference, setSubscription } =
    subscriptionStore();
  const { transactions, setTransaction } = transactionStore();

  // const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [formValues, setFormValues] = useState<Profile>();

  useEffect(() => {
    console.log("Form subscriptions: ", subscriptions);
  }, [subscriptions]);

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
          first_name: formValues?.first_name ?? "",
          last_name: formValues?.last_name ?? "",
          mobile_number: formValues?.mobile_number ?? "",
          // city: formValues?.city,
          suburbs: formValues?.suburbs ?? "",
          street_address: formValues?.street_address ?? "",
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
              paddingTop: "0",
              position: "relative",
              textAlign: "center",
              fontFamily: "sans-serif",
            }}
          >
            Edit My Profile<span className="text-red-500"></span>
          </h1>
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
                        {/* { <Image  alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} src={''} /> } 
                        
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
                        */}
                      </div>
                    </div>
                  </div>
                  <div className="col d-flex flex-column flex-sm-item-row justify-content-between mb-3">
                    <div className="form-group">
                      <label
                        style={{
                          color: "#E2520F",
                          fontSize: "12px",
                          paddingLeft: "8px",
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
                    <div className="form-group">
                      <label
                        style={{
                          color: "#E2520F",
                          fontSize: "12px",
                          paddingLeft: "8px",
                        }}
                      >
                        Account Number:
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name=""
                        placeholder=""
                        value={userId ?? 0}
                        style={{ borderRadius: "15px" }}
                      />
                      {/* <input className="form-control" name="first_name" value={formValues?.first_name} onChange={handleSubmit} style={{ borderRadius: '15px' }} */}
                      {/* /> */}
                    </div>
                  </div>
                </div>

                <h4
                  className="active nav-link"
                  style={{
                    color: "#E2520F",
                    fontSize: "16px",
                    paddingLeft: "16px",
                  }}
                >
                  User Profile Name
                </h4>

                <div className="tab-content pt-3">
                  <div className="tab-pane active">
                    <form className="form">
                      <div className="profile-field-container">
                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            First Name
                          </label>
                          <input
                            className="form-control"
                            name="first_name"
                            value={formValues?.first_name ?? ""}
                            onChange={handleSubmit}
                            style={{ borderRadius: "15px" }}
                          />
                        </div>
                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            Last Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="last_name"
                            placeholder=""
                            value={formValues?.last_name}
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            Email
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={formValues?.email}
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            Contact Number
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            name="contact number"
                            defaultValue={formValues?.mobile_number}
                            onChange={handleSubmit}
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            Address
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            name="address"
                            value={formValues?.street_address}
                            onChange={handleSubmit}
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            Complex{" "}
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="complex_building"
                            placeholder=""
                            value={formValues?.complex_building}
                            onChange={handleSubmit}
                            style={{ borderRadius: "15px" }}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            Suburb
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="city"
                            placeholder=""
                            value={formValues?.city ?? ""}
                            onChange={handleSubmit}
                            style={{ borderRadius: "15px" }}
                          />
                        </div>
                      </div>

                      <h4
                        className="mb-2"
                        style={{
                          color: "#E2520F",
                          fontSize: "16px",
                          fontWeight: "bold",
                          paddingLeft: "16px",
                        }}
                      >
                        Router Details/Web Portal
                      </h4>
                      <br />
                      <div className="profile-field-container">
                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
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

                        <div className="form-group">
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
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

                        <button
                          className="btn btn-primary1"
                          type="submit"
                          style={{
                            backgroundColor: "#E2520F",
                            border: "1px solid #E2520F",
                            borderRadius: "9px",
                          }}
                        >
                          Reset Router Password{" "}
                        </button>
                      </div>

                      <h4
                        className="mb-2"
                        style={{
                          color: "#E2520F",
                          fontSize: "16px",
                          fontWeight: "bold",
                          paddingLeft: "16px",
                        }}
                      >
                        Change Profile Password
                      </h4>
                      <br />
                      <div className="profile-field-container">
                        <div className="form-group" aria-colspan={2}>
                          <label
                            style={{
                              color: "#E2520F",
                              fontSize: "12px",
                              paddingLeft: "8px",
                            }}
                          >
                            <span className="d-none d-xl-inline">Password</span>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            placeholder=""
                            style={{ borderRadius: "15px" }}
                          />
                        </div>
                        <button
                          className="btn btn-primary1"
                          type="submit"
                          style={{
                            backgroundColor: "#E2520F",
                            border: "1px solid #E2520F",
                            borderRadius: "9px",
                          }}
                        >
                          New Password{" "}
                        </button>
                        <button
                          className="btn btn-primary1"
                          type="submit"
                          style={{
                            backgroundColor: "#E2520F",
                            border: "1px solid #E2520F",
                            borderRadius: "9px",
                          }}
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
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
