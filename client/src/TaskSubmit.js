import React, { useState } from "react";
import "./TaskSubmit.css"; // style separate file

export default function TaskSubmit() {
  const [code, setCode] = useState("");
  const [score, setScore] = useState(0);

  const submitTask = async () => {
    const response = await fetch("/submit-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userCode: code })
    });
    const data = await response.json();
    setScore(data.score);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Submit Task</h2>
      <textarea
        rows="8"
        cols="50"
        placeholder="Type your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <br />
      <button onClick={submitTask}>Submit</button>
      <br />
      <br />
      <div className="progress-circle" style={{ margin: "auto" }}>
        <span>{score}%</span>
      </div>
    </div>
  );
}