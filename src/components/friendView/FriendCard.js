import React from "react";

function FriendCard(props) {
  console.log("FriendCard props", props);
  return (
    <div>
      <img
        alt="Profile"
        style={{ borderRadius: 40, width: 175 }}
        src={props.friend[0].picture.large}
      />
      <h4 style={{ marginTop: 0 }}>{props.friend[0].name.first}</h4>
    </div>
  );
}
export default FriendCard;
