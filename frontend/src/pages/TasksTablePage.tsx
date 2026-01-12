import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../api/taskApi'; // Import API functions
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

const TasksTablePage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);  // Define state for tasks
    const [loading, setLoading] = useState(true); // Loading state
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();  // React Router hook for navigation

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const data = await getTasks();  // Fetch tasks using the API
                setTasks(data);
            } catch (error) {
                setErrorMessage('Failed to load tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (taskId: number) => {
        try {
            await deleteTask(taskId);  // Delete task via API
            setSuccessMessage('Task deleted successfully!');
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));  // Remove task from list
        } catch (error) {
            setErrorMessage('Failed to delete task');
        }
    };

    // Navigate to Edit Task page with task data
    const handleEdit = (task: Task) => {
        navigate(`/edittaskpage/${task.id}`, { state: task });  // Pass task data via state
    };

    const handleCreateTask = () => {
        navigate('/createtaskpage');  // Navigate to Create Task page
    };

    return (
        <Box sx={{ width: '100%', padding: 0 }}>
            <Navbar />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '8px',
                            display: 'inline-block',
                        }}
                    >
                        Your Tasks
                    </Typography>
                </Box>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Button
                    variant="contained"
                    onClick={handleCreateTask}
                    sx={{
                        marginBottom: 2,
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
                    Create New Task
                </Button>
            </motion.div>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <TableContainer component={Paper} sx={{ boxShadow: 3, maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="h6">Task</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Description</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Priority</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Deadline</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Status</Typography></TableCell>
                                    <TableCell><Typography variant="h6">Actions</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.description}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>{task.deadline}</TableCell>
                                        <TableCell>{task.status ? 'Completed' : 'Pending'}</TableCell>
                                        <TableCell>
                                            {/* Edit Button */}
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleEdit(task)}  // Trigger edit
                                            >
                                                Edit
                                            </Button>

                                            {/* Delete Button */}
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(task.id)}  // Trigger delete
                                                sx={{ marginLeft: 1 }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>
            )}

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

export default TasksTablePage;
