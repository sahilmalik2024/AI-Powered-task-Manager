import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Snackbar, Typography, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';  // Use react-router hooks
import { motion } from 'framer-motion';  // Import framer-motion for animations
import Navbar from '../components/Navbar';

interface Task {
    id: number;
    title: string;
    description: string;
    priority: string;
    deadline: string;
    status: boolean;
}

const EditTaskPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const taskData = location.state as Task;  // Get the task data passed from the previous page

    const [task, setTask] = useState<Task>(taskData);  // Initialize the task data state
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const getPriorityValue = (priority: string): number => {
        switch (priority) {
            case 'High': return 3;
            case 'Medium': return 2;
            case 'Low': return 1;
            default: return 2;
        }
    };

    const handleSave = async () => {
        try {
            // Call your update API here to save the task
            // await updateTask(task.id, task);
            setSuccessMessage('Task updated successfully!');
            setErrorMessage('');
            navigate('/taskstablepage');  // Redirect back to tasks list page
        } catch (error) {
            setErrorMessage('Failed to update task');
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
                backgroundColor: 'transparent',
                padding: 0,
                margin: 0,
            }}
        >
            {/* Navbar */}
            <Navbar />

            {/* Form */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    sx={{
                        width: '100%',
                        maxWidth: 400,  // Ensuring same max width as CreateTaskPage
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: 3,  // Ensure padding is the same
                        borderRadius: 2,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        marginTop: 2,  // Consistent margin
                    }}
                >
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        Edit Task
                    </Typography>

                    <TextField
                        label="Task Name"
                        variant="outlined"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                    />

                    <TextField
                        label="Task Description"
                        variant="outlined"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        required
                        multiline
                        rows={4}
                    />

                    <TextField
                        label="Priority"
                        variant="outlined"
                        select
                        value={task.priority}
                        onChange={(e) => setTask({ ...task, priority: e.target.value })}
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
                        value={task.deadline}
                        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 2,
                            backgroundColor: '#1976d2',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            transition: 'background-color 0.3s, transform 0.3s',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </motion.div>

            {/* Success and Error Messages */}
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                message={successMessage}
                onClose={() => setSuccessMessage('')}
            />
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                message={errorMessage}
                onClose={() => setErrorMessage('')}
            />
        </Box>
    );
};

export default EditTaskPage;
