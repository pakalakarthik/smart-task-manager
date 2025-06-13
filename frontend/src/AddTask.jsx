import { useState } from 'react';
import axios from 'axios'; // ✅ NEW: Import axios

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent page reload

  try {
    const token = localStorage.getItem('token'); // ⬅️ Get token from storage

    const response = await axios.post(
      'https://smart-task-manager-uk23.onrender.com/tasks',
      {
        title,
        description
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // ⬅️ Send token to backend
        }
      }
    );

      console.log('Response from server:', response.data);
      setMessage('✅ Task added successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('❌ Failed to add task');
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <br />
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <br />
        <button type="submit">Add Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddTask;
