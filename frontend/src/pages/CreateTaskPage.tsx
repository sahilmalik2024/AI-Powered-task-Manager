import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api/taskApi';
import Navbar from '../components/Navbar';

const CreateTaskPage: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('Medium');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const getPriorityValue = (priority: string): number => {
        switch (priority) {
            case 'High': return 3;
            case 'Medium': return 2;
            case 'Low': return 1;
            default: return 2;
        }
    };

    const handleSubmit = async () => {
        try {
            const [year, month, day] = taskDate.split('-').map(Number);
            const localDate = new Date(year, month - 1, day, 12, 0, 0); // noon local time

            const newTask = {
                title: taskName,
                description: taskDescription,
                priority: getPriorityValue(taskPriority),
                deadline: localDate.toISOString(),
            };

            await createTask(newTask);
            setSuccessMessage('Task created successfully!');
            navigate('/taskstablepage');
        } catch (error) {
            setErrorMessage('Failed to create task. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100vh',
                backgroundColor: 'transparent', // allow background to show through
                padding: 0,
                margin: 0,
            }}
        >
            <Navbar /> {/* Navbar here */}
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    marginTop: 2, // Optional, just in case you want some space after the Navbar
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    Create a New Task
                </Typography>
                <TextField
                    label="Task Name"
                    variant="outlined"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <TextField
                    label="Task Description"
                    variant="outlined"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    label="Task Priority"
                    variant="outlined"
                    select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    required
                >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </TextField>
                <TextField
                    label="Task Due Date"
                    type="date"
                    variant="outlined"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Task
                </Button>
            </Box>

            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                message={errorMessage}
                onClose={() => setErrorMessage('')}
            />
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                message={successMessage}
                onClose={() => setSuccessMessage('')}
            />
        </Box>
    );
};

export default CreateTaskPage;
