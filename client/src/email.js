import React from "react";
import "./index.css";
import { useState } from "react";
import InviteButton from "./invite";

function Mail({ li }) {
  const [friendEmail, setFriendEmail] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  let code;
  if (user) {
    code = user.uid.slice(0, 2);
    code = code + li;
  }

  const handleSendInvite = () => {
    console.log("Friend's Email:", friendEmail);
  };

  return (
    <>
      {user ? (
        <div className="post">
          <h2 style={{ color: "white" }}>PLEASE ENTER</h2>

          <input
            type="text"
            placeholder="friend's email"
            className="femial"
            value={friendEmail}
            onChange={(event) => setFriendEmail(event.target.value)}
          />

          <InviteButton friendEmail={friendEmail} code={code}></InviteButton>
        </div>
      ) : (
        <div className="post">
          <h4>PLEASE SIGNIN TO CONTINUE</h4>
        </div>
      )}
    </>
  );
}
export default Mail;
