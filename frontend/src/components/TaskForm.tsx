import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // TODO: Call API to create task
    setTitle('');
    setDescription('');
  };

  return (
    <Stack spacing={2}>
      <TextField label="Task Title" value={title} onChange={e => setTitle(e.target.value)} />
      <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Add Task</Button>
    </Stack>
  );
};

export default TaskForm;
