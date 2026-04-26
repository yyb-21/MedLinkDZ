import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'medlink_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      tokenStore.clear();
    }
    return Promise.reject(err);
  }
);

/* ============= AUTH ============= */
export const authApi = {
  register: (data) => api.post('/api/auth/register', data).then(r => r.data),
  login: (data) => api.post('/api/auth/login', data).then(r => r.data),
  me: () => api.get('/api/auth/me').then(r => r.data),
  updateProfile: (formData) =>
    api.patch('/api/auth/update-profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data),
};

/* ============= ANNONCES ============= */
export const annonceApi = {
  list: (params) => api.get('/api/annonces', { params }).then(r => r.data),
  getById: (id) => api.get(`/api/annonces/${id}`).then(r => r.data),
  myAnnonces: () => api.get('/api/annonces/user/my-annonces').then(r => r.data),
  create: (formData) =>
    api.post('/api/annonces', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data),
  update: (id, data) => api.put(`/api/annonces/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/api/annonces/${id}`).then(r => r.data),
};

/* ============= CATALOG ============= */
export const catalogApi = {
  categories: () => api.get('/api/catalog/categories').then(r => r.data),
  medicaments: (params) => api.get('/api/catalog/medicaments', { params }).then(r => r.data),
  wilayas: () => api.get('/api/catalog/wilayas').then(r => r.data),
};

/* ============= ORDONNANCES ============= */
export const ordonnanceApi = {
  upload: (file) => {
    const fd = new FormData();
    fd.append('ordonnance', file);
    return api.post('/api/ordonnances/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data);
  },
  getById: (id) => api.get(`/api/ordonnances/${id}`).then(r => r.data),
};

/* ============= ADMIN ============= */
export const adminApi = {
  stats: () => api.get('/api/admin/stats').then(r => r.data),
  pending: () => api.get('/api/admin/pending').then(r => r.data),
  moderateAnnonce: (id, statut) =>
    api.patch(`/api/admin/moderate/${id}`, { statut }).then(r => r.data),
  moderateOrdonnance: (id, payload) =>
    api.patch(`/api/admin/ordonnance/${id}`, payload).then(r => r.data),
};

/* Build absolute URL for backend-hosted assets (e.g. avatar_url = "/uploads/..."). */
export const assetUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default api;
