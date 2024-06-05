import React from "react";
import "./index.css";
function List({ name }) {
  return (
    <div className="list">
      <h2>Sheet Details</h2>
      <ul>
        {sheetData.map((sheet, index) => (
          <li key={index}>
            <p>Name: {sheet[0]}</p>
            <p>Link: {sheet[1]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
