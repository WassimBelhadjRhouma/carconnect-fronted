import axios from "axios";
import { Buffer } from "buffer"; // Import the Buffer polyfill

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com"; // Sandbox URL

// Generate access token
const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID; // Replace with your actual Client ID
const clientSecret = process.env.REACT_APP_PAYPAL_SECRET_KEY; // Replace with your actual Client Secret

export const getAccessToken = async () => {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64"); // Base64 encode credentials

  try {
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials", // Body content
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Access Token:", response.data.access_token);
    return response.data.access_token; // Use this token for API calls
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
  }
};

// Create an order
export const createOrderApi = async (amount) => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: amount,
            },
            reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b", // change
          },
        ],
        intent: "CAPTURE",
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
              payment_method_selected: "PAYPAL",
              brand_name: "CarConnect",
              locale: "de-DE",
              landing_page: "LOGIN",
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              return_url: "https://example.com/returnUrl",
              cancel_url: "https://example.com/cancelUrl",
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Order Created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
  }
};

// Capture payment
export const capturePayment = async (accessToken, orderId) => {
  try {
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; // Return transaction details
  } catch (error) {
    console.error(
      "Error capturing PayPal payment:",
      error.response?.data || error.message
    );
    throw new Error("Unable to capture PayPal payment");
  }
};

// Capture Order
export const captureOrderApi = async (orderID: string): Promise<any> => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error capturing order:",
      error.response?.data || error.message
    );
    throw error;
  }
};
