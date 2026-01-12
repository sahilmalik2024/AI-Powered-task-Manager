import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface TaskCardProps {
  title: string;
  description: string;
  priority: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, priority }) => {
  return (
    <Card sx={{ marginY: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography color="text.secondary">Priority: {priority}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
