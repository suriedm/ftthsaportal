"use client"
import React, { useRef, useState, useEffect } from "react";
("../../pages/app");
import { authStore } from "../../src/stores/profile";
import { TransactionResponse, transactionStore } from "../../src/stores/Transaction";
// import { SubscriptionResponse, subscriptionStore } from '@/stores/subscription';
import { useRouter } from "next/navigation";
import { Profile, ProfileResponse } from "../profile/page";
import { subscriptionStore } from "../../src/stores/Subscription";
import type { NextPage } from "next";

const url = `https://stm-dev.intentio.co.za/api/portal/`;

interface SuccessRequest {
  success: boolean;
  message: string;
  paymentRedirect?: string;
  detail?: string;
}

const Modal : NextPage = () => {
  // const { subscriptions, setSubscription } = subscriptionStore()
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const { userId, profile, setProfile } = authStore();
  const { transactions, setTransaction } = transactionStore();
  const { subscriptions } = subscriptionStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(
        `https://stm-dev.intentio.co.za/api/portal/transactions/customer/${userId}`
      );
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

  const handlePay = async (transactionId: number, customerId: number) => {
    //TODO
    const request = await fetch(
      `${url}transactions/${customerId}/pay/${transactionId}`
    );

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
  // const [isClient, setIsClient] = useState(false)

  function logout() {
    // localStorage.removeItem("accessToken");
    window.location.href = "/";
  }
  return (
    <main>
      <section >
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
          <br />
          <br />
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
          <br />
          <br />
          <br />
          <div>
            <table className="table">
              <h6>{isClient ? "" : ""}</h6>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Bill Date</th>
                  <th>Next Bill Date</th>
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
                        <td>{`${updatedDate.getDate()}-${updatedDate.getMonth()}-${updatedDate.getFullYear()} `}</td>
                        <td>
                          {subscription.portal_product.onceoff_description ??
                            "description"}
                        </td>
                        <td>
                          {subscription.portal_product.recurring_price_incl}
                        </td>
                        <td>{`${updatedDate.getDate()}-${updatedDate.getMonth()}-${updatedDate.getFullYear()} `}</td>
                        <td>{`${nextDate.getDate()}-${nextDate.getUTCMonth()}-${nextDate.getFullYear()} `}</td>
                        <td>{subscription.subscription_status}</td>
                        {/* <td>{transaction.status !== "completed" ? <button onClick={()=>handlePay(transaction.id, transaction.portal_end_customer_id)}>Pay Now</button>: "Paid"}</td> */}
                      </tr>
                    );
                  })}
                {/*
              <button className="btn btn-primary" type="button" 
                                    style={{ backgroundColor: '#07022b', border: '1px solid #E2520F ', 
                                    borderRadius: '5px',
                                    left: '84%',position:'absolute'}}
                                    onClick={fetchUserData} 
                                    >PAY NOW</button> */}
                {/* <tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>  */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="head">
          <br />
          <br />
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
          <br />
          <br />
          <br />
          <table className="table">
            <h6>{isClient ? "" : ""}</h6>
            <thead>
              <tr>
                <th>Date</th>
                <th>Next Bill Date</th>
                <th>Description</th>
                <th>Transaction Type</th>
                <th>Payment</th>
                <th>Invoice Bill</th>
                <th>Status</th>
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
                    <tr key={transaction.id}>
                      <td>{`${updatedDate.getDate()}-${updatedDate.getMonth()}-${updatedDate.getFullYear()} `}</td>
                      <td>{`${nextDate.getDate()}-${nextDate.getUTCMonth()}-${nextDate.getFullYear()} `}</td>
                      <td>
                        {transaction.transaction_description ?? "description"}
                      </td>
                      <td>{transaction.transaction_method}</td>
                      <td>R {transaction.amount_incl}</td>
                      <td>R {transaction.amount_incl}</td>
                      <td>{transaction.status}</td>
                      <td>
                        {transaction.status !== "completed" ? (
                          <button
                            onClick={() =>
                              handlePay(
                                transaction.id,
                                transaction.portal_end_customer_id
                              )
                            }
                          >
                            Pay Now
                          </button>
                        ) : (
                          "Paid"
                        )}
                      </td>
                    </tr>
                  );
                })}
              {/*
                 
                 
                 
                 <button className="btn btn-primary" type="button" 
                                    style={{ backgroundColor: '#07022b', border: '1px solid #E2520F ', 
                                    borderRadius: '5px',
                                    left: '84%',position:'absolute'}}
                                    onClick={fetchUserData} 
                                    >PAY NOW</button> */}
              {/* <tr>
          
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>  */}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};
export default Modal;
function setFormValues(data: Profile) {
  throw new Error("Function not implemented.");
}
