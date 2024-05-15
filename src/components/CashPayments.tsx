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
        }}
      >
        <Image
          className="row-image"
          src="/images/Checkers-01.png"
          alt=""
          width={89}
          height={13}
        />{" "}
        <Image
          className="row-image"
          src="/images/Checkers-02.png"
          alt=""
          width={89}
          height={13}
        />{" "}
        <Image
          className="row-image"
          src="/images/House-and-Home-Logo.png"
          alt=""
          width={116}
          height={12}
        />{" "}
        <Image
          className="row-image"
          src="/images/Shoprite-04.png"
          alt=""
          width={95}
          height={13}
        />{" "}
        <Image
          className="row-image"
          src="/images/Post-Office-07.png"
          alt=""
          width={104}
          height={23}
        />
        <Image
          className="row-image"
          src="/images/Shoprite-U-Save-05.png"
          alt=""
          width={53}
          height={20}
        />
        <Image
          className="row-image"
          src="/images/Ok-06.png"
          alt=""
          width={38}
          height={31}
        />
      </div>
      <p
        style={{
          fontSize: "14px",
          fontFamily: "sans-serif",
          color: "#263547",
          paddingLeft: 30
        }}
      >
        * Cash Payments can be made at any of these participating stores. You
        will have to select CASH as your payment method above. You will receive
        your SCode Barcode to complete your payment at these stores. Your
        installation will be pending until we receive your payment.
      </p>
    </div>
  );
};

export default CashPayments;
