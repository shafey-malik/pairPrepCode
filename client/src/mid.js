import React, { useState, useEffect } from "react";
import "./index.css";
import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";
import Card from "./card";
import Right from "./right";

function Mid() {
  const [sheetNames, setSheetNames] = useState([]);
  const [ri, setRi] = useState(null);
  const [li, setLi] = useState(null);
  const [ele, setEle] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchSheetNamesFromFirestore = async () => {
      document.getElementById("heading").innerHTML = "PrepPair Sheets:";
      try {
        const sheetsCollection = collection(db, "sheets");
        const querySnapshot = await getDocs(sheetsCollection);

        const sheetNamesArray = querySnapshot.docs.map((doc) => doc.id);
        setSheetNames(sheetNamesArray);
      } catch (error) {
        console.log("Error fetching sheet names:", error);
      }
    };

    fetchSheetNamesFromFirestore();
  }, []);

  const updateEle = (value) => {
    setEle(value);
    console.log("list ka number milgaya" + value);
  };
  return (
    <>
      <div className="mid">
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",

            display: "block",
          }}
        >
          <button
            id="back"
            onClick={() => {
              document.getElementById("heading").innerHTML = "PrepPair Sheets";
              setEle(null);
              setRi(null);
            }}
            className="back"
          >
            back
          </button>
          <p
            id="heading"
            style={{
              padding: "0px",
              marginLeft: "100px",
              marginRight: "100px",
            }}
          >
            {" "}
            PrepPair Sheets:
          </p>
        </div>{" "}
        <div>
          {ele ? (
            <Card ele={ele} />
          ) : (
            <div>
              {sheetNames.map((element, index) => (
                <div
                  className="slot"
                  key={index}
                  onClick={() => {
                    setEle(element);
                    setName(element);
                    setLi(index);
                    setRi(1);
                  }}
                >
                  {element.substring(1)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Right ri={ri} li={li} updateEle={updateEle} />
    </>
  );
}

export default Mid;
