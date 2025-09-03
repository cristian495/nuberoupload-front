import { AuthResponse, LoginData, RegisterData, User } from '@/types/Auth'
import { createApiClient } from './api-client'

// Crear cliente específico para auth con prefijo /auth
const authApi = createApiClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth`,
})

export const authService = {
  // Login con email y contraseña
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await authApi.post('/login', data)
    return response.data
  },

  // Registro de usuario
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await authApi.post('/register', data)
    return response.data
  },

  // Obtener perfil del usuario autenticado
  async getProfile(): Promise<User> {
    const response = await authApi.get('/profile')
    return response.data.user
  },

  // Logout
  async logout(): Promise<void> {
    await authApi.post('/logout')
    localStorage.removeItem('auth_token')
  },

  // Obtener URL para autenticación con Google
  getGoogleAuthUrl(): string {
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/google`
  },

  // Verificar si hay un token válido
  hasValidToken(): boolean {
    const token = localStorage.getItem('auth_token')
    if (!token) return false

    try {
      // Decodificar JWT para verificar expiración
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    } catch {
      return false
    }
  },

  // Guardar token
  setToken(token: string): void {
    localStorage.setItem('auth_token', token)
  },

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },

  // Remover token
  removeToken(): void {
    localStorage.removeItem('auth_token')
  },
}