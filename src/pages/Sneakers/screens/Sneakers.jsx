import React, { useEffect, useState } from "react";
import { json, redirect, useLoaderData, useNavigate } from "react-router-dom";
import SneakerFilter from "../components/SneakerFilter";
import { Pagination, Stack } from "@mui/material";
import SneakersList from "../components/SneakersList";

function SneakersPage() {
  const [sneakers, setSneakers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const sneakersFetched = useLoaderData();
  
  const fetchSneakers = () => {
    setSneakers(sneakersFetched)
  }

  useEffect(() => {
    fetchSneakers();
  }, []);

  const paginationHandler = (event, value) => {
    setCurrentPage(value);
  };

  const pagesCount = Math.floor(sneakers.length / itemsPerPage) + 1;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentSneakers = sneakers.slice(firstItemIndex, lastItemIndex);

  return (
    <Stack direction="row" spacing={2}>
      <SneakerFilter />
      <Stack spacing={4} padding={5} flexGrow={1}>
        <SneakersList currentSneakers={currentSneakers} />
        <Stack alignItems="center">
          <Pagination
            count={pagesCount}
            shape="rounded"
            onChange={paginationHandler}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export const sneakersLoader = async () => {
  const sneakers = fetch("http://localhost:3000/api/sneakers")
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => {
      throw json({ message: "Could not fetch sneakers!" }, { status: 500 });
    });
  return sneakers
};

export default SneakersPage;
