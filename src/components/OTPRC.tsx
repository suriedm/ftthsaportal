"use client"
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect  } from "react";
interface Props {
  id: number;
  mobile: string;
  email: string;
  open: boolean;
  onClose: () => void;
}
const OTPRC = ({ email, mobile, id, open, onClose }: Props) => {
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const handleOtpChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      // Delete the value in the current input field and move focus to the previous input field
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleInputClick = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  useEffect(() => {
    // Focus the first input field when component mounts
    if (inputRefs.current && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  

  async function confirmOTP() {
    if (!id) alert(" the user id is not available");
    const url = "https://stm-dev.intentio.co.za/api/portal/user/confirmation";
    const data = {
      portal_end_customer_id:id,
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
      router.push("/Requestcall");
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
                  width: `19%`,
                  margin: "0.2%",
                  // padding: "1%",
                  borderRadius: "3px",
                  boxSizing: "border-box",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
                onChange={(event) => handleOtpChange(index, event)}
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

export default OTPRC;
