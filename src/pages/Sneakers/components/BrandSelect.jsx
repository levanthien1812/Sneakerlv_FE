import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function BrandSelect({ brand, setBrand }) {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await fetch("http://localhost:3000/api/brands");

      if (!response.ok) {
        throw new Error("Fail to fetch brands!");
      }

      return await response.json();
    };

    fetchBrands()
      .then((data) => {
        setBrands(data.data);
      })
      .catch((e) => {
        throw e;
      });
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
