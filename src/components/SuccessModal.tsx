"use client"

import Link from "next/link";
import link from "next/link";
import { useRouter } from "next/navigation";
 import React, { useRef, useState, useEffect  } from "react";
const OTPModal = () => {

  
  <br/>
  function push(link: any): void {
    throw new Error("Function not implemented.");
  }

  return (
     
 <div id="login" className="modal fade" role="dialog" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed",width:"350%",marginTop:"9%",}}>
  <div className="modal-dialog1">
    <div className="modal-content1" style={{ borderRadius: "29px", height: "auto", width: "270px" }}>
      <div className="modal-body1">
       
        <img src="/images/FTTH-SA-Orange-Tick.png" alt="Success Icon" style={{ width: "50px", margin: "0 auto", display: "block" }} />
        <br/> <br/>
        <h6 style={{ color: "white", fontSize: "21px", textAlign: "center" }}>
          PAYMENT SUCCESSFUL
        </h6>
        <br/>
        <div style={{ color: "white", textAlign: "center", fontSize: "19px" }}>
          Thank you for your payment.<br />Our technician will be in contact to start your Fibre installation
        </div>
        </div>
      <Link href={"/"}> <input
        className="btn login"
        type="button"
        value="OK"
        style={{ backgroundColor: "#e2520f", margin: "20px auto 0", display: "block" }}
      />
     </Link>
    
      </div>
    </div>
  </div>

);
};
export default OTPModal;
