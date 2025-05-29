import './TaskList.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';
function TaskList() {
  // State variables
  const [tasks, setTasks] = useState([]);              // List of all tasks fetched from backend
  const [editTaskId, setEditTaskId] = useState(null);  // ID of the task currently being edited
  const [editedTitle, setEditedTitle] = useState('');  // Edited task title input state
  const [editedStatus, setEditedStatus] = useState(''); // Edited task status input state
  const [searchTerm, setSearchTerm] = useState('');    // Search input for task titles
  const [searchStatus, setSearchStatus] = useState(''); // Filter input for task status

  // Fetch tasks from backend API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data); // Store tasks in state
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks once when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Enter edit mode for a task, initialize edit inputs with current values
  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditedTitle(task.title);
    setEditedStatus(task.status);
  };

  // Save edited task data and exit edit mode
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${editTaskId}`, {
        title: editedTitle,
        status: editedStatus,
      });
      setEditTaskId(null); // Exit edit mode
      fetchTasks();        // Refresh task list to show updated data
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Filter tasks based on search inputs
  // 1. Title includes searchTerm (case-insensitive)
  // 2. Status matches searchStatus exactly (case-insensitive) or if searchStatus is empty, show all statuses
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (searchStatus === '' || task.status.toLowerCase() === searchStatus.toLowerCase())
  );
//Using material UI
 return (
  <div className="task-list-container">
    <h2>Smart Task Manager</h2>

    <TextField
      fullWidth
      label="Search tasks by title"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ marginBottom: '1.25rem' }}
    />

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

    <Grid container spacing={2}>
      {filteredTasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task._id}>
          <Card variant="outlined">
            <CardContent>
              {editTaskId === task._id ? (
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
                <>
                  <Typography variant="h6" gutterBottom>
                    {task.title}
                  </Typography>
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
                  
                  <Typography variant="body2" color="textSecondary">
                        Created At: {new Date(task.createdAt).toLocaleString()}
                  </Typography>


                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(task)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(task._id)}>
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
