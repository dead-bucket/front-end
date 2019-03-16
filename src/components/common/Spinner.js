import React from "react";
import spinner from "./spinner.gif";
const spinnerStyle = {
  height: "500px",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
export default function Spinner() {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  );
}
