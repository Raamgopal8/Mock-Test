// models/Exam.js
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ["mcq", "text"] },
  options: [String],
  correctAnswer: String,
});

const ExamSchema = new mongoose.Schema({
  title: String,
  duration: Number, // in minutes
  questions: [QuestionSchema],
});

module.exports = mongoose.model("Exam", ExamSchema);
