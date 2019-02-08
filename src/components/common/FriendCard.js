import React from "react";

const dashboardStyles = {
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 150,
  height: 150
};

const friendViewStyles = {
  cursor: "pointer",
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
  const { view, friend, classes } = props;

  if (view === "friendview") {
    return (
      <div style={friendViewStyles}>
        <img alt="Profile" style={friendViewImage} src={friend.picture} />
        <h4 style={{ marginTop: 0 }}>
          {props.friend.lastname
            ? `${props.friend.firstname} ${props.friend.lastname}`
            : props.friend.username}
        </h4>
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
        <i
          className="material-icons red600"
          onClick={() => props.handleToggle(friend)}
        >
          {friend.priority ? "favorite" : "favorite_border"}
          {/* favorite_border */}
        </i>
        <p style={{ marginTop: 0 }}>
          {props.friend.lastname
            ? `${props.friend.firstname} ${props.friend.lastname}`
            : props.friend.username}
        </p>
      </div>
    );
  }
}
export default FriendCard;
