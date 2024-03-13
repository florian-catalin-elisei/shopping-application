import { Typography, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import "./CartItem.css";

export const CartItem = ({ item, handleUpdateCartQuantity, handleRemoveFromCart }) => {
  return (
    <Card>
      <CardMedia className="CartItem-image" image={item.image.url} alt={item.product_name} />

      <CardContent>
        <Typography variant="h4">{item.product_name}</Typography>
        <Typography variant="h6">{item.price.formatted_with_symbol}</Typography>
      </CardContent>

      <CardActions className="CartItem-actions">
        <div className="CartItem-buttons">
          <Button size="small" onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button size="small" onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}>
            +
          </Button>
        </div>

        <Button variant="contained" color="error" onClick={() => handleRemoveFromCart(item.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
