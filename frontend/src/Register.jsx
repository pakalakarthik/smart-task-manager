// Import React and hooks
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

// Register component
function Register({ onRegister }) {
  // State to store form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error or success messages
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleRegister = async () => {
    try {
      // Send data to backend /register route
        await axios.post('https://smart-task-manager-uk23.onrender.com/register', {
         name,
         email,
         password,
       });
    //await axios.post('http://localhost:5000/register', {name, email, password});


      // Show success message
      setMessage('Registered successfully! Please login.');
      setName('');
      setEmail('');
      setPassword('');

      // Optional callback to switch to login screen
      if (onRegister) {
        onRegister(); // used if you want to change screen to login
      }

    } catch (error) {
      console.error('Registration failed:', error);
      setMessage(error.response?.data?.error || 'Registration failed. Try again.');
    }
  };

  // JSX UI
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid gray', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ mt: 2 }}>
        Register
      </Button>

      {message && (
        <Typography color="secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default Register;
