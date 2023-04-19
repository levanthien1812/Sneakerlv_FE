import { Divider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SortBy from "./SortBy";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function SneakerFilter() {
  const [brands, setBrands] = useState([]);
  const [brandOption, setBrandOption] = useState("");
  const [priceOption, setPriceOtpion] = useState("");
  const [sizeOption, setSizeOption] = useState("");
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const navigate = useNavigate();

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
      min: 0,
      max: 500000,
    },
    {
      id: "p2",
      text: "Từ 500.000đ - 1.000.000đ",
      min: 500000,
      max: 1000000,
    },
    {
      id: "p3",
      text: "Từ 1.000.000đ - 3.000.000đ",
      min: 1000000,
      max: 3000000,
    },
    {
      id: "p4",
      text: "Trên 3.000.000đ",
      min: 3000000,
      max: 10000000,
    },
  ];

  // Load brands for the first time
  useEffect(() => {
    fetch("http://localhost:3000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data));
    // add catch
  }, []);

  const brandChangeHandler = (event) => {
    setBrandOption(event.target.value);
    searchParams.set('brand', event.target.value)
    navigate('?' + searchParams.toString())
  };

  const priceChangeHandler = (event) => {
    setPriceOtpion(event.target.value);
    const [min, max] = event.target.value.split('-')
    searchParams.set("price", max);
    navigate("?" + searchParams.toString());
  };

  const sizeChangeHandler = (event) => {
    setSizeOption(event.target.value);
    searchParams.set("size", event.target.value);
    navigate("?" + searchParams.toString());
  };

  return (
    <Stack width={230} sx={{ flexShrink: 0 }} padding={3}>
      <SortBy searchParams={ searchParams } />
      <Stack>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Brands</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Adidas"
            name="brands"
            onChange={brandChangeHandler}
            value={brandOption}
          >
            {brands.map((brand) => (
              <FormControlLabel
                key={brand.id}
                value={brand.slug}
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
            name="prices"
            onChange={priceChangeHandler}
            value={priceOption}
          >
            {prices.map((price) => (
              <FormControlLabel
                key={price.id}
                value={price.min + '-' + price.max}
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
            name="sizes"
            sx={{
              height: "500px",
            }}
            onChange={sizeChangeHandler}
            value={sizeOption}
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
