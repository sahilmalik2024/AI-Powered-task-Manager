import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface Props {
    title: string;
    description: string;
}

const DashboardCard: React.FC<Props> = ({ title, description }) => (
    <motion.div whileHover={{ scale: 1.05 }}>
        <Card className="m-2 shadow" sx={{ minWidth: 220, bgcolor: '#f3e5f5' }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    </motion.div>
);

export default DashboardCard;
