import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Cliente API base compartido para toda la aplicación
 * 
 * Características:
 * - Configuración base común (URL, headers)
 * - Interceptor automático para JWT token
 * - Manejo de errores 401 (logout automático)
 * 
 * Uso básico:
 * ```typescript
 * import { apiClient } from './api-client';
 * const response = await apiClient.get('/users');
 * ```
 * 
 * Para casos específicos (como auth con diferente baseURL):
 * ```typescript
 * import { createApiClient } from './api-client';
 * const authApi = createApiClient({ 
 *   baseURL: 'http://localhost:3001/auth' 
 * });
 * ```
 */

// Cliente base compartido
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor global para agregar token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejo de respuestas de error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores 401 (no autorizado) - opcional
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // Opcional: redirigir a login
    }
    return Promise.reject(error);
  }
);

// Función helper para crear clientes específicos si necesitas configuración extra
export const createApiClient = (config = {}) => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  // Aplicar los mismos interceptores
  client.interceptors.request.use((requestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
      }
      return Promise.reject(error);
    }
  );

  return client;
};