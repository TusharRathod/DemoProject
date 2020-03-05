import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouter = ({ layout: Layout, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps =>
      localStorage.getItem("warrior") ? (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: "/sign-in",
            state: { from: matchProps.location }
          }}
        />
      )
    }
  />
);

export default PrivateRouter;
