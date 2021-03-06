import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

function PrivateCustomerRoute({ component: Component, isLoggedin,isBusinessAccount, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        {  if(!isLoggedin) {
          return (<Redirect to="/login"/>)
        } else if (isLoggedin && !isBusinessAccount) {
          return (<Component {...props} />)
        } else {
          return (<Redirect to="/business"/>)
        }
      }}
    />
  );
}

export default withAuth(PrivateCustomerRoute);
