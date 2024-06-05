import React from "react";
import { rtdb, ref, set } from "./config";
const port = "https://preppair-server.onrender.com";
const InviteButton = ({ friendEmail, code }) => {
  code = code + friendEmail[0] + friendEmail[2] + friendEmail[4];
  const subject = "Invitation to Pair";
  const usere = JSON.parse(localStorage.getItem("user"));
  let mailtoLink;

  if (usere) {
    const body = `Hiii, You've been invited by '${usere.displayName}' to pair using \n unique ID: ${code} on the platfrom PrepPAIR\n\n`;

    mailtoLink = `mailto:${friendEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const myemail = user.email;
  const sendDataToServer = () => {
    const data = { code, friendEmail, myemail };

    fetch(port + "/receiveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Response from server:", result);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function downloadTextFile(text, filename) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  const textContent =
    "pairCode is - " +
    code +
    " for the users -" +
    myemail +
    " and " +
    friendEmail;
  const fileName = "PairCode.txt";

  return (
    <>
      {usere ? (
        <>
          <br></br>
          <p id="box" style={{ color: "red", fontSize: "13px" }}>
            *use proper gmail to create Pair Id
            <br></br>
            of format "xyz@gmail.com"
          </p>
          <br></br>
          <button
            style={{
              background: "rgb(10,30,90)",
              color: "white",
              padding: "5px",
              paddingLeft: "20px",
              width: "150px",
              borderColor: "rgb(1, 0, 40)",
              borderRadius: "5px",
            }}
            onClick={() => {
              document.getElementById("box").innerText = code;
              document.getElementById("box").style.color = "white";
              document.getElementById("box").style.backgroundColor = "black";

              document.getElementById("box").style.textAlign = "center";
              const slot = ref(rtdb, "pairs/" + code + "+");
              const user = JSON.parse(localStorage.getItem("user"));
              localStorage.setItem("code", JSON.stringify(code));
              if (code.length == 6) {
                set(slot, { name: user.displayName });
              }
            }}
          >
            generate code
          </button>
          <br></br>
          <button
            style={{
              background: "rgb(10,30,90)",
              color: "white",
              padding: "5px",
              paddingLeft: "20px",
              width: "150px",
              borderRadius: "5px",
              borderColor: "rgb(1, 0, 40)",
            }}
            onClick={() => {
              downloadTextFile(textContent, fileName);
            }}
          >
            download code
          </button>
          <br></br>
          <a
            onClick={() => {
              sendDataToServer();
              document.getElementById("back").click();
            }}
            href={mailtoLink}
            style={{
              background: "rgb(10,30,90)",
              color: "white",
              padding: "5px",
              textAlign: "center",
              paddingLeft: "20px",
              width: "125px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            Send Invite
          </a>

          <br></br>
          <br></br>

          <p
            style={{
              color: "white",
            }}
          >
            1. Generate code
            <br></br>
            2. Download code
            <br></br>
            3. Send Invite to friend
          </p>

          <p style={{ color: "red" }}>
            *NOTE: send invite or download <br></br>the key inorder to SAVE the
            pair
          </p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default InviteButton;
