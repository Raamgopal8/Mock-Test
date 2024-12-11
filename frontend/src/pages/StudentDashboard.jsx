// src/components/StudentDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/student/exams") // Backend API endpoint
      .then((response) => setExams(response.data))
      .catch((error) => console.error("Error fetching exams:", error));
  }, []);

  return (
    <div>
      
      <h1>Student Dashboard</h1>
      <h2>Upcoming Exams</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            {exam.title} - {new Date(exam.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;
