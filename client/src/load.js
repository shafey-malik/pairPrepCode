import React from "react";
import "./index.css";

function Load() {
  setTimeout(() => {
    document.getElementById("load").style.opacity = "0";
    document.getElementById("load").style.display = "none";
  }, 1000);
  return (
    <>
      <div id="load">
        <h1>Prepair</h1>
      </div>
    </>
  );
}

export default Load;
