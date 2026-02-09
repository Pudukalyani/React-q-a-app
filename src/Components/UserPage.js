import React from "react";

function UserPage({
  username,
  setUsername,
  startQuiz,
  viewResults,
  userExists
}) {

  // NEW USER FORM
  const userForm = (
    <div className="container">
      <h2>Enter Username</h2>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />

      <button onClick={startQuiz} disabled={!username}>
        Start
      </button>
    </div>
  );

  // EXISTING USER VIEW
  const existingUserView = (
    <div className="container">
      <h2>Username: {username}</h2>

      <button onClick={viewResults}>
        View Results
      </button>
    </div>
  );

  // RETURN LOGIC (YOUR REQUIREMENT)
  return username && userExists ? existingUserView : userForm;
}

export default UserPage;
