const express = require("express");
const router = express.Router();
const Campus = require("../models/Campus");

// GET all campuses
router.get("/", async (req, res) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campuses" });
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

module.exports = router;
