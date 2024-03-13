import { Typography, Button, Divider } from "@mui/material";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Review } from "../Review/Review";

export const PaymentForm = ({ token, shippingData, backStep, nextStep, handleCaptureCheckout }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: token.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.subdivisions,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fulfillment: {
          shipping_method: shippingData.option,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      handleCaptureCheckout(token.id, orderData);
      nextStep();
    }
  };

  return (
    <div>
      <Review token={token} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement />

              <br />
              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>

                <Button type="submit" variant="contained" disabled={!stripe}>
                  Pay {token.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};
