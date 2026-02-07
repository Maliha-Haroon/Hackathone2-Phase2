'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { taskService } from '../../lib/api/tasks';
import { Task, TaskCreate } from '../../lib/types';
import { authService } from '../../lib/api/auth';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  // Load tasks from API
  useEffect(() => {
    if (!userId) {
      router.push('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const data = await taskService.getAll(userId);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Redirect to login if unauthorized
        if ((error as any).response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId, router]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTask.title.trim() || !userId) return;
    
    const taskData: TaskCreate = {
      title: newTask.title,
      description: newTask.description,
      completed: false
    };
    
    try {
      const newTaskResult = await taskService.create(userId, taskData);
      setTasks([newTaskResult, ...tasks]); // Add new task to the beginning
      setNewTask({ title: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTaskCompletion = async (id: number) => {
    if (!userId) return;
    
    try {
      const updatedTask = await taskService.toggleComplete(userId, id);
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const deleteTask = async (id: number) => {
    if (!userId) return;
    
    try {
      await taskService.delete(userId, id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if API logout fails, clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
    }
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-2xl text-neon-purple neon-text">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold neon-text mb-2">Neon Todo</h1>
            <p className="text-gray-400">Welcome back! Manage your tasks with style.</p>
          </div>
          <button
            onClick={handleLogout}
            className="group px-6 py-3 bg-transparent border-2 border-neon-pink text-neon-pink rounded-lg hover:bg-neon-pink/10 transition-all duration-300 neon-glow-pink hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </header>

        <main className="mt-8 space-y-8">
          {/* Add Task Form */}
          <div className="glass-effect p-8 rounded-xl border border-neon-blue/30 neon-glow-blue hover:border-neon-blue/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-neon-blue neon-text-blue">Add New Task</h2>
            </div>
            <form onSubmit={handleAddTask} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Title <span className="text-neon-pink">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none input-focus text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="What needs to be done?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none input-focus text-white placeholder-gray-500 transition-all duration-300 resize-none"
                  placeholder="Additional details (optional)..."
                  rows={3}
                />
              </div>
              
              <button
                type="submit"
                className="w-full group px-6 py-3 bg-transparent border-2 border-neon-blue text-white font-semibold rounded-lg hover:bg-neon-blue/10 transition-all duration-300 neon-glow-blue hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </form>
          </div>

          {/* Tasks List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-3xl font-semibold text-neon-purple neon-text">
                  Your Tasks
                  <span className="ml-3 text-lg text-gray-400 font-normal">({tasks.length})</span>
                </h2>
              </div>
            </div>
            
            {tasks.length === 0 ? (
              <div className="glass-effect text-center py-16 rounded-xl border border-neon-purple/20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-purple/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-300 text-xl mb-2">No tasks yet</p>
                <p className="text-gray-500">Add your first task to get started!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className={`task-card glass-effect p-6 rounded-xl border ${
                      task.completed 
                        ? 'border-neon-green/30 neon-glow-green' 
                        : 'border-neon-purple/30 neon-glow'
                    } slide-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="relative mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="w-6 h-6 rounded border-2 border-gray-600 bg-gray-800/50 text-neon-green focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer transition-all duration-300 checked:bg-neon-green checked:border-neon-green"
                            style={{ accentColor: '#3cba54' }}
                          />
                          {task.completed && (
                            <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-black pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-xl font-semibold mb-2 ${
                            task.completed 
                              ? 'line-through text-gray-500' 
                              : 'text-white'
                          }`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className={`mb-3 ${
                              task.completed 
                                ? 'line-through text-gray-500' 
                                : 'text-gray-400'
                            }`}>
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {new Date(task.created_at).toLocaleDateString()}
                            </div>
                            {task.completed && (
                              <div className="flex items-center gap-1 text-neon-green">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Completed
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="group p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 flex-shrink-0"
                        aria-label="Delete task"
                      >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}