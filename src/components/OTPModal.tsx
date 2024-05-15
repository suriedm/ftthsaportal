import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface Props {
  id: number;
  mobile: string;
  email: string;
  open: boolean;
  onClose: () => void;
}
const OTPModal = ({ email, mobile, id, open, onClose }: Props) => {
  const router = useRouter();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
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

  async function confirmOTP() {
    if (!id) alert(" the user id is not available");
    const url = "https://stm-dev.intentio.co.za/api/portal/user/confirmation";
    const data = {
      portal_end_customer_id: id,
      confirmation_mobile_number: mobile,
      confirmation_pin: otp.join(""),
      confirmation_email: email,
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
      onClose();
      router.push("/otpconfirmation");
      // window.location.href = "./otpconfirmation";
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

        // clearTimeout(otpTimer);
      } else {
        console.error("Error confirming OTP:", response.statusText);
      }
    } catch (error) {
      console.error("Error confirming OTP:", error);
    }
  }
  return (
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
                  width: `20%`,
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
            <h2 style={{ textAlign: "center", color: "#fff" }}>{message}</h2>
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
  );
};

export default OTPModal;
