import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticationService } from "../../services";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentAdmin = authenticationService.currentAdminValue;
        if (!currentAdmin) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
}
