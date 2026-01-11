// Detecta se está em produção ou desenvolvimento
const isProd = import.meta.env. PROD;

export const API_URL = isProd
  ? 'https://github-dashboard-backend-gea7.onrender.com/api'
  : 'http://localhost:5000/api';
