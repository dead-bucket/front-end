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
    <h5 style={{ textAlign: "center" }}>There is no Thoughtline page for:</h5>
    <h5>
      <code style={{ backgroundColor: "lightgrey" }}>{location.pathname}</code>
    </h5>
    <p>
      Maybe go to <Link to="/">Login</Link> where it's safe.
    </p>
  </div>
);

export default NoMatch;
