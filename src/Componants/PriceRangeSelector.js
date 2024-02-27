import React, { useState } from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const PriceRangeSelector = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Generate price options
  const generatePriceOptions = () => {
    const options = [];
    for (let price = 0; price <= 500000; price += 50000) {
      options.push(price);
    }
    for (let price = 600000; price <= 2000000; price += 100000) {
      options.push(price);
    }
    return options;
  };

  const priceOptions = generatePriceOptions();

  // Customizing the dropdown menu style
  const dropdownStyle = {
    PaperProps: {
      style: {
        maxHeight: 200, // Adjust this value to control the max height of the dropdown
        width: 250, // Adjust this value to control the width of the dropdown
      },
    },
  };

  return (
    <Grid container spacing={2} className="price-range-selector-container">
      <Grid item xs={6} className="price-range-field-container">
        <FormControl fullWidth>
          <InputLabel shrink={true} >Minimum Price</InputLabel>
          <Select
          className="price-range-text-field"
            value={minPrice}
            onChange={handleMinPriceChange}
            label="Minimum Price"
            displayEmpty
            MenuProps={dropdownStyle} // Apply the custom style here
          >
            {priceOptions.map((price) => (
              <MenuItem key={price} value={price}>
                £{price.toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} className="price-range-field-container">
        <FormControl fullWidth>
          <InputLabel shrink={true}>Maximum Price</InputLabel>
          <Select
          className="price-range-text-field"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            label="Maximum Price"
            displayEmpty
            MenuProps={dropdownStyle} // Apply the custom style here
          >
            {priceOptions.map((price) => (
              <MenuItem key={price} value={price}>
                £{price.toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  function handleMinPriceChange(event) {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
    // Call onPriceChange with the new min price and the current max price
    onPriceChange(newMinPrice, maxPrice);
  }

  function handleMaxPriceChange(event) {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
    // Call onPriceChange with the current min price and the new max price
    onPriceChange(minPrice, newMaxPrice);
  }
};

export default PriceRangeSelector;
