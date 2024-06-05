import React, { useState } from "react";
import "./index.css";
const port = "https://preppair-server.onrender.com";
function Ucode({ updateRi, updateEle }) {
  const [pairCode, setPairCode] = useState("");

  const handleCodeChange = (event) => {
    setPairCode(event.target.value);
  };

  const handleSubmit = () => {
    const code = pairCode;
    if (!pairCode) {
      alert("NO INPUT");
    }
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) {
      alert("Please SIGN_IN to continue");
    } else {
      const user = u.email;
      console.log("banda ye hai" + user);
      fetch(port + "/checkCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, user }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.text();
          } else {
            throw new Error("Error checking code");
          }
        })
        .then((result) => {
          if (result === "yes") {
            document.getElementById("box2").innerText = "Correct code";
            updateRi(2);
            updateEle(code[2]);
            console.log(code[2] + "ye hai list ka");
          } else if (result === "no") {
            document.getElementById("box2").innerText = "wrong code, Retry";
          } else {
            console.log("Unexpected response from server");
          }
        })
        .catch((error) => {});
    }
  };
  return (
    <>
      <div className="ucode">
        <h5>Enter Existing Pair Code</h5>
        <input
          style={{ borderRadius: "4px", padding: "3px" }}
          placeholder="6 digit unique pair code"
          type="text"
          value={pairCode}
          onChange={handleCodeChange}
        ></input>
        <p id="box2"></p>
        <button
          style={{
            borderRadius: "3px",
            paddingRight: "10px",
            paddingLeft: "10px",
          }}
          onClick={handleSubmit}
        >
          Done
        </button>
      </div>
    </>
  );
}

export default Ucode;
