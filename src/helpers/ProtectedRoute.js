import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return <Redirect to={{ pathname: ROUTES.LOGIN }} />;
        }
        return null;
      }}
    />
  );
};

export default ProtectedRoute;
