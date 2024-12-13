const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Campus = require("../models/Campus");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.findAll({
      include: Campus, // Include associated Campus data
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// POST a new student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: "Failed to create student" });
  }
});

// GET a specific student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: Campus, // Include associated Campus data
    });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error fetching student" });
  }
});

// PUT (update) a student by ID
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    const updatedStudent = await student.update(req.body);
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: "Error updating student" });
  }
});

// DELETE a student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    await student.destroy();
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: "Error deleting student" });
  }
});

module.exports = router;
