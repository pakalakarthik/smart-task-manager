const mongoose = require('mongoose');

// Define the structure of a task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create and export the Task model
module.exports = mongoose.model('Task', taskSchema);
