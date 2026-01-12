import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const user = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  username: 'janedoe123',
  role: 'Productivity Enthusiast',
  joined: 'January 2024',
  location: 'San Francisco, CA',
  avatar: 'https://i.pravatar.cc/150?img=5' // demo image
};

const ProfilePage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          background: 'linear-gradient(135deg, #e0f7fa 0%, #e1bee7 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <Card
            sx={{
              padding: 3,
              borderRadius: '16px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white'
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Avatar
                src={user.avatar}
                sx={{ width: 100, height: 100, marginBottom: 2 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                @{user.username}
              </Typography>
            </Box>

            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Role:</strong> {user.role}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Location:</strong> {user.location}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Joined:</strong> {user.joined}
              </Typography>

              <Link to="/edit-profile" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" fullWidth>
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProfilePage;
