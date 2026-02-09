import React, { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";

import UserPage from "./Components/UserPage";
import QuizPage from "./Components/QuizPage";
import ResultPage from "./Components/ResultPage";

function App() {

  const [username, setUsername] = useState("");
  const [usersData, setUsersData] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  // Load local storage
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const lastUser = localStorage.getItem("lastUsername");

    if (storedUsers) setUsersData(JSON.parse(storedUsers));
    if (lastUser) setUsername(lastUser);
  }, []);

  const userExists = usersData[username];

  // Start Quiz
  const startQuiz = () => {
    localStorage.setItem("lastUsername", username);
    setShowQuiz(true);
    setShowResult(false);
    setAnswers([]);
  };

  // View Result
  const viewResults = () => {
    setCurrentResult(usersData[username]);
    setShowResult(true);
    setShowQuiz(false);
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

    const updatedUsers = {
      ...usersData,
      [username]: res
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("lastUsername", username);

    setUsersData(updatedUsers);
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
        setAnswers={setAnswers}
        submitQuiz={submitQuiz}
      />
    );
  }

  // USER PAGE
  return (
    <UserPage
      username={username}
      setUsername={setUsername}
      userExists={userExists}
      startQuiz={startQuiz}
      viewResults={viewResults}
    />
  );
}

export default App;
