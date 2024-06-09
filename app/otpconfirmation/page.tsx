"use client";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { authStore } from "../../src/stores/profile";
import type { NextPage } from "next";
import { subscriptionStore } from "../../src/stores/Subscription";
import { transactionStore } from "../../src/stores/Transaction";
import { fibrePlans } from "../../src/utils/constants";

export interface Subscription {
  subscriptionId: any;
  subscription_initialisation_type: string;
  preferred_payment_method: string;
  billing_auto_renew: boolean;
  application_type: string;
  device_reference: string;
  portal_product_id: number;
  portal_end_customer_id: number;
  id: number;
  date_billing_next: string;
  subscription_reference: string;
  account_status: string;
  subscription_status: string;
  date_created: string;
  date_updated: string;
  subscription_account_reference: string;
  wifi_password: string;
  wifi_ssid: string;
}

interface PostObject {
  checkbox2: any;
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
  Terms: string;
}

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

const Popup: NextPage = () => {
  const { userId, profile } = authStore();
  const { plan, productId } = subscriptionStore();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const closeButton = useRef(null);
  const closeButton2 = useRef(null);
  const { transactions, setTransaction } = transactionStore();
  const [transactionToPay, setTransactionToPay] = useState<{
    id: number;
    customerId: number;
  } | null>(null);
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

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setPaymentMethod(event.target.value);
    }
  };

  const inhandlePay = (id: number, portal_end_customer_id: number) => {
    setTransactionToPay({ id, customerId: portal_end_customer_id });
    setIsPopupVisible(true);
  };
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
            preferred_payment_method:
              paymentMethod || profile?.preferred_payment_method,
            billing_auto_renew: true,
            application_type: "manual",
            device_reference: "",
            portal_product_id: productId,
            portal_end_customer_id: userId,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("registration created successfully:", result);
        window.location.href = result.paymentRedirect;
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  const confirmSubscription = async () => {
    console.log(userId);
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
            subscription_initialisation_type: "onceoff_and_recurring",
            preferred_payment_method:
              paymentMethod || profile?.preferred_payment_method,
            billing_auto_renew: true,
            application_type: "manual",
            device_reference: "",
            portal_product_id: productId,
            portal_end_customer_id: userId,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("registration created successfully:", result);
        window.location.href = result.paymentRedirect;
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  // const alert = <h2 style={{ color: "white" }}>{message}</h2>;

  return (
    <main>
      <div>
        <div>{/* <h1>{isClient ? '' : ''}</h1> */}</div>
      </div>

      <div className="container4">
        <h2
          style={{
            marginBottom: "-12%",
            color: "white",
            alignContent: "center",
          }}
        >
          <b>Payment Subscription</b>
        </h2>
        <br />
        <div
          style={{
            display: "flex",
            marginLeft: "27%",
            marginTop: "10%",
            fontSize: "106%",
            color: "white",
          }}
        >
          <label style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value="creditcard"
              checked={paymentMethod === "creditcard"}
              onChange={handlePaymentMethodChange}
              style={{ marginRight: "5px" }}
            />
            Credit Card
          </label>
          <label>
            <input
              type="checkbox"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
              style={{ marginRight: "5px" }}
            />
            Cash
          </label>
        </div>

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
              <b>Activation Fee + First Month</b>{" "}
            </h2>
            <h4 className="amount">R{plan?(Number(fibrePlans[plan].activation)+Number(fibrePlans[plan].amount)):"plan is not set"}</h4>
            <p style={{ fontSize: "25px", fontWeight: "600" }}></p>
            <button
              onClick={confirmSubscription}
              style={{
                backgroundColor: "#E2520F",
                color: "white",
                borderRadius: "9px",
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
              style={{ fontSize: "17px", fontWeight: "500" }}
            >
              <b>Activation Fee Payment Only</b>
              <h5 className="amount">R{plan?fibrePlans[plan].activation:"plan not set"}</h5>
            </h2>
            {/* <p style={{ fontSize: "25px", fontWeight: "600" }}>R399</p> */}
            {/* <h6>PAYMENT SELECTION METHOD</h6> */}
            <div style={{ marginBottom: "10px" }}></div>
            <button
              onClick={confirmSubscription2}
              style={{
                backgroundColor: "#E2520F",
                color: "white",
                borderRadius: "9px",
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
function showSuccessModal(p0: string) {
  throw new Error("Function not implemented.");
}

function setIsChecked4(checked: any) {
  throw new Error("Function not implemented.");
}

function setIsChecked3(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setFormValues(arg0: (current: any) => any) {
  throw new Error("Function not implemented.");
}
function setIsPopupVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}
