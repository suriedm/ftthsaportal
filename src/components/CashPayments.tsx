import Image from "next/image";
import React from "react";

const CashPayments = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
        flexDirection: "column",
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          marginTop: 8,
          marginBottom: 8,
          marginLeft:"-2%",
        }}
      >
        <Image
          className="row-image"
          src="/images/Checkers-01.png"
          alt=""
          width={80}
          height={13}
        />{" "}
        <Image
  className="row-image"
  src="/images/Checkers-02.png"
  alt=""
  width={70}
  height={13}
  
/>
{" "}
        <Image
          className="row-image"
          src="/images/House-and-Home-Logo.png"
          alt=""
          width={130}
          height={12}
        />{" "}
        <Image
          className="row-image"
          src="/images/Shoprite-04.png"
          alt=""
          width={65}
          height={1}
        />{" "}
        <Image
          className="row-image"
          src="/images/Post-Office-07.png"
          alt=""
          width={100}
          height={23}
        />
        <Image
          className="row-image"
          src="/images/Shoprite-U-Save-05.png"
          alt=""
          width={51}
          height={20}
        />
        <Image
          className="row-image"
          src="/images/Ok-06.png"
          alt=""
          width={35}
          height={31}
        />
      </div>
      <p
        style={{
          fontSize: "14px",
          fontFamily: "sans-serif",
          color: "#263547",
          // paddingLeft: 30
        }}
      >
        Cash Payments can be made at any of these participating stores. You
          will have to select CASH as your payment method above. You will receive
          your SCode Barcode to complete your payment at these stores. Your
          installation will be pending until we receive your payment.
      </p>
    </div>
  );
};

export default CashPayments;
