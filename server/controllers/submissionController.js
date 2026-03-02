exports.submitTask = async (req, res) => {
  try {
    const { taskId, githubLink } = req.body;

    // ✅ Dynamic AI score
    let aiScore = Math.floor(Math.random() * 100);

    const submission = new Submission({
      task: taskId,
      githubLink: githubLink,
      aiScore: aiScore,
      aiFeedback: "AI evaluated your submission",
    });

    await submission.save();

    res.status(201).json(submission);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};