import React from "react";

function ResultPage({ username, result }) {

  return (
    <div className="container">
      <h2>Results</h2>

      <p>User: {username}</p>
      <p>Correct: {result.correct}</p>
      <p>Wrong: {result.wrong}</p>
      <p>Percentage: {result.percent}%</p>

    </div>
  );
}

export default ResultPage;