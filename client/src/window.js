import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
const port = "https://preppair-server.onrender.com";
function Window({ backRig }) {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(port + "/reportCard");
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const ReloadComponent = () => {
    fetchData();
  };
  return (
    <div id="window">
      <div id="rightTop">
        <button
          id="back"
          onClick={() => {
            backRig(null);
          }}
          className="back"
        >
          Back
        </button>
        <button
          id="fresh"
          onClick={() => {
            ReloadComponent();
          }}
        >
          Reload
        </button>
      </div>

      {Object.entries(data).map(([key, value]) => (
        <div id="card">
          <p key={key}>
            <h3 id="reportSlot">{key.slice(0, -10)}</h3>
            <span id="answer">
              {value
                .slice(1, value.length - 1)
                .split(",")
                .map((x) => " [ " + x + " ] ")}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Window;
