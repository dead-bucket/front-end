import React from "react";
import "./profilecard.css";
export default function ProfileCard(props) {
  const { picture, firstname, lastname, username, email } = props.user;
  return (
    <div id="profile_card">
      <img id="profile_user_image" src={picture} alt="current user" />
      <div id="profile_user_info">
        <p>
          <strong>Name: </strong> {firstname} {lastname}
        </p>
        <p>
          <strong>Username: </strong> {username}
        </p>
        <p>
          <strong>Email: </strong> {email}
        </p>
      </div>
    </div>
  );
}
