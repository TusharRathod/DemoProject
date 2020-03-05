import React from "react";
import Header from "./header/header";

const Main = props => {
  const { children } = props;

  return (
    <div>
      <Header children={children.props} />
      <main>{children}</main>
    </div>
  );
};

export default Main;
