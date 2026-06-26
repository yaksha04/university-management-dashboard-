import axios from 'axios';

const api = axios.create({ baseURL: '/api/reports', timeout: 10000 });

export const fetchSummary    = ()           => api.get('/summary');
export const fetchReport     = (type, params) => api.get(`/${type}`, { params });
export const fetchHistory    = ()           => api.get('/history');
export const getExportURL    = (fmt, type, params) => {
  const q = new URLSearchParams({ type, ...params }).toString();
  return `/api/reports/export/${fmt}?${q}`;
};
export default api;
