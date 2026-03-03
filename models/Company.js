const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  },
  size: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
  },
  postedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  postedInternships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
  }],
  shortlistedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
