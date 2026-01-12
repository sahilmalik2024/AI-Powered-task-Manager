import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

const Footer: React.FC = () => (
    <Box component="footer" className="text-center py-4 mt-auto bg-light border-top">
        <Container>
            <Typography variant="body2">© 2025 AI Task Manager | <Link href="#">Contact Us</Link> | <Link href="#">About</Link></Typography>
            <Typography variant="body2">
                <Link href="#">Twitter</Link> • <Link href="#">LinkedIn</Link> • <Link href="#">GitHub</Link>
            </Typography>
        </Container>
    </Box>
);

export default Footer;
