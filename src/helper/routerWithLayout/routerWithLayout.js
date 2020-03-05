import React from "react";
import { Route, Redirect } from "react-router-dom";

const RouterWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProp =>
        !localStorage.getItem("warrior") ? (
          <Layout>
            <Component {...matchProp} />
          </Layout>
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: matchProp.location } }}
          />
        )
      }
    />
  );
};

export default RouterWithLayout;
