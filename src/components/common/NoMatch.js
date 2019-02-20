import React from "react";
import { Link } from "react-router-dom";
const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
  weight: "100%"
};
const NoMatch = ({ location }) => (
  <div style={styles}>
    <h1>Oopsie!</h1>
    <h5>
      There is no Thoughtline page for "
      <strong>
        <code>{location.pathname}</code>
      </strong>
      " !
    </h5>
    <p>
      Maybe go to <Link to="/">Login</Link> where it's safe.
    </p>
  </div>
);

export default NoMatch;
