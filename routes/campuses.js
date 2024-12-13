const express = require("express");
const router = express.Router();
const Campus = require("../models/Campus");
const Student = require("../models/Student"); // Import the Student model to include students

// GET all campuses
router.get("/", async (req, res) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campuses" });
  }
});

// GET a campus by ID
router.get("/:id", async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id, {
      include: Student, // Include students associated with this campus
    });
    if (!campus) {
      return res.status(404).json({ error: "Campus not found" });
    }
    res.json(campus);
  } catch (error) {
    console.error("Error fetching campus:", error);
    res.status(500).json({ error: "Failed to fetch campus" });
  }
});

// POST a new campus
router.post("/", async (req, res) => {
  try {
    const campus = await Campus.create(req.body);
    res.status(201).json(campus);
  } catch (err) {
    res.status(400).json({ error: "Failed to create campus" });
  }
});

// Update a campus by ID
router.put("/:id", async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).send("Campus not found");
    }
    const updatedCampus = await campus.update(req.body);
    res.status(200).json(updatedCampus);
  } catch (error) {
    res.status(500).json({ error: "Error updating campus" });
  }
});

// Delete a campus by ID
router.delete("/:id", async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).send("Campus not found");
    }
    await campus.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Error deleting campus" });
  }
});

module.exports = router;
