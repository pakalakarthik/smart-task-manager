// Import custom CSS styling
import './TaskList.css';

// Import the Checkbox component from Material UI
import { Checkbox } from '@mui/material';

// Import React, useState for managing data, and useEffect for API calls
import React, { useEffect, useState } from 'react';

// Import components from Material UI for UI elements
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';

function TaskList() {
  // -----------------------------
  // ✅ State Variables
  // -----------------------------

  const [tasks, setTasks] = useState([]);               // List of all tasks fetched from the backend
  const [editTaskId, setEditTaskId] = useState(null);   // ID of the task being edited
  const [editedTitle, setEditedTitle] = useState('');   // New title input when editing
  const [editedStatus, setEditedStatus] = useState(''); // New status input when editing
  const [searchTerm, setSearchTerm] = useState('');     // Search box for filtering by title
  const [searchStatus, setSearchStatus] = useState(''); // Filter dropdown for filtering by status

  // -----------------------------
  // ✅ Fetch all tasks from backend API
  // -----------------------------
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://smart-task-manager-uk23.onrender.com/tasks');
      setTasks(response.data); // Save the tasks into the state
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // -----------------------------
  // ✅ useEffect: Runs once when component is mounted to load tasks
  // -----------------------------
  useEffect(() => {
    fetchTasks();
  }, []);

  // -----------------------------
  // ✅ Delete a task
  // -----------------------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://smart-task-manager-uk23.onrender.com/tasks/${id}`);
      fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // -----------------------------
  // ✅ Enter Edit Mode
  // -----------------------------
  const handleEdit = (task) => {
    setEditTaskId(task._id);        // Save task ID being edited
    setEditedTitle(task.title);     // Fill input with current title
    setEditedStatus(task.status);   // Fill dropdown with current status
  };

  // -----------------------------
  // ✅ Save edited task
  // -----------------------------
  const handleSave = async () => {
    try {
      await axios.put(`https://smart-task-manager-uk23.onrender.com/tasks/${editTaskId}`, {
        title: editedTitle,
        status: editedStatus,
      });
      setEditTaskId(null); // Exit edit mode
      fetchTasks();        // Refresh updated list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // -----------------------------
  // ✅ Toggle status using checkbox (completed ↔ pending)
  // -----------------------------
  const handleCheckboxToggle = async (task) => {
    try {
      // Toggle between completed and pending
      const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';

      await axios.put(`https://smart-task-manager-uk23.onrender.com/tasks/${task._id}`, {
        title: task.title,
        status: updatedStatus,
      });

      fetchTasks(); // Refresh list after update
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  // -----------------------------
  // ✅ Filter tasks by searchTerm and status
  // -----------------------------
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) && // Match title
    (searchStatus === '' || task.status.toLowerCase() === searchStatus.toLowerCase()) // Match status if selected
  );

  // -----------------------------
  // ✅ Render the UI
  // -----------------------------
  return (
    <div className="task-list-container">
      <h2>Smart Task Manager App</h2>

      {/* 🔍 Search box to filter tasks by title */}
      <TextField
        fullWidth
        label="Search tasks by title"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: '1.25rem' }}
      />

      {/* 🔽 Dropdown to filter tasks by status */}
      <FormControl fullWidth sx={{ marginBottom: '1.25rem' }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={searchStatus}
          label="Status"
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      {/* 📝 Grid of filtered tasks */}
      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card variant="outlined">
              <CardContent>
                {editTaskId === task._id ? (
                  // ✏️ Edit Mode
                  <>
                    <TextField
                      fullWidth
                      label="Edit Title"
                      variant="outlined"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      sx={{ marginBottom: 2 }}
                    />
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <InputLabel>Edit Status</InputLabel>
                      <Select
                        value={editedStatus}
                        label="Edit Status"
                        onChange={(e) => setEditedStatus(e.target.value)}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="contained" color="success" onClick={handleSave}>
                      Save
                    </Button>
                  </>
                ) : (
                  // 👁️ View Mode
                  <>
                    {/* ✅ Checkbox to mark complete/incomplete + Title */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: 1 }}>
                      <Checkbox
                        checked={task.status === 'completed'}
                        onChange={() => handleCheckboxToggle(task)}
                        color="success"
                      />
                      <Typography variant="h6">{task.title}</Typography>
                    </Stack>

                    {/* 🟢 Status with color based on value */}
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          task.status === 'completed'
                            ? 'green'
                            : task.status === 'in progress'
                            ? 'orange'
                            : 'gray',
                        fontWeight: 'bold',
                        marginBottom: 2,
                      }}
                    >
                      Status: {task.status}
                    </Typography>

                    {/* 🕒 Created At */}
                    <Typography variant="body2" color="textSecondary">
                      Created At: {new Date(task.createdAt).toLocaleString()}
                    </Typography>

                    {/* 🛠️ Action Buttons */}
                    <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(task)}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TaskList;
