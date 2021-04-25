import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ user, loggedInPath, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }
        return null;
      }}
    />
  );
};

export default ProtectedRoute;
