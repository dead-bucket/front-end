import React from "react";
const dashboard = {
  container: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    position: "relative"
  },
  image: {
    width: 90
  },
  name: {
    fontSize: 16,
    marginTop: 5
  },
  notificationIcon: {
    width: "36px",
    position: "absolute",
    left: "70%",
    top: "0%"
  },
  favoriteIcon: {
    position: "absolute",
    left: "80%",
    bottom: "27%"
  },
  deleteContainer: {
    position: "absolute",
    width: 90,
    height: 90,
    top: 6,
    border: "3px dashed #EE5F3F",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0, .5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteIcon: {
    fontSize: 60,
    color: "#EE5F3F"
  }
};

const friendview = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: 170
  },
  image: {
    width: 100,
    marginTop: 10,
    height: 100,
    minHeight: 100
  },
  name: {
    fontFamily: "Satisfy, cursive",
    fontSize: "1.5rem",
    margin: "5px auto",
    color: "#EE5F3F"
  },
  notificationIcon: {
    width: 50,
    position: "absolute",
    left: 100,
    top: 0
  }
};

const notificationPic = require("./thoughtline-logo-primary.svg");
function FriendCard(props) {
  const { view, friend, loggedInUser, deleteLayer } = props;
  let currentUser = loggedInUser || { newmessages: [] };
  if (view === "friendview") {
    return (
      <div style={friendview.container}>
        <img
          style={{
            visibility: currentUser.newmessages.includes(friend._id)
              ? "visible"
              : "hidden",
            ...friendview.notificationIcon
          }}
          src={notificationPic}
          alt={friend.firstname}
        />
        <img alt="Profile" style={friendview.image} src={friend.picture} />
        <p style={friendview.name}>
          {friend.lastname
            ? `${friend.firstname} ${friend.lastname.slice(0, 1)}.`
            : friend.username}
        </p>
      </div>
    );
  } else if (view === "dashboard") {
    return (
      <div style={dashboard.container}>
        <img
          style={{
            visibility: currentUser.newmessages.includes(friend._id)
              ? "visible"
              : "hidden",
            ...dashboard.notificationIcon
          }}
          src={notificationPic}
          alt={"You have new Thoughts from this friend"}
        />
        <div
          style={{
            visibility: deleteLayer ? "visible" : "hidden",
            ...dashboard.deleteContainer
          }}
          onClick={() => props.remove(friend)}
        >
          <i
            className="material-icons"
            style={{
              ...dashboard.deleteIcon
            }}
          >
            delete_forever
          </i>
        </div>
        <img
          alt={friend.firstname}
          style={dashboard.image}
          src={friend.picture}
          onClick={() => props.handleSetTarget(friend)}
        />
        <i
          style={dashboard.favoriteIcon}
          className="material-icons red600"
          onClick={() => props.handleToggle(friend)}
        >
          {friend.priority ? "favorite" : "favorite_border"}
        </i>
        <p style={dashboard.name}>
          {friend.lastname
            ? `${friend.firstname} ${friend.lastname.slice(0, 1)}.`
            : friend.username}
        </p>
      </div>
    );
  }
}
export default FriendCard;
