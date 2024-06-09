     'use client'
import React, { useRef, useState, useEffect } from "react";
import { authStore } from "../../src/stores/profile";
import { TransactionResponse, transactionStore } from "../../src/stores/Transaction";
import { useRouter } from "next/navigation";
import { subscriptionStore } from "../../src/stores/Subscription";
import type { NextPage } from "next";

const url = `https://stm-dev.intentio.co.za/api/portal/`;

interface SuccessRequest {
  success: boolean;
  message: string;
  paymentRedirect?: string;
  detail?: string;
}

const Modal: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const { userId, profile, setProfile } = authStore();
  const { transactions, setTransaction } = transactionStore();
  const { subscriptions } = subscriptionStore();
  const [isClient, setIsClient] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [transactionToPay, setTransactionToPay] = useState<{ id: number; customerId: number } | null>(null);

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(`https://stm-dev.intentio.co.za/api/portal/transactions/customer/${userId}`);
      if (response.ok) {
        const data: TransactionResponse = await response.json();
        setTransaction(data.data);
        console.log("transactions data fetched successfully ", data.data);
      } else {
        console.error("Error fetching transactions data:", response.statusText);
      }
    }
    getTransactions();
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const handlePay = async (transactionId: number, customerId: number, paymentType: string) => {
    const request = await fetch(`${url}transactions/${customerId}/pay/${transactionId}?paymentType=${paymentType}`);
    if (!request.ok) {
      const error = await request.json();
      console.log();
      throw new Error("Failed to complete payment");
    }
    const resolve: SuccessRequest = await request.json();
    if (resolve.detail) {
      throw new Error(resolve.detail);
    }
    if (resolve.paymentRedirect) {
      window.location.href = resolve.paymentRedirect;
    }
  };

  const inhandlePay = (id: number, portal_end_customer_id: number) => {
    setTransactionToPay({ id, customerId: portal_end_customer_id });
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const onPaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const onPaymentSubmit = () => {
    if (transactionToPay && selectedPaymentMethod) {
      handlePay(transactionToPay.id, transactionToPay.customerId, selectedPaymentMethod);
    }
    closePopup();
  };

  return (
    <main>
      <section>
        <br /><br /><br /><br />
        <h1
          style={{
            textAlign: "center",
            color: "#e2520f",
            fontSize: "39px",
            fontWeight: "600",
            height: "-53%",
            fontFamily: "sans-serif",
          }}
        >
          Manage Subscription
        </h1>
        <div className="head">
          <br /><br />
          <h1
            style={{
              textAlign: "left",
              color: "#e2520f",
              fontSize: "25px",
              paddingTop: "30px",
              fontFamily: "sans-serif",
            }}
          >
            <b>Subscription Details </b>
            <span className="text-red-500"></span>
          </h1>
          <br /><br /><br />
          <div>
            <div className="table-container">
              <table className="table">
                <h6>{isClient ? "" : ""}</h6>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length &&
                    subscriptions.map((subscription) => {
                      const updatedDate = new Date(subscription.date_updated);
                      const nextDate = new Date(subscription.date_billing_next);
                      console.log("subscription ", subscription);
                      return (
                        <tr key={subscription.id}>
                          <td>{subscription.date_created ?? "Activation Fee"}</td>
                          <td>{subscription.portal_product_id}</td>
                          <td>{`${nextDate.getDate()}-${nextDate.getUTCMonth()}-${nextDate.getFullYear()} `}</td>
                          <td>{subscription.subscription_status}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="head">
          <br /><br />
          <h1
            style={{
              textAlign: "left",
              color: "#e2520f",
              fontSize: "25px",
              paddingTop: "30px",
              fontFamily: "sans-serif",
            }}
          >
            <b>Transactions Details </b>
            <span className="text-red-500"></span>
          </h1>
          <br /><br /><br />
          <div className="table-container">
            <table className="table">
              <h6>{isClient ? "" : ""}</h6>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Invoice Bill</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length &&
                  transactions.map((transaction) => {
                    const updatedDate = new Date(transaction.transaction_date);
                    const nextDate = new Date(transaction.transaction_date);
                    console.log("cost ", transaction);
                    return (
                      <tr key={transaction.portal_product_id}>
                        <td>{`${nextDate.getDate()}-${nextDate.getUTCMonth()}-${nextDate.getFullYear()} `}</td>
                        <td>{transaction.transaction_description ?? "description"}</td>
                        <td>{transaction.transaction_type === "debit" ? "" : transaction.amount_incl ?? ""}</td>
                        <td style={{ color: transaction.transaction_type === "debit" ? "red" : "inherit" }}>
                          {transaction.transaction_type === "credit" ? "" : transaction.amount_incl ?? ""}
                        </td>
                        <td>
                          {transaction.status !== "completed" ? (
                            <>
                              <button
                                onClick={() => inhandlePay(transaction.id, transaction.portal_end_customer_id)}
                                style={{
                                  backgroundColor: '#e2520f',
                                  color: '#ffffff',
                                  padding: '3px 16px',
                                  border: 'none',
                                  borderRadius: '25px',
                                  cursor: 'pointer',
                                  fontSize: '11px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Pay Now
                              </button>
                              {isPopupVisible && (
                                <div
                                  style={{
                                    position: 'fixed',
                                    top: '-69%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: '#201f58',
                                    padding: '20px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1000,
                                    borderRadius: "25px",
                                  }}
                                >
                                  <fieldset>
                                    <legend>SELECT PAYMENT METHOD</legend>
                                    <div className="radio-item-container">
                                      <div className="radio-item">
                                        <label htmlFor="creditcard">
                                          <input
                                            type="radio"
                                            id="creditcard"
                                            name="paymentMethod"
                                            value="creditcard"
                                            onChange={onPaymentMethodChange}
                                          />
                                          <span>CREDITCARD</span>
                                        </label>
                                      </div>
                                      <div className="radio-item">
                                        <label htmlFor="CASH/SCODE">
                                          <input
                                            type="radio"
                                            id="cash"
                                            name="paymentMethod"
                                            value="cash"
                                            onChange={onPaymentMethodChange}
                                          />
                                          <span>CASH/SCODE</span>
                                        </label>
                                      </div>
                                      <div className="radio-item">
                                        <label htmlFor="voucher">
                                          <input
                                            type="radio"
                                            id="voucher"
                                            name="paymentMethod"
                                            value="voucher"
                                            onChange={onPaymentMethodChange}
                                          />
                                          <span>VOUCHER</span>
                                        </label>
                                      </div>
                                      <button
                                        onClick={onPaymentSubmit}
                                        style={{
                                          backgroundColor: '#e2520f',
                                          color: '#ffffff',
                                          padding: '3px 16px',
                                          border: 'none',
                                          borderRadius: '25px',
                                          cursor: 'pointer',
                                          fontSize: '15px',
                                          fontWeight: 'bold',
                                          width: '30%',
                                          marginLeft: "34%"
                                        }}
                                      >
                                        Submit
                                      </button>
                                      {/* <button */}
                                        {/* onClick={closePopup} */}
                                        {/* style={{ */}
                                          {/* backgroundColor: '#e2520f', */}
                                          {/* color: '#ffffff', */}
                                          {/* padding: '3px 16px', */}
                                          {/* border: 'none', */}
                                          {/* borderRadius: '25px', */}
                                          {/* cursor: 'pointer', */}
                                          {/* fontSize: '15px', */}
                                          {/* fontWeight: 'bold', */}
                                          {/* width: '30%', */}
                                          {/* marginLeft: "34%" */}
                                        {/* }} */}
                                      {/* > */}
                                        {/* Close */}
                                      {/* </button> */}
                                    </div>
                                  </fieldset>
                                </div>
                              )}
                              {isPopupVisible && (
                                <div
                                  style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    zIndex: 999,
                                  }}
                                  onClick={closePopup}
                                />
                              )}
                            </>
                          ) : (
                            "Paid"
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Modal;

