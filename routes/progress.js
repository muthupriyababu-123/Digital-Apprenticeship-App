const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Submission = require("../models/Submission");

// Get student progress
router.get("/:userId", async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({
      assignedTo: req.params.userId,
    });

    const completedTasks = await Submission.countDocuments({
      student: req.params.userId,
      status: "approved",
    });

    const progress =
      totalTasks === 0
        ? 0
        : (completedTasks / totalTasks) * 100;

    res.json({ progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;