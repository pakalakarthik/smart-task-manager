import React from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';

function App() {
  return (
    <div>
      <h1>Smart Task Manager</h1>
      <AddTask />
      <hr />
      <TaskList />
    </div>
  );
}

export default App;
