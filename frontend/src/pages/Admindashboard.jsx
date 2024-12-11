// src/components/AdminDashboard.js
import React, { useState } from "react";
import axios from "axios";

function AdminDashboard({examId}) {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      text: questionText,
      type: questionType,
      options: questionType === "mcq" ? options : [],
      correctAnswer,
    };

   
  axios
  .post(`http://localhost:5000/api/exams/${examId}/questions`, newQuestion)
  .then((response) => {
    setSuccessMessage("Question added successfully!");
    setQuestionText("");
    setOptions(["", ""]);
    setCorrectAnswer("");
    setTimeout(() => setSuccessMessage(""), 3000);
  })
  .catch((error) => console.error("Error adding question:", error));
};

  return (
    <div>
      <h1 style={{ color:"#333"}}>Admin Dashboard</h1>
      <h2 style={{ color:"#555"}}>Create Exam</h2>

      
      <div className="container">
      <h1>Add a Question to Exam</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Text:</label>
          <textarea
            rows="3"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Question Type:</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="mcq">Multiple Choice</option>
            <option value="text">Text</option>
          </select>
        </div>

        {questionType === "mcq" && (
          <div className="form-group">
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
        )}

        <div className="form-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Question</button>
      </form>
    </div>

      </div>
    
  );
}

export default AdminDashboard;

