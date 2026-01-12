import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { getTasks } from '../api/taskApi';  // Assume getTasks fetches the tasks
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    description: string;
    priority: string;
    deadline: string;  // Ensure this is in string format like 'YYYY-MM-DD HH:mm:ss'
    status: boolean;
}

const CompletedTasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(); // Fetch tasks from API
                const completedTasks = filterCompletedTasks(response);
                setTasks(completedTasks);
            } catch (error) {
                console.error('Error fetching tasks', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Filter tasks that are completed (status: true)
    const filterCompletedTasks = (tasks: Task[]) => {
        return tasks.filter((task) => task.status === true);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Navbar />

            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '1200px', // Max width to center the content
                    margin: '0 auto', // Center horizontally
                    padding: '2rem', // Padding around content
                }}
            >
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Typography
                        variant="h4"
                        className="fw-bold mb-4 text-center"
                        sx={{
                            color: "#fff", // white text for contrast
                            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)", // subtle shadow for readability
                            backgroundColor: "rgba(0, 0, 0, 0.3)", // semi-transparent background
                            padding: "0.5rem 1rem",
                            borderRadius: "12px",
                            display: "inline-block"
                        }}
                    >
                        ✅ Completed Tasks
                    </Typography>
                </motion.div>

                {loading ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2, color: '#333' }}>
                        Loading tasks...
                    </Typography>
                ) : tasks.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2, color: '#333' }}>
                        No tasks completed yet.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 3,
                            width: '100%',
                            maxWidth: '1000px',
                        }}
                    >
                        {tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                style={{ height: '100%' }}
                            >
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6">{task.title}</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                            {task.description}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                            Priority: {task.priority}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                            Deadline: {new Date(task.deadline).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ padding: 2, pt: 0 }}>
                                        <Link to={`/task/${task.id}`} style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" color="primary" fullWidth>
                                                View Task
                                            </Button>
                                        </Link>
                                    </Box>
                                </Card>
                            </motion.div>
                        ))}
                    </Box>
                )}
            </Box>

            <Footer />
        </Box>
    );
};

export default CompletedTasksPage;
