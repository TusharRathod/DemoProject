import React from "react";

const Minimal = props => {
  const { children } = props;

  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Minimal;
