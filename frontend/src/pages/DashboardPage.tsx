import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardCard from "../components/DashboardCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation

const dashboardLinks = [
  { title: "Tasks", description: "View and manage tasks", path: "/taskstablepage" },
  { title: "Create Tasks", description: "Create a new task", path: "/createtaskpage" },
  { title: "User Profile", description: "View and edit your profile", path: "/profile" },
  { title: "Today's Tasks", description: "View tasks for today", path: "/todaystaskspage" },
  { title: "Recently Completed Tasks", description: "View completed tasks.", path: "/completedtasks" },
];

const DashboardPage: React.FC = () => {
  const username = localStorage.getItem("username") || "User";

  return (
    <Box display="flex" justifyContent="center" mb={4} flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container sx={{ my: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
            👋 Welcome back, {username}!
          </Typography>
        </motion.div>

        <Typography
          variant="h5"
          className="mb-3 fw-semibold"
          sx={{
            color: "#fff",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "0.4rem 0.8rem",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          📅 Dashboard Links
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // 4 columns for 4 cards
            gap: 2,  // space between cards
            overflow: "hidden", // no scrolling
            width: "100%", // ensure cards fit the container
          }}
        >
          {dashboardLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}  // Fancy hover effect
              transition={{ duration: 0.3 }}
            >
              <Link to={link.path} style={{ textDecoration: "none" }}>
                <DashboardCard
                  title={link.title}
                  description={link.description}
                />
              </Link>
            </motion.div>
          ))}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default DashboardPage;
