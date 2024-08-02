const axios = require("axios");
const crypto = require("crypto");

const merchantId = "your_merchant_id";
const saltKey = "your_salt_key";
const payload = {
  amount: 100,
  merchantTransactionId: "unique_transaction_id",
  merchantUserId: "user_id",
  // other required fields
};

const payloadString = JSON.stringify(payload);
const saltIndex = "1";
const requestPath = "/pg/v1/pay";
const baseUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox";

const dataToSign = requestPath + payloadString + saltKey;
const signature = crypto
  .createHash("sha256")
  .update(dataToSign)
  .digest("base64");

const options = {
  method: "POST",
  url: `${baseUrl}${requestPath}`,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "X-VERIFY": `${signature}###${saltIndex}`,
    "X-MERCHANT-ID": merchantId,
  },
  data: payload,
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

app.post("/api/initiate-payment", (req, res) => {
  const { amount, merchantTransactionId, merchantUserId } = req.body;

  // Call the PhonePe API as shown in the backend integration code
  // Ensure to handle and send back the redirectUrl for the frontend to use

  const response = {
    redirectUrl: "phonepe_payment_url", // Replace with actual URL from PhonePe response
  };

  res.json(response);
});
