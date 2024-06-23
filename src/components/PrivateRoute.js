import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return auth.userName ? children : <Navigate to="/log-in" />;
};

export default PrivateRoute;
