// api/auth.ts
import apiClient from './client';

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/register', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post<LoginResponse>('/login', data);
    
    // Store the token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user_id', response.data.user_id);
    }
    
    return response.data;
  },

  logout: async () => {
    try {
      await apiClient.post('/logout');
    } finally {
      // Clear tokens regardless of API response
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
    }
  }
};