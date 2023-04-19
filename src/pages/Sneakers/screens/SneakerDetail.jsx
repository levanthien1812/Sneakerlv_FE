import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { json, useActionData, useLoaderData } from "react-router";

function SneakerDetail() {
  const { sneaker, categories, related } = useLoaderData();
  return (
    <Stack padding={3}>
      <Grid container>
        <Grid item xs={7}>
          <Stack>
            <Stack
              height={500}
              overflow="hidden"
              marginBottom={2}
              justifyContent="center"
              alignItems="center"
            >
              <img
                style={{ width: "100%" }}
                src={`http://localhost:3000/images/sneakers/${sneaker.id}/${sneaker.coverImage}`}
              ></img>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                overflowX: "scroll",
              }}
            >
              {/* <IconButton>
                <ChevronLeft />
              </IconButton> */}
              {sneaker.images.map((img) => (
                <Stack
                  sx={{ minWidth: "25%", maxWidth: "33.33%" }}
                  height={160}
                  overflow="hidden"
                  justifyContent="center"
                  alignItems="center"
                  flexShrink={0}
                >
                  <img
                    style={{ width: "100%" }}
                    src={`http://localhost:3000/images/sneakers/${sneaker.id}/${img}`}
                  ></img>
                </Stack>
              ))}
              {/* <IconButton>
                <ChevronRight />
              </IconButton> */}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack paddingX={4} paddingTop={2}>
            <Typography variant="p" fontSize={30} marginBottom={2}>
              {sneaker.brand.name}
            </Typography>
            <Typography
              variant="h2"
              fontSize={36}
              marginBottom={3}
              fontWeight={600}
            >
              {sneaker.name}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack></Stack>
    </Stack>
  );
}

export const sneakerLoader = async ({ request, params }) => {
  const resonse = await fetch(
    "http://localhost:3000/api/sneakers/" + params.slug
  );

  if (!resonse.ok) {
    throw json(
      { message: "Error when loading sneaker detail!" },
      { status: 500 }
    );
  }

  const { data } = await resonse.json();
  return data;
};

export default SneakerDetail;
