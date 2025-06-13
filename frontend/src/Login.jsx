import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://smart-task-manager-uk23.onrender.com/login', {
        email,
        password,
      });

      console.log('Login response:', response.data); // ✅ Optional debug

      localStorage.setItem('token', response.data.token); // ✅ Save token
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('✅ Login successful!');

      if (onLogin) onLogin();
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Login failed. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid gray', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
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
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
      {message && (
        <Typography color="secondary" sx={{ mt: 2 }}>{message}</Typography>
      )}
    </Box>
  );
}

export default Login;
