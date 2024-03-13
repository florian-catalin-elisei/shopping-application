import { useState, useEffect } from "react";
import { AddressForm } from "../AddressForm/AddressForm";
import { PaymentForm } from "../PaymentForm/PaymentForm";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

import { Paper, Stepper, Step, StepLabel, Typography, Divider, Button } from "@mui/material";

import "./Checkout.css";

export const Checkout = ({ cart, handleCaptureCheckout }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [token, setToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const steps = ["Shipping address", "Payment details"];

  useEffect(() => {
    const generateToken = async () => {
      if (cart.id) {
        const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
        setToken(token);
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm token={token} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        token={token}
        backStep={backStep}
        nextStep={nextStep}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    );

  const Confirmation = () => (
    <div>
      <div>
        <Typography variant="h5" style={{ marginTop: "10px" }}>
          Thank you for your purchase
        </Typography>
        <Divider />
      </div>

      <br />

      <Button component={Link} to="/" variant="outlined">
        Back to Home
      </Button>
    </div>
  );

  return (
    <div>
      <div className="Checkout">
        <Paper className="Checkout-paper">
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>

          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? <Confirmation /> : Form()}
        </Paper>
      </div>
    </div>
  );
};
