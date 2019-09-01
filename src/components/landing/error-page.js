import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../common/NavBar";
const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
  weight: "100%"
};
const Epage = () => (
  <div>
    <NavBar />
    <div style={styles}>
      <h1>Unable to Reset Password</h1>
      <h3 style={{ textAlign: "center" }}>The Reset link is invalid</h3>

      

      <h2>
        You can send a new link by clicking here <Link to="/">Login</Link>
      </h2>
    </div>
  </div>
);

export default Epage;