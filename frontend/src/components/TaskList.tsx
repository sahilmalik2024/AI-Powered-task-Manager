import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Checkbox } from '@mui/material';
import axios from '../api/axiosInstance';
import { Task } from '../types/task';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('/tasks').then(response => setTasks(response.data));
  }, []);

  const toggleComplete = (taskId: number) => {
    // TODO: Send PATCH request to toggle task status
  };

  return (
    <List>
      {tasks.map(task => (
        <ListItem key={task.id}>
          <Checkbox checked={task.status === 'complete'} onChange={() => toggleComplete(task.id)} />
          <ListItemText primary={task.title} secondary={task.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
