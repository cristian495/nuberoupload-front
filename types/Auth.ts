export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export interface User {
  _id: string
  email: string
  name: string
  provider: AuthProvider
  avatar?: string
  emailVerified: boolean
  lastLoginAt: string
}

export interface RegisterData {
  email: string
  name: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  loginWithGoogle: () => void
}