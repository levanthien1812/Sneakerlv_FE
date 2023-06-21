import React from "react";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { ThemeProvider, createTheme } from "@mui/material";

function Layout() {
  const theme = createTheme({
    typography: {
      fontFamily: "Pathway Extreme, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
