const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  skillsRequired: [{
    type: String,
  }],
  duration: {
    type: String,
    enum: ['1-month', '2-months', '3-months', '6-months'],
  },
  stipend: {
    type: Number,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
    enum: ['remote', 'onsite', 'hybrid'],
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'filled'],
    default: 'open',
  },
  applicants: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'offered', 'rejected'],
    },
    appliedAt: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
