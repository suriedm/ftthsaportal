import React, { useState } from "react";
import {
  IFibrePlan,
  PostObject,
  RegistrationErrorResponse,
  RegistrationResponse,
  plans,
} from "../utils/interfaces";
import { authStore } from "../stores/profile";
import {
  complexBuildings,
  fibrePlans,
  planCities,
  planRoles,
} from "../utils/constants";
import InputLabel from "./InputLabel";
import OTPModal from "./OTPModal";
import CashPayments from "./CashPayments";
import OrderSummary from "./OrderSummary";

interface Props {
  plan: plans;
}
const PlanForm = ({ plan }: Props) => {
  const [formPlan] = useState<IFibrePlan>(fibrePlans[plan]);
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
  
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

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

  const handleFormValues = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.currentTarget;
    setFormValues((current) => ({ ...current, [id]: value }));
  };

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

  return (
    <form id="register" onSubmit={handleSubmit}>
      {showOTP ? (
        <OTPModal
          id={registrationResponse?.data.id ?? 0}
          mobile={formValues.mobile_number}
          email={formValues.email}
          open={showOTP}
          onClose={() => setShowOTP(false)}
        />
      ) : null}

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
        <b> {`${formPlan.size} MBPS PAYMENT PLAN`}</b>
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
        {planRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <div className="zeile">
        <div className="input-container">
          <br />
          <InputLabel id="first_name" label="First Name" />
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
          <InputLabel id="vorname" label="ID (SA) or Passport (Non SA)" />
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
          <InputLabel id="radioA-label" label="RSAID" />
        </div>
        <div className="input-container">
          <br />
          <InputLabel id="last_name" label="Last Name" />
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

          <InputLabel id="identification_type" label="Passport (Non SA)" />
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

          <InputLabel id="radioA" label="Passport (Non SA)" />
        </div>
      </div>
      <br />
      <div className="input-container">
        <InputLabel
          id="ID_number"
          label="Identity Number (SA) or Passport Number (Non SA)"
        />
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
          <InputLabel id="complex_building" label="Complex" />
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
            {complexBuildings.map((building) => (
              <option key={building}>{building}</option>
            ))}
          </select>
          {/* <div><input type="text" id="complex_building" name="complex" placeholder=""  */}
          {/* value={formValues.complex_building} */}
          {/* onChange={handleFormValues} */}
          {/* style={{ width: '96%',padding:'8px',}} /></div> */}
        </div>
        <div className="input-container">
          <InputLabel id="suburbs" label="Suburbs" />
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
            {planCities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div className="zeile">
        <div className="input-container">
          <InputLabel id="unit_number" label="Unit Number" />
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
          <InputLabel id="street_address" label="Street Address" />
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
          <InputLabel id="province" label="Province" />

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
          <InputLabel id="postal_code" label="ZIP / Postal Code" />

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
        <InputLabel id="postal_address" label="Postal Address" />
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
          <InputLabel id="email" label="Email" />
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
          <InputLabel id="landLine" label="Landline Number" />

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
          <InputLabel id="mobile_number" label="Mobile Number" />

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
          <InputLabel id="password" label="Create Password" />

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
            <InputLabel id="mobile_number" label="Identity or Passport" />

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
              <InputLabel
                id="mobile_number"
                label="Proof of Residential Address"
              />

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
            <InputLabel
              id="acceptTerms"
              label="I Accept the Terms & Conditions"
            />

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
            <InputLabel id="radioA" label="Yes" />
          </div>
        </div>
      </div>
      <br />
      <br />
      <OrderSummary plan={plan} />
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
        <InputLabel id="checkbox3" label="CREDIT CARD/DEBIT CARD" />

        <br />
        <input
          type="checkbox"
          id="VOUCHER"
          onChange={handleChange}
          checked={isChecked}
        />
        <InputLabel id="radioA-label" label="VOUCHER" />
        <br />
        <input
          type="checkbox"
          id="CASH/SCODE"
          name="CASH/SCODE"
          onChange={onhandle}
          checked={isChecked4}
        />
        <InputLabel id="radioA-label" label="* CASH/SCODE" />

        <br />
        <CashPayments />
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
    </form>
  );
};

export default PlanForm;
