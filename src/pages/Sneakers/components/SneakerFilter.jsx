import { Divider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function SneakerFilter() {
  const [brands, setBrands] = useState([]);

  // Initialize sizes
  const sizes = [];
  for (let i = 0; i < 9; i++) {
    sizes.push(35 + i);
    sizes.push(35 + i + 0.5);
  }

  // Initialize prices
  const prices = [
    {
      id: "p1",
      text: "Dưới 500.000đ",
      min: "0",
      max: "500000",
    },
    {
      id: "p2",
      text: "Từ 500.000đ - 1.000.000đ",
      min: "500000",
      max: "1000000",
    },
    {
      id: "p3",
      text: "Từ 1.000.000đ - 5.000.000đ",
      min: "1000000",
      max: "5000000",
    },
    {
      id: "p4",
      text: "Trên 5.000.000đ",
      min: "5000000",
      max: "10000000",
    },
  ];

  // Load brands for the first time
  useEffect(() => {
    fetch("http://localhost:3000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data));
    // add catch
  }, []);

  return (
    <Stack width={230} sx={{ flexShrink: 0 }} padding={3}>
      <Stack>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Brands</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Adidas"
            name="radio-buttons-group"
          >
            {brands.map((brand) => (
              <FormControlLabel
                key={brand.id}
                value={brand.name}
                control={<Radio />}
                label={brand.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
      <Divider />
      <Stack>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Prices</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {prices.map((price) => (
              <FormControlLabel
                key={price.id}
                value={price.min + "-" + price.max}
                control={<Radio />}
                label={price.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
      <Divider />
      <Stack>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Sizes</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Adidas"
            name="radio-buttons-group"
            sx={{
              height: "500px",
            }}
          >
            {sizes.map((size) => (
              <FormControlLabel
                key={size}
                value={size}
                control={<Radio />}
                label={size}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default SneakerFilter;
