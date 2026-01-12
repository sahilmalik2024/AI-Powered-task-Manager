import axiosInstance from '../api/axiosInstance';

export interface LoginPayload {
    username: string;
    password: string;
}

export const loginUser = async (payload: URLSearchParams) => {
    try {
        const response = await axiosInstance.post('/auth/login', payload, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Login failed' };
    }
};

export const signupUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await axiosInstance.post('auth/register', userData);
    return response.data;
};