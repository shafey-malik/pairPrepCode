import React from "react";
import "./index.css";
import Mail from "./email";
import Ucode from "./ucode";
function Pairing({ li }) {
  return (
    <div className="pairing">
      <Mail li={li} />
    </div>
  );
}
export default Pairing;
