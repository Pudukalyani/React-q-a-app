import React, { useState } from "react";
import { QUESTIONS } from "../questions";

function QuizPage({ answers, setAnswers, submitQuiz }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const q = QUESTIONS[currentIndex];

  // Check if current question is answered
  const isAnswered = () => {
    const ans = answers[currentIndex] || [];

    // For checkbox question, require at least 2 options
    if (q.type === "checkbox") return ans.length >= 2;

    // For other types, require at least 1 answer
    return ans.length > 0;
  };

  const goNext = () => {
    if (!isAnswered()) {
      if (q.type === "checkbox") {
        alert("Please select at least 2 options to continue.");
      } else {
        alert("Please answer this question.");
      }
      return;
    }

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="quiz-container">

      <h2>Quiz</h2>

      <div style={{ marginBottom: "20px" }}>
        <h5>Q{q.id}. {q.question}</h5>

        {/* RADIO */}
        {q.type === "radio" &&
          q.options.map((o) => (
            <div key={o} className="option">
              <input
                type="radio"
                name={"radio" + currentIndex}
                checked={(answers[currentIndex] || []).includes(o)}
                onChange={() => {
                  const copy = [...answers];
                  copy[currentIndex] = [o];
                  setAnswers(copy);
                }}
              /> {o}
            </div>
          ))}

        {/* CHECKBOX */}
        {q.type === "checkbox" &&
          q.options.map((o) => (
            <div key={o} className="option">
              <input
                type="checkbox"
                checked={(answers[currentIndex] || []).includes(o)}
                onChange={(e) => {
                  let arr = answers[currentIndex] || [];

                  if (e.target.checked) arr = [...arr, o];
                  else arr = arr.filter(x => x !== o);

                  const copy = [...answers];
                  copy[currentIndex] = arr;
                  setAnswers(copy);
                }}
              /> {o}
            </div>
          ))}

        {/* YES NO */}
        {q.type === "yesno" && (
          <>
            <button onClick={() => {
              const copy = [...answers];
              copy[currentIndex] = ["Yes"];
              setAnswers(copy);
            }}>Yes</button>

            <button onClick={() => {
              const copy = [...answers];
              copy[currentIndex] = ["No"];
              setAnswers(copy);
            }}>No</button>
          </>
        )}

        {/* TEXT / NUMBER */}
        {(q.type === "text" || q.type === "number") && (
          <input
            type={q.type === "number" ? "number" : "text"}
            value={(answers[currentIndex] || [""])[0]}
            onChange={(e) => {
              const copy = [...answers];
              copy[currentIndex] = [e.target.value];
              setAnswers(copy);
            }}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div>
        {currentIndex < QUESTIONS.length - 1 && (
          <button onClick={goNext}>Next</button>
        )}

        {currentIndex === QUESTIONS.length - 1 && (
          <button
            onClick={() => {
              if (!isAnswered()) {
                if (q.type === "checkbox") {
                  alert("Please select at least 2 options.");
                } else {
                  alert("Please answer this question.");
                }
                return;
              }
              submitQuiz();
            }}
          >
            Submit Quiz
          </button>
        )}
      </div>

    </div>
  );
}

export default QuizPage;

