import { Product } from "../Product/Product";
import { Grid } from "@mui/material";
import "./Products.css";

export const Products = ({ products, handleAddToCart }) => {
  return (
    <div>
      <Grid className="Products" container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id}>
            <Product product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
