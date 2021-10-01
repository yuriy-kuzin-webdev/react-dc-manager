import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import DcContext from "../store/dc-context";

export default function PrivateRoute({ component: Component, ...rest }) {
  const context = useContext(DcContext);
  const currentUser = context.currentManager;

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
