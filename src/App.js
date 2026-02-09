import React, { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";

import UserPage from "./Components/UserPage";
import QuizPage from "./Components/QuizPage";
import ResultPage from "./Components/ResultPage";

function App() {

  const [username, setUsername] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [userExists, setUserExists] = useState(false);

  // Load last result for current user from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("currentUsername");
    const storedResult = localStorage.getItem("currentResult");
    const storedAnswers = localStorage.getItem('currentAnswers');
    if (storedUsername) {
      setUsername(storedUsername);
      setUserExists(true);
    }

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
      setShowQuiz(true);
    }

    if (storedResult) {
      setCurrentResult(JSON.parse(storedResult));
    }
  }, []);

  // Start Quiz
  const startQuiz = () => {
    localStorage.setItem("currentUsername", username);
    setShowQuiz(true);
    setShowResult(false);
    setAnswers([]);
  };

  // Submit Quiz
  const submitQuiz = () => {

    let correct = 0;

    QUESTIONS.forEach((q, i) => {
      if (
        JSON.stringify((answers[i] || []).sort()) ===
        JSON.stringify(q.answer.sort())
      ) correct++;
    });

    const wrong = QUESTIONS.length - correct;
    const percent = ((correct / QUESTIONS.length) * 100).toFixed(2);

    const res = { correct, wrong, percent };

    // Save in localStorage for current user
    
    localStorage.setItem("currentResult", JSON.stringify(res));
    localStorage.removeItem("currentAnswers");

    setCurrentResult(res);
    setShowQuiz(false);
    setShowResult(true);
  };

  // RESULT PAGE
  if (showResult && currentResult) {
    return (
      <ResultPage
        username={username}
        result={currentResult}
      />
    );
  }

  // QUIZ PAGE
  if (showQuiz) {
    return (
      <QuizPage
        answers={answers}
        setAnswers={(ans) => {
          localStorage.setItem("currentAnswers", JSON.stringify(ans));
          setAnswers(ans)
        }}
        submitQuiz={submitQuiz}
      />
    );
  }

  // USER PAGE
  return (
    <UserPage
      username={username}
      setUsername={setUsername}
      startQuiz={startQuiz}
      viewResults={() => setShowResult(true)}
      userExists={userExists}
    />
  );
}

export default App;
