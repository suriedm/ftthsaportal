"use client";
import type { NextPage } from "next";
import React from "react";
import PlanForm from "../../src/components/PlanForm";

const TenMegabytes: NextPage = () => (
  <main>
  <section className="form-container">
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
      10 MBPS PAYMENT PLAN
    </h1>
    <br />
    <div className="group2">
      <div className="group">
        <PlanForm plan={"10"} />
      </div>
    </div>
  </section>
</main>
  );

export default TenMegabytes;
