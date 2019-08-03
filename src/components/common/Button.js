import React from "react";
import "./Button.css";

// style props (one required)
//  PROP   -  className
// primary - .tl-btn-primary - blue background
// secondary - .tl-btn-secondary - orange background
export default function Button({
  disabled = false,
  children,
  handleClick,
  primary,
  secondary
}) {
  let propColor = primary
    ? "tl-btn-primary"
    : secondary
    ? "tl-btn-secondary"
    : "null";

  if (disabled) propColor = "disabled-btn";
  return (
    <button className={propColor} disabled={disabled} onClick={handleClick}>
      {disabled ? "Please Complete the Form" : children}
    </button>
  );
}
