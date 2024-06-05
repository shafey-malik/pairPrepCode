import React, { useState } from "react";
import "./index.css";
import Mail from "./email";
import Ucode from "./ucode";
import Pairing from "./pairing";
import Window from "./window";
function Right({ ri, li, updateEle }) {
  const [rig, setRig] = useState(ri);

  const updateRi = (nw) => {
    setRig(nw);
  };

  const backRig = () => {
    setRig(null);
  };
  return (
    <>
      {rig === 2 ? (
        <>
          <Window backRig={backRig} />
        </>
      ) : ri === 1 ? (
        <Pairing li={li} />
      ) : ri === null ? (
        <div className="post">
          <Ucode updateRi={updateRi} updateEle={updateEle} />
          <h1>------------ OR ----------</h1>

          <div className="pre" id="smallBox">
            to make a<br></br> NEW PAIR<br></br> select a sheet
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Right;
