import React from "react";
import "./index.css";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJzNZen1T5yOsUssOnpOkGi3VveaPyfic",
  authDomain: "preppair-dbb0d.firebaseapp.com",
  projectId: "preppair-dbb0d",
  storageBucket: "preppair-dbb0d.appspot.com",
  messagingSenderId: "921566845703",
  appId: "1:921566845703:web:6ea4c8f1e85ef88639c3a2",
  measurementId: "G-Y07Q58GSY8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
      console.log("User signed in:", user);
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

function Profile({ usere }) {
  return (
    <>
      <div className="user">
        <img
          id="img"
          src={usere.photoURL}
          alt="no pic"
          style={{ width: "100px", borderRadius: "50%" }}
        />

        <div className="name"> {usere.displayName}</div>
        <button className="logout" onClick={() => logout()}>
          <img className="signout" src="signout.png"></img>
          <spam> Logout</spam>
        </button>
      </div>
    </>
  );
}

function Left() {
  const usere = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="left">
      {usere ? (
        <>
          <Profile usere={usere} />
        </>
      ) : (
        <div id="lefty">
          <img src="not.png" className="not"></img>
          <button
            className="signin"
            onClick={() => {
              handleGoogleSignIn();
            }}
          >
            <img src="google.png" className="google"></img>
            <div>signin with google </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Left;
