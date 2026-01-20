const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  totalXP: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  completedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  badges: [{
    name: String,
    icon: String,
    earnedAt: Date,
  }],
  internshipReadinessScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  skillProgress: [{
    skill: String,
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    },
    tasksCompleted: Number,
  }],
  certifications: [{
    name: String,
    issuedBy: String,
    issueDate: Date,
    link: String,
  }],
  mentorFeedback: [{
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    feedback: String,
    rating: Number,
    date: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
