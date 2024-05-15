import React, { useState } from "react";
import { IFibrePlan, plans } from "../utils/interfaces";
import { fibrePlans } from "../utils/constants";

interface Props {
  plan: plans;
}
const OrderSummary = ({ plan }: Props) => {
    const [formPlan] = useState<IFibrePlan>(fibrePlans[plan]);
  return (
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
            <b>{formPlan.size}</b>
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
            <b>{formPlan.size}</b>
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
            <b>
              {formPlan.list.length == 5
                ? formPlan.list[2].split(":").pop()
                : formPlan.list[3].split(":").pop()}
            </b>
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
            <b>
              {formPlan.list.length == 5
                ? formPlan.list[3].split(":").pop()
                : formPlan.list[4].split(":").pop()}
            </b>
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
            <b>
              {formPlan.list.length == 5
                ? formPlan.list[4].split(":").pop()
                : formPlan.list[5].split(":").pop()}
            </b>
          </label>
        </div>
      </div>
      <hr />
      <br />
    </div>
  );
};

export default OrderSummary;
