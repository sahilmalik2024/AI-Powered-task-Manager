import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { getTasks, sendTaskNotification } from '../api/taskApi'; // Assume sendTaskNotification triggers email
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

const TodaysTasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [emailStatus, setEmailStatus] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(); // Fetch tasks from API
                const todaysTasks = filterTodaysTasks(response);
                setTasks(todaysTasks);
            } catch (error) {
                console.error('Error fetching tasks', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];  // Format as 'YYYY-MM-DD'
    };

    const filterTodaysTasks = (tasks: Task[]) => {
        const today = new Date();
        return tasks.filter((task) => {
            const taskDate = new Date(task.deadline);

            return (
                taskDate.getDate() === today.getDate() &&
                taskDate.getMonth() === today.getMonth() &&
                taskDate.getFullYear() === today.getFullYear()
            );
        });
    };

    // Send notification to user (via email)
    const handleSendEmailNotification = async () => {
        try {
            const response = await sendTaskNotification(tasks);  // Assume this API sends the email notification
            setEmailStatus(response.message || "Notification sent!");
        } catch (error) {
            setEmailStatus("Error sending notification.");
        }
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar />

            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '2rem',
                }}
            >
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Typography
                        variant="h4"
                        className="fw-bold mb-4 text-center"
                        sx={{
                            color: "#fff",
                            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            padding: "0.5rem 1rem",
                            borderRadius: "12px",
                            display: "inline-block"
                        }}
                    >
                        📅 Today's Tasks
                    </Typography>
                </motion.div>

                {loading ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2, color: '#333' }}>
                        Loading tasks...
                    </Typography>
                ) : tasks.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2, color: '#333' }}>
                        No tasks due today.
                    </Typography>
                ) : (
                    <>
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

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSendEmailNotification}
                            sx={{ mt: 3 }}
                        >
                            Send Today's Tasks to My Email
                        </Button>

                        {emailStatus && (
                            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: emailStatus.includes("Error") ? 'red' : 'green' }}>
                                {emailStatus}
                            </Typography>
                        )}
                    </>
                )}
            </Box>

            <Footer />
        </Box>
    );
};

export default TodaysTasksPage;
