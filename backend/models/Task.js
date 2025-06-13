const mongoose = require('mongoose');

// Define the structure of a task
const taskSchema = new mongoose.Schema({
  title: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completed: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User model
    required: true,
  },
});




// Create and export the Task model
module.exports = mongoose.model('Task', taskSchema);
