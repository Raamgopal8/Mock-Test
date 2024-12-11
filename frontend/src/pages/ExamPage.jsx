// src/components/ExamPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";
import Webcam from "react-webcam";

function ExamPage({ examId }) {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [webcamError, setWebcamError] = useState(false);

  const webcamRef = React.useRef(null);

  useEffect(() => {
    // Fetch exam details
    axios
      .get(`http://localhost:5000/api/exams/${examId}`)
      .then((response) => setExam(response.data))
      .catch((error) => console.error("Error fetching exam:", error));
  }, [examId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => prev + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Monitor key events (e.g., copying)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === "c" || event.key === "v")) {
        alert("Copy-pasting is not allowed during the exam!");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/exams/${examId}/submit`, { answers, tabSwitchCount })
      .then((response) => {
        setSubmitted(true);
        alert("Exam submitted successfully!");
      })
      .catch((error) => console.error("Error submitting exam:", error));
  };

  const renderTimer = ({ minutes, seconds, completed }) => {
    if (completed) {
      handleSubmit();
      return <span>Time's up! Your exam has been submitted.</span>;
    }
    return (
      <span>
        Time Remaining: {minutes}:{seconds}
      </span>
    );
  };

  if (!exam) return <div>Loading exam...</div>;
  if (submitted) return <div>Your exam has been submitted. Thank you!</div>;

  return (
    <div>
      <h1>{exam.title}</h1>
      <Countdown
        date={Date.now() + exam.duration * 60000}
        renderer={renderTimer}
      />
      <div>
        <h3>Webcam Feed:</h3>
        {webcamError ? (
          <p style={{ color: "red" }}>Webcam access denied. Please enable it for monitoring.</p>
        ) : (
          <Webcam
            ref={webcamRef}
            videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
            onUserMediaError={() => setWebcamError(true)}
          />
        )}
      </div>
      <p>Tab Switch Count: {tabSwitchCount}</p>
      
      <form>
        {exam.questions.map((question, index) => (
          <div key={question.id}>
            <p>
              <strong>Q{index + 1}:</strong> {question.text}
            </p>
            {question.type === "mcq" ? (
              question.options.map((option, i) => (
                <div key={i}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={() =>
                      handleAnswerChange(question.id, option)
                    }
                  />
                  <label>{option}</label>
                </div>
              ))
            ) : (
              <textarea
                rows="4"
                cols="50"
                placeholder="Write your answer here..."
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
            )}
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit Exam
        </button>
      </form>
    </div>
  );
}

export default ExamPage;
