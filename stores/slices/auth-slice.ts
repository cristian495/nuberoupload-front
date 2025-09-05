import { StateCreator } from "zustand";
import { authService } from "@/lib/auth-api";
import { User, LoginData, RegisterData } from "@/types/Auth";
import { toast } from "@/components/ui/use-toast";

export type AuthState =
  | "INITIAL" // Estado inicial
  | "CHECKING" // Verificando token
  | "AUTHENTICATED" // Usuario autenticado
  | "UNAUTHENTICATED" // Usuario no autenticado
  | "LOGGING_IN" // Proceso de login
  | "LOGGING_OUT" // Proceso de logout
  | "REDIRECTING"; // Redirigiendo

export interface AuthSlice {
  // Estado
  user: User | null;
  token: string | null;
  authState: AuthState;

  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  checkAuth: () => Promise<void>;
  // clearAuth: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
  get
) => {
  // Helper para actualizar estado
  const updateAuthState = (
    newState: AuthState,
    updates: Partial<Omit<AuthSlice, "authState">> = {}
  ) => {
    set({
      ...updates,
      authState: newState,
    });
  };

  return {
    // Estado inicial - consistente entre servidor y cliente
    user: null,
    token: null,
    authState: "INITIAL" as AuthState,

    // Actions
    login: async (data: LoginData) => {
      try {
        updateAuthState("LOGGING_IN");
        const response = await authService.login(data);

        // Guardar token en localStorage
        authService.setToken(response.accessToken);

        // Actualizar estado
        updateAuthState("AUTHENTICATED", {
          user: response.user,
          token: response.accessToken,
        });

        toast({
          title: "Bienvenido",
          description: `Hola ${response.user.name}!`,
        });
      } catch (error: any) {
        updateAuthState("UNAUTHENTICATED");

        console.error("Login failed:", error);
        toast({
          title: "Error de autenticación",
          description:
            error.response?.data?.message.message || "Credenciales incorrectas",
          variant: "destructive",
        });

        throw error;
      }
    },

    register: async (data: RegisterData) => {
      try {
        updateAuthState("LOGGING_IN");

        const response = await authService.register(data);

        // Guardar token en localStorage
        authService.setToken(response.accessToken);

        // Actualizar estado
        updateAuthState("AUTHENTICATED", {
          user: response.user,
          token: response.accessToken,
        });

        toast({
          title: "Registro exitoso",
          description: `Bienvenido ${response.user.name}!`,
        });
      } catch (error: any) {
        updateAuthState("UNAUTHENTICATED");

        console.error("Registration failed:", error);
        toast({
          title: "Error en el registro",
          description:
            error.response?.data?.message || "Error al crear la cuenta",
          variant: "destructive",
        });

        throw error;
      }
    },

    logout: async () => {
      updateAuthState("LOGGING_OUT");

      // Limpiar localStorage
      authService.removeToken();

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });

      // Breve pausa para mostrar el toast
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Limpiar estado y redirigir
      updateAuthState("REDIRECTING", {
        user: null,
        token: null,
      });

      // Redirigir a login
      window.location.href = "/auth";
    },

    loginWithGoogle: () => {
      window.location.href = authService.getGoogleAuthUrl();
    },

    setUser: (user: User) => {
      updateAuthState("AUTHENTICATED", { user });
    },

    setToken: (token: string) => {
      authService.setToken(token);
      set({ token });
    },

    checkAuth: async () => {
      try {
        updateAuthState("CHECKING");

        if (authService.hasValidToken()) {
          const userData = await authService.getProfile();
          const token = authService.getToken();

          updateAuthState("AUTHENTICATED", {
            user: userData,
            token,
          });
        } else {
          // Token no válido o inexistente
          authService.removeToken();
          updateAuthState("UNAUTHENTICATED", {
            user: null,
            token: null,
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        authService.removeToken();
        updateAuthState("UNAUTHENTICATED", {
          user: null,
          token: null,
        });
      }
    },

    // clearAuth: () => {
    //   authService.removeToken();
    //   updateAuthState("UNAUTHENTICATED", {
    //     user: null,
    //     token: null,
    //   });
    // },
  };
};
