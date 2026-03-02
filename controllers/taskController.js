const Task = require('../models/Task');
const Submission = require('../models/Submission');

exports.createTask = async (req, res) => {
  try {
    const { title, description, category, difficulty, skills, deliverables, deadline, estimatedHours, xpReward } = req.body;

    const task = new Task({
      title,
      description,
      category,
      difficulty,
      skills,
      deliverables,
      deadline,
      estimatedHours,
      xpReward,
      postedBy: req.user.id,
    });

    await task.save();
    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { category, difficulty, search, sortBy } = req.query;
    let query = { status: 'published' };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    let tasks = await Task.find(query)
      .populate('postedBy', 'firstName lastName profilePicture')
      .limit(100);

    if (sortBy === 'latest') {
      tasks.reverse();
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('postedBy', 'firstName lastName profilePicture email')
      .populate('submissions');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(task, req.body);
    task.updatedAt = Date.now();
    await task.save();

    res.json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitTask = async (req, res) => {
  try {
    const { description, githubLink, fileLink, videoLink } = req.body;
    const { taskId } = req.params;

    // Check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      task: taskId,
      student: req.user.id,
    });

    if (existingSubmission && existingSubmission.status !== 'revision-needed') {
      return res.status(400).json({ error: 'You have already submitted this task' });
    }

    const submission = new Submission({
      task: taskId,
      student: req.user.id,
      content: {
        description,
        githubLink,
        fileLink,
        videoLink,
      },
    });

    await submission.save();
    task.submissions.push(submission._id);
    await task.save();

    res.status(201).json({
      message: 'Task submitted successfully',
      submission,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
