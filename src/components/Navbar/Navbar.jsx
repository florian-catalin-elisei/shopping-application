import { AppBar, Toolbar, IconButton, Badge, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = ({ cart }) => {
  const location = useLocation();

  return (
    <div>
      <AppBar position="fixed" color="inherit">
        <Toolbar className="Navbar">
          <Link to="/" className="Navbar-link">
            <Typography variant="h6" className="Navbar-logo">
              <img
                src="https://i.pinimg.com/474x/cc/2c/f1/cc2cf1509516b0fe79b2c4b64e642a0d.jpg"
                alt="Logo"
              />
              ShoppingApp
            </Typography>
          </Link>

          <div>
            {location.pathname === "/" && (
              <Link to="/cart">
                <IconButton aria-label="Show cart items">
                  <Badge badgeContent={cart.total_items} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
