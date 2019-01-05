import React from "react";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 150,
  height: 150
};

const profImg =
  "https://eadb.org/wp-content/uploads/2015/08/profile-placeholder-300x300.jpg";

function FriendCard(props) {
  const { view } = props;
  if (view === "friendview") {
    return (
      <div style={styles}>
        <img
          alt="Profile"
          style={{ borderRadius: 40, width: 175 }}
          src={profImg}
        />
        <h4 style={{ marginTop: 0 }}>{props.friend[0].name.first}</h4>
      </div>
    );
  } else if (view === "dashboard") {
    return (
      <div style={styles}>
        <img
          alt="Profile"
          style={{ borderRadius: 40, width: 100 }}
          src={profImg}
        />
        <p style={{ marginTop: 0 }}>{props.friend.name}</p>
      </div>
    );
  }
}
export default FriendCard;
