// Detecta se está em produção ou desenvolvimento
const isProd = import.meta.env. PROD;

export const API_URL = isProd
  ? 'https://seu-backend.onrender.com/api'  // Vamos criar isso já já
  : 'http://localhost:5000/api';
