import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateComponents = () => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.Authentication
  );

  return isAuthenticated && user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateComponents;
