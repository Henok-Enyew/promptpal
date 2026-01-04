import axios from 'axios';

// API base URL - Production API at https://prompt-pal.onrender.com
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://prompt-pal.onrender.com/api/v1';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (can add auth tokens here if needed)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could trigger logout
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  checkAuth: async () => {
    const response = await api.get('/auth/check-auth');
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
};

// Comments API (mock for now, ready for backend integration)
export const commentsAPI = {
  getComments: async (promptId: string) => {
    // TODO: Replace with actual endpoint when backend is ready
    // const response = await api.get(`/prompts/${promptId}/comments`);
    // return response.data;
    
    // Mock data for now
    return {
      status: 'success',
      data: {
        comments: [
          {
            id: '1',
            text: 'This prompt is amazing! Really helped me generate better content.',
            author: {
              name: 'Sarah Chen',
              avatar: 'https://i.pravatar.cc/150?u=sarah',
            },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            text: 'Great structure! I modified it slightly for my use case.',
            author: {
              name: 'Alex Martinez',
              avatar: 'https://i.pravatar.cc/150?u=alex',
            },
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          },
        ],
      },
    };
  },

  addComment: async (promptId: string, text: string) => {
    // TODO: Replace with actual endpoint when backend is ready
    // const response = await api.post(`/prompts/${promptId}/comments`, { text });
    // return response.data;
    
    // Mock response for now
    return {
      status: 'success',
      data: {
        comment: {
          id: Date.now().toString(),
          text,
          author: {
            name: 'You',
            avatar: 'https://i.pravatar.cc/150?u=you',
          },
          createdAt: new Date().toISOString(),
        },
      },
    };
  },

  deleteComment: async (commentId: string) => {
    // TODO: Replace with actual endpoint when backend is ready
    // const response = await api.delete(`/comments/${commentId}`);
    // return response.data;
    
    return { status: 'success' };
  },
};

// Prompts API
export const promptsAPI = {
  getFeed: async (params?: {
    page?: number;
    limit?: number;
    tag?: string;
    aiModel?: string;
    search?: string;
  }) => {
    const response = await api.get('/prompts', { params });
    return response.data;
  },

  getPrompt: async (id: string) => {
    const response = await api.get(`/prompts/${id}`);
    return response.data;
  },
};

