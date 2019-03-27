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
    <h3 style={{ textAlign: "center" }}>There is no Thoughtline page for:</h3>

    <code style={{ backgroundColor: "lightgrey", fontSize: 30 }}>
      {location.pathname}
    </code>

    <h2>
      Maybe go to <Link to="/">Login</Link> where it's safe.
    </h2>
  </div>
);

export default NoMatch;
