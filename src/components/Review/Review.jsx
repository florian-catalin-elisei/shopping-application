import { Typography, List, ListItem, ListItemText } from "@mui/material";

export const Review = ({ token }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <List disablePadding>
        {token.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}>
              <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
            </ListItemText>
          </ListItem>
        ))}

        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />

          <Typography variant="subtitle1" style={{ fontWeight: "700" }}>
            {token.total_with_tax.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </div>
  );
};
