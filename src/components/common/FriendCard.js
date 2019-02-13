import React from "react";

const dashboardStyles = {
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 150,
  height: 150,
  position: "relative",
};

const friendViewStyles = {
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const friendViewImage = {
  width: 150,
  borderRadius: 40
};
const iconStyleTopRight = {
  width: "24px",
  position: "absolute",
  left: "80%",
  top: "0%",
  
}
const iconStyleBottomRight = {
  position: "absolute",
  left: "80%",
  bottom: "27%",
  
}
const notificationPic = require("./notification.png");

function FriendCard(props) {
  const { view, friend, loggedInUser } = props;
  // console.log('logged in user in friend card', loggedInUser);

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
        <img  style={{visibility: loggedInUser.newmessages.includes(friend._id) ? "visible" : "hidden", ...iconStyleTopRight}}
          src={notificationPic}
          alt={'this is a cool pic'}
            
        />
        <img
          alt="Profile"
          style={{ borderRadius: 40, width: 100 }}
          src={friend.picture}
          onClick={() => props.handleSetTarget(friend)}
        />
        <i
          style={iconStyleBottomRight}
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
