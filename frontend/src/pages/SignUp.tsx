import React, { useState } from "react";
import {
    Button,
    TextField,
    Paper,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";  // Assume this function will call the /register API

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = {
                username: username,
                email: email,
                password: password,
            };

            const response = await signupUser(payload);

            // Handle successful signup (e.g., redirect to login page)
            navigate("/");  // Redirect to login page after successful signup
        } catch (err: any) {
            setError(err?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, type: "spring", stiffness: 70 },
        },
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "transparent", backdropFilter: 'blur(8px)' }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-100"
                style={{ maxWidth: "400px" }}
            >
                <Paper elevation={6} className="p-4 rounded-4 shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>

                    <Typography variant="h6" className="mb-3 text-center fw-bold" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        🧠 AI Task Manager
                    </Typography>

                    {error && (
                        <Typography variant="body2" color="error" className="mb-2 text-center">
                            {error}
                        </Typography>
                    )}

                    <TextField
                        fullWidth
                        label="Username"
                        type="text"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((show) => !show)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword((show) => !show)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="mt-3"
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign Up"}
                    </Button>
                </Paper>
            </motion.div>
        </div>
    );
};

export default SignupPage;
