import React, { useState } from 'react';
import './styles/App.css';



function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("Loading...");
    const res = await fetch("https://bureau-fastapi-service.azurewebsites.net/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Ask the Agent</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question"
          style={{ width: "100%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ marginTop: "1rem" }}>Ask</button>
      </form>
      {answer && (
        <div style={{ marginTop: "2rem", background: "#f0f0f0", padding: "1rem" }}>
          <strong>Agent says:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;