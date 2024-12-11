// routes/exams.js
const express = require("express");
const Exam = require("../models/Exam");
const router = express.Router();

// Get exam details
router.get("/:examId", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: "Error fetching exam" });
  }
});

// Submit exam
router.post("/:examId/submit", async (req, res) => {
  try {
    const { answers, tabSwitchCount } = req.body;

    // Log or store monitoring data
    console.log(`Exam ID: ${req.params.examId}`);
    console.log(`Tab Switches: ${tabSwitchCount}`);
    // Logic for storing and evaluating answers can be added here
    console.log("Submitted Answers:", answers);
    res.json({ message: "Exam submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting exam" });
  }
});

module.exports = router;
