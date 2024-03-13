import { useState, useEffect } from "react";
import { InputLabel, TextField, Select, MenuItem, Typography, CssBaseline } from "@mui/material";
import { useForm } from "react-hook-form";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";
import "./AddressForm.css";

export const AddressForm = ({ token, next }) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [subdivision, setSubdivision] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const { register, handleSubmit } = useForm();

  const getCountries = async (token) => {
    const { countries } = await commerce.services.localeListShippingCountries(token);
    setCountries(countries);
    setCountry(Object.keys(countries)[0]);
  };

  const countriesItems = Object.entries(countries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const getSubdivisions = async (token, countryCode) => {
    const { subdivisions } = await commerce.services.localeListShippingSubdivisions(
      token,
      countryCode
    );
    setSubdivisions(subdivisions);
    setSubdivision(Object.keys(subdivisions)[0]);
  };

  const subdivisionsItems = Object.entries(subdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const getOptions = async (tokenId, country, region = null) => {
    try {
      const options = await commerce.checkout.getShippingOptions(tokenId, { country, region });
      setOptions(options);
      setOption(options[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const optionsItems = options.map((option) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  useEffect(() => {
    if (token) {
      getCountries(token);
    }
  }, [token]);

  useEffect(() => {
    if (token && country) {
      getSubdivisions(token, country);
    }
  }, [token, country]);

  useEffect(() => {
    if (token && country && subdivision) {
      getOptions(token.id, country, subdivision);
    }
  }, [token, country, subdivision]);

  const onSubmit = (data) => next({ ...data, country, subdivision, option });

  return (
    <div>
      <CssBaseline />
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <InputLabel className="AddressForm-label">First Name:</InputLabel>
        <TextField
          className="AddressForm-input"
          {...register("firstName")}
          variant="filled"
          size="small"
          fullWidth
          required
        />

        <InputLabel className="AddressForm-label">Last Name:</InputLabel>
        <TextField
          className="AddressForm-input"
          {...register("lastName")}
          variant="filled"
          size="small"
          fullWidth
          required
        />

        <InputLabel className="AddressForm-label">Address:</InputLabel>
        <TextField
          className="AddressForm-input"
          {...register("address")}
          variant="filled"
          size="small"
          fullWidth
          required
        />

        <InputLabel className="AddressForm-label">Email:</InputLabel>
        <TextField
          className="AddressForm-input"
          {...register("email")}
          variant="filled"
          size="small"
          fullWidth
          required
        />

        <InputLabel className="AddressForm-label">City:</InputLabel>
        <TextField
          className="AddressForm-input"
          {...register("city")}
          variant="filled"
          size="small"
          fullWidth
          required
        />

        <InputLabel className="AddressForm-label">Postal Code:</InputLabel>
        <TextField
          className="AddressForm-input"
          {...register("postalCode")}
          variant="filled"
          size="small"
          fullWidth
          required
        />

        <InputLabel className="AddressForm-label">Shipping Country</InputLabel>
        <Select
          value={country || ""}
          onChange={(e) => setCountry(e.target.value)}
          variant="filled"
          fullWidth>
          {countriesItems.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.label}
            </MenuItem>
          ))}
        </Select>

        <InputLabel className="AddressForm-label">Shipping Subdivisions</InputLabel>
        <Select
          value={subdivision || ""}
          onChange={(e) => setSubdivision(e.target.value)}
          variant="filled"
          fullWidth>
          {subdivisionsItems.map((subdivision) => (
            <MenuItem key={subdivision.id} value={subdivision.id}>
              {subdivision.label}
            </MenuItem>
          ))}
        </Select>

        <InputLabel className="AddressForm-label">Shipping Options</InputLabel>
        <Select
          value={option || ""}
          onChange={(e) => setOption(e.target.value)}
          variant="filled"
          fullWidth>
          {optionsItems.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <div className="AddressForm-buttons">
          <TextField
            component={Link}
            to="/cart"
            type="button"
            value="Back to Cart"
            size="small"
            className="AddressForm-button"
          />
          <TextField type="submit" value="Next" size="small" className="AddressForm-button" />
        </div>
      </form>
    </div>
  );
};
