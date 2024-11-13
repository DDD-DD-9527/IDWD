const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  todos: {
    getAll: () => `${API_URL}/todos`,
    getOne: (id) => `${API_URL}/todos/${id}`,
    create: () => `${API_URL}/todos`,
    update: (id) => `${API_URL}/todos/${id}`,
    delete: (id) => `${API_URL}/todos/${id}`
  }
}; 