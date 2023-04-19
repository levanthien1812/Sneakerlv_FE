import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function BrandSelect({ brand, setBrand }) {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data));
  }, []);

  const changeHandler = (event) => {
    setBrand(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Brand</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={brand}
        label="Age"
        onChange={changeHandler}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {brands.map((brand) => (
          <MenuItem key={brand._id} value={brand._id}>
            {brand.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default BrandSelect;
