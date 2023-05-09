import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const isAuthed = useSelector((state) => state.auth.isAuthenticated);

  return <div>{isAuthed ? <Outlet /> : <Navigate to="/not-authed" />}</div>;
}

export default PrivateRoute;
