const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    description: String,
    githubLink: String,
    fileLink: String,
    videoLink: String,
  },
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'approved', 'rejected', 'revision-needed'],
    default: 'submitted',
  },
  rating: {
    score: {
      type: Number,
      min: 0,
      max: 5,
    },
    feedback: String,
    ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  xpEarned: {
    type: Number,
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  },

}, { aiScore: {
  type: Number,
  default: 0,
},
aiFeedback: {
  type: String,
},timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
