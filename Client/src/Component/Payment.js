import React from "react";
import axios from "axios";

const PhonePePayment = () => {
  const initiatePayment = () => {
    axios
      .post("/api/initiate-payment", {
        amount: 100,
        merchantTransactionId: "unique_transaction_id",
        merchantUserId: "user_id",
      })
      .then((response) => {
        window.location.href = response.data.redirectUrl;
      })
      .catch((error) => {
        console.error("Payment initiation failed", error);
      });
  };

  return (
    <div>
      <button onClick={initiatePayment}>Pay with PhonePe</button>
    </div>
  );
};

export default PhonePePayment;
