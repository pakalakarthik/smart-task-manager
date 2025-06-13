import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import Register from './Register';
import Login from './Login';
import { Button } from '@mui/material';

function App() {
  const [view, setView] = useState('register');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setView('login');
  };

  if (isAuthenticated) {
    return (
      <div>
        <h1>Smart Task Manager</h1>
        <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
        <AddTask />
        <hr />
        <TaskList />
      </div>
    );
  }

  return (
    <div>
      {view === 'register' ? (
        <>
          <Register onRegister={() => setView('login')} />
          <p style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Button onClick={() => setView('login')}>Login</Button>
          </p>
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <p style={{ textAlign: 'center' }}>
            Don’t have an account?{' '}
            <Button onClick={() => setView('register')}>Register</Button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
