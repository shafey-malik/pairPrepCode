import React from "react";
import "./index.css";
import { db } from "./config";
//import { collection, doc, getDoc } from "firebase/firestore";
import { doc, getDocs, query, where, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import Right from "./right";
const port = "https://preppair-server.onrender.com";
const Card = ({ ele }) => {
  const [list, setList] = useState([]);

  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchSheetContentFromFirestore = async () => {
      try {
        const eleString = ele.toString();
        document.getElementById("heading").innerHTML = eleString.slice(1);
        const sheetsRef = collection(db, "sheets");

        const q = query(
          sheetsRef,
          where("__name__", ">=", eleString),
          where("__name__", "<", eleString + "z")
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setContent(docSnap.data());
          const initialList = new Array(
            Object.keys(docSnap.data()).length
          ).fill(false);
          setList(initialList);
        } else {
          console.log("No matching document found!");
        }
      } catch (error) {
        console.log("Error fetching sheet content from Firestore:", error);
      }
    };

    fetchSheetContentFromFirestore();
  }, [ele]);
  if (!content) {
    return null;
  }
  const handleChg = (data) => {
    console.log(list);
    if (list[data] == false) {
      console.log("checked at " + data);
      const temp = [...list];
      temp[data] = !list[data];
      setList(temp);
    }
    if (list[data] == true) {
      console.log("unchecked at " + data);
      const temp = [...list];
      temp[data] = !temp[data];
      setList(temp);
    }
  };
  const saveState = () => {
    const newlist = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        newlist.push(i + 1);
      }
    }
    console.log(
      JSON.stringify(newlist).slice(1, newlist.length) + "KKKKKKKKKa"
    );
    fetch(port + "/savingState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newlist),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Response from server:", result);
        console.log(list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div id="sheetsDisplay">
      <button
        id="save"
        onClick={() => {
          saveState();
        }}
        style={{ float: "right", marginRight: "50px" }}
      >
        Save Progress
      </button>

      <div>
        {Object.entries(content).map(([key, value], index) => (
          <div className="slot" key={index}>
            <input
              type="checkbox"
              className="check"
              checked={list[index]}
              onChange={() => {
                handleChg(index);
              }}
            />
            <a href={value[1]} target="_blank">
              {key}: {value[0]}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
