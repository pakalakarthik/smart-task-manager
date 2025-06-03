// Step 1: Import Express and Mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Step 2: Create Express app
const app = express();


app.use(cors()); // <-- This must be before your routes







// Step 3: Middleware to parse JSON body data
app.use(express.json());

// Step 4: Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((error) => {
  console.error('❌ Failed to connect to MongoDB', error);
});

// Step 5: Test route
app.get('/', (req, res) => {
  res.send('Welcome to Smart Task Manager Backend!');
});

// Step 6: Start the server
app.listen(5000, () => {
  console.log('🚀 Server is running on http://localhost:5000');
});



// Import Task model
const Task = require('./models/Task');

// Route to add a new task POST
app.post('/tasks', async (req, res) => {
  try {
    const { title, status } = req.body;

    const newTask = new Task({ title, status });

    await newTask.save(); // Save to MongoDB

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});


// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from MongoDB
    res.status(200).json(tasks);     // Send them to the user
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});



// Route to delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// UPDATE Task - PUT /tasks/:id d
app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});


