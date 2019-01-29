import React from "react";

const dashboardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 150,
  height: 150
};

const friendViewStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const friendViewImage = {
  width: 150,
  borderRadius: 40
};

function FriendCard(props) {
  const { view, friend } = props;

  if (view === "friendview") {
    return (
      <div style={friendViewStyles}>
        <img alt="Profile" style={friendViewImage} src={friend.picture} />
        <h4 style={{ marginTop: 0 }}>{friend.name}</h4>
      </div>
    );
  } else if (view === "dashboard") {
    return (
      <div style={dashboardStyles}>
        <img
          alt="Profile"
          style={{ borderRadius: 40, width: 100 }}
          src={friend.picture}
          onClick={() => props.handleSetTarget(friend)}
        />
        <p style={{ marginTop: 0 }}>{props.friend.name}</p>
      </div>
    );
  }
}
export default FriendCard;
