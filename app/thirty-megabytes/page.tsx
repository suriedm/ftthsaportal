"use client";
import type { NextPage } from "next";
import React from "react";
import PlanForm from "../../src/components/PlanForm";

const ThirtyMegabytes: NextPage = () => (
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
        30MBPS Fibre PLAN<span className="text-red-500"></span>
      </h1>
      <br />
      <div className="group2">
        <div className="group">
          <PlanForm plan="30" />
        </div>
      </div>
    </section>
  </main>
);

export default ThirtyMegabytes;
