import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import SneakerFilter from "../components/SneakerFilter";
import { Pagination, Stack } from "@mui/material";
import SneakersList from "../components/SneakersList";

function SneakersPage() {
  const navigate = useNavigate();
  const [sneakers, setSneakers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchSneakers = () => {
    fetch("http://localhost:3000/api/sneakers")
      .then((res) => res.json())
      .then((data) => setSneakers(data.data));
  };

  useEffect(() => {
    fetchSneakers();
  }, []);

  const paginationHandler = (event, value) => {
    setCurrentPage(value);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentSneakers = sneakers.slice(firstItemIndex, lastItemIndex);

  return (
    <Stack direction="row" spacing={2}>
      <SneakerFilter />
      <Stack spacing={4} padding={5} justifyContent="center">
        <SneakersList currentSneakers={currentSneakers} />
        <Stack alignItems="center">
          <Pagination count={10} shape="rounded" onChange={paginationHandler} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SneakersPage;
