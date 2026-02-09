import React from "react";
import { QUESTIONS } from "../questions";

function QuizPage({ answers, setAnswers, submitQuiz }) {

  return (
    <div className="quiz-container">
        
      <h2>Quiz</h2>

      {QUESTIONS.map((q, qIndex) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>

          <h5>Q{q.id}. {q.question}</h5>

          {/* RADIO */}
          {q.type === "radio" &&
            q.options.map((o) => (
              <div key={o} className="option">
                <input
                  type="radio"
                  name={"radio" + qIndex}
                  checked={(answers[qIndex] || []).includes(o)}
                  onChange={() => {
                    const copy = [...answers];
                    copy[qIndex] = [o];
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
                  checked={(answers[qIndex] || []).includes(o)}
                  onChange={(e) => {
                    let arr = answers[qIndex] || [];

                    if (e.target.checked) arr = [...arr, o];
                    else arr = arr.filter(x => x !== o);

                    const copy = [...answers];
                    copy[qIndex] = arr;
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
                copy[qIndex] = ["Yes"];
                setAnswers(copy);
              }}>Yes</button>

              <button onClick={() => {
                const copy = [...answers];
                copy[qIndex] = ["No"];
                setAnswers(copy);
              }}>No</button>
            </>
          )}

          {/* TEXT / NUMBER */}
          {(q.type === "text" || q.type === "number") && (
            <input
              type={q.type === "number" ? "number" : "text"}
              value={(answers[qIndex] || [""])[0]}
              onChange={(e) => {
                const copy = [...answers];
                copy[qIndex] = [e.target.value];
                setAnswers(copy);
              }}
            />
          )}

        </div>
      ))}

      <button onClick={submitQuiz}>
        Submit Quiz
      </button>

    </div>
  );
}

export default QuizPage;
