import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import "./Product.css";

export const Product = ({ product, handleAddToCart }) => {
  return (
    <Card className="Product">
      <CardMedia className="Product-image" image={product.image.url} title={product.name} />
      <CardContent>
        <div className="Product-info">
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="h6">{product.price.formatted_with_symbol}</Typography>
        </div>

        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="GrayText"
        />
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          className="Product-icon"
          aria-label="Add to Cart"
          onClick={() => handleAddToCart(product.id, 1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};
