import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalBtn = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "clientId":
          "AQ3fsMyaaHJWF4knonWVdeS5H8OMX26z5GHXrLz47qq-Ny6fb7kmq0nXDkP__OAghi6hNg2E05ofebna",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalBtn;
