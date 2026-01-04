require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { initializeDatabase } = require("./db/db.connection");
const { Student } = require("./models/students.model");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB (safe for Vercel)
initializeDatabase();

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// ADD student
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// UPDATE student
app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

// 🚀 EXPORT APP (NO LISTEN)
module.exports = app;
