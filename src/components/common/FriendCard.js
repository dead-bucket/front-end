import React from "react";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 160
};
function FriendCard(props) {
  console.log("FriendCard view props", props);
  const { view } = props;
  if (view === "friendview") {
    return (
      <div style={styles}>
        <img
          alt="Profile"
          style={{ borderRadius: 40, width: 175 }}
          src={props.friend[0].picture.large}
        />
        <h4 style={{ marginTop: 0 }}>{props.friend[0].name.first}</h4>
      </div>
    );
  } else if (view === "dashboard") {
    return (
      <div style={styles}>
        <img
          alt="Profile"
          style={{ borderRadius: 20 }}
          src={props.friend.picture.large}
        />
        <p style={{ marginTop: 0 }}>{props.friend.name.first}</p>
      </div>
    );
  }
}
export default FriendCard;
