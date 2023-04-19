import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";

function SortBy({ searchParams }) {
  const navigate = useNavigate();

  const sortOptions = [
    {
      id: "so0",
      text: "None",
      queryString: "",
    },
    {
      id: "so1",
      text: "Giá: Cao tới thấp",
      queryString: "-price",
    },
    {
      id: "so2",
      text: "Giá: Thấp tới cao",
      queryString: "price",
    },
    {
      id: "so3",
      text: "Mới nhất",
      queryString: "createdAt",
    },
    {
      id: "so4",
      text: "Bán chạy nhất",
      queryString: "totalSold",
    },
  ];

  const [option, setOption] = useState(sortOptions[0].queryString);

  const handleChange = (event) => {
    setOption(event.target.value);
    searchParams.set("sort", event.target.value);
    navigate("?" + searchParams.toString());
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Sort by</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={option}
        label="Sort by"
        onChange={handleChange}
      >
        {sortOptions.map((opt) => (
          <MenuItem key={opt.id} value={opt.queryString}>
            {opt.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortBy;
