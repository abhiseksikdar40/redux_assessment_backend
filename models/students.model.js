const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  marks: Number,
  attendance: Number,
  grade: String,
});

const Student =
  mongoose.models.Student ||
  mongoose.model("Student", studentSchema);

module.exports = { Student };
