import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { captureOrderApi, createOrderApi } from "../../services/paypalService";

interface ComponentProps {
  amount?: string;
  handlePaymentSucceed?: () => void;
}

const PaypalComponent: React.FC<ComponentProps> = ({
  amount = 30,
  handlePaymentSucceed,
}) => {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    disableFunding: "card",
    currency: "EUR",
  };
  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "pill",
    layout: "vertical",
    color: "blue",
    disableMaxWidth: true,
  };
  const displayOnly: PayPalButtonsComponentProps["displayOnly"] = ["vaultable"];

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const orderData = await createOrderApi(amount);
      console.log(orderData);

      if (!orderData.id) {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;
    } catch (error) {
      console.error("Error in createOrder:", error);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    try {
      const details = await captureOrderApi(data.orderID);
      handlePaymentSucceed();
      console.log(details);
    } catch (error) {
      console.error("Error in onApprove:", error);
      alert("An error occurred while capturing the order. Please try again.");
    }
  };
  const onCancel: PayPalButtonsComponentProps["onCancel"] = (data) => {
    console.log("cancelled", data);
  };
  const onError: PayPalButtonsComponentProps["onError"] = (err) => {
    window.location.assign("/your-error-page-here");
  };
  return (
    <>
      {" "}
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          displayOnly={displayOnly}
          createOrder={createOrder}
          style={styles}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onError}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PaypalComponent;
