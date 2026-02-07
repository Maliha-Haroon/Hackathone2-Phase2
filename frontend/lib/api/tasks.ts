// api/tasks.ts
import apiClient from './client';
import { Task, TaskCreate, TaskUpdate } from '../types';

export const taskService = {
  getAll: async (userId: string) => {
    const response = await apiClient.get<Task[]>(`/users/${userId}/tasks`);
    return response.data;
  },

  create: async (userId: string, task: TaskCreate) => {
    const response = await apiClient.post<Task>(`/users/${userId}/tasks`, task);
    return response.data;
  },

  update: async (userId: string, taskId: number, task: TaskUpdate) => {
    const response = await apiClient.put<Task>(`/users/${userId}/tasks/${taskId}`, task);
    return response.data;
  },

  delete: async (userId: string, taskId: number) => {
    const response = await apiClient.delete(`/users/${userId}/tasks/${taskId}`);
    return response.data;
  },

  toggleComplete: async (userId: string, taskId: number) => {
    const response = await apiClient.patch<Task>(`/users/${userId}/tasks/${taskId}/complete`);
    return response.data;
  }
};