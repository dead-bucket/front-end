import React from "react";
import "./profilecard.css";
export default function ProfileCard(props) {
  const { picture, firstname, lastname, username, email } = props.user;
  return (
    <div id="profile_card">
      <img
        id="profile_user_image"
        src={`${picture}?${new Date().getTime()}`}
        alt="current user"
      />
      <div id="profile_user_info">
        <p className="profile_info">
          <strong>Name: </strong> {firstname} {lastname}
        </p>
        <p className="profile_info">
          <strong>Username: </strong> {username}
        </p>
        <p className="profile_info">
          <strong>Email: </strong> {email}
        </p>
      </div>
    </div>
  );
}
