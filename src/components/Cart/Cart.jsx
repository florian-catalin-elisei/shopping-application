import { CartItem } from "../CartItem/CartItem";
import { Container, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./Cart.css";

export const Cart = ({ cart, handleUpdateCartQuantity, handleRemoveFromCart, handleEmptyCart }) => {
  const isCartEmpty = !cart.line_items?.length;

  const EmptyCart = () => (
    <Typography className="EmptyCart" variant="subtitle1">
      You have no items in your shopping cart, start adding some!
    </Typography>
  );

  const FilledCart = () => (
    <div className="FilledCart">
      <Grid container spacing={2}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>

      <div className="FilledCart-info">
        <Typography variant="h6">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>

        <div>
          <Button
            className="FilledCart-button"
            size="large"
            variant="contained"
            color="error"
            onClick={handleEmptyCart}>
            Clear
          </Button>

          <Link to="/checkout">
            <Button size="large" variant="contained">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <Container>
      <Typography className="Cart-title" variant="h4">
        Your Shopping Cart
      </Typography>

      {isCartEmpty ? EmptyCart() : FilledCart()}
    </Container>
  );
};
