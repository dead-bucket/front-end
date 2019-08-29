import React from "react";
import spinner from "./spinner.gif";

export default function Spinner({ pxSize }) {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: pxSize || "200px", margin: "auto", display: "block" }}
    />
  );
}
