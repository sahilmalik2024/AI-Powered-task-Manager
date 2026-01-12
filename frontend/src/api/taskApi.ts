// src/api/tasks.ts
import axiosInstance from './axiosInstance'; // Import the Axios instance

const API_URL = 'tasks';

// Get All Tasks
export const getTasks = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Create Task
export const createTask = async (taskData: any) => {
    try {
      const token = localStorage.getItem('token');
        const response = await axiosInstance.post(API_URL, taskData);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Update Task
export const updateTask = async (taskId: number, taskData: { title: string; description: string; priority: string; deadline: string }) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Delete Task
export const deleteTask = async (taskId: number) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Update Task Status
export const updateTaskStatus = async (taskId: number, status: boolean) => {
    try {
        const response = await axiosInstance.patch(`${API_URL}/${taskId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
};

export const sendTaskNotification = async (tasks: any[]) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('http://localhost:8000/send-task-notification', 
          { tasks },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          }
      );
      return response.data; // Assuming the backend returns a success message
  } catch (error) {
      console.error('Error sending task notification:', error);
      throw error;
  }
};
