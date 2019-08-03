export default {
  floatingLabel: {
    color: "white"
  },
  passwordEye: {
    fontSize: "1rem"
  },
  cssLabel: {
    color: "white",
    fontSize: ".9rem"
  },
  cssFocused: {
    color: "#87cefa"
  },

  cssOutlinedInput: {
    borderColor: `lightskyblue !important`,
    color: "white !important",
    "&$cssFocused $notchedOutline": {
      borderColor: `lightskyblue !important`,
      color: "white !important"
    }
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#e8745a !important",
    color: "lightskyblue"
  }
};
