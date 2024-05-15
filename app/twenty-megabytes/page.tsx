"use client";
import type { NextPage } from "next";
import PlanForm from "../../src/components/PlanForm";

const TwentyMegabytes: NextPage = () => {
  return (
    <main>
      <section className="form-container">
        <br />
        <br />
        <br />
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
          20MBPS FIBRE PLAN<span className="text-red-500"></span>
        </h1>
        <div className="group2">
          <div className="group">
            <PlanForm plan="20" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default TwentyMegabytes;
