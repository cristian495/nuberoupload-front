"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useBoundStore } from "@/stores/use-bound-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/auth", "/auth/callback"];

// Función para verificar si una ruta es pública
const isPublicRoute = (pathname: string): boolean => {
  return publicRoutes.some((route) => pathname.startsWith(route));
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { authState, checkAuth } = useBoundStore();

  useEffect(() => {
    // Manejar estado de autenticación y redirecciones
    switch (authState) {
      case 'INITIAL':
        checkAuth();
        break;
        
      case 'UNAUTHENTICATED':
        if (!isPublicRoute(pathname)) {
          router.push("/auth");
        }
        break;
        
      case 'AUTHENTICATED':
        if (isPublicRoute(pathname) && pathname !== "/auth/callback") {
          router.push("/");
        }
        break;
    }
  }, [authState, pathname]); // router y checkAuth son estables

  // Renderizar basado en el estado de autenticación
  const renderAuthState = () => {
    switch (authState) {
      case "INITIAL":
      case "CHECKING":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="card-modern w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-heading-2">NuberoUpload</CardTitle>
                <CardDescription>Verificando autenticación...</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
                <p className="text-body text-muted-foreground mt-4">
                  Un momento por favor...
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case "LOGGING_IN":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="card-modern w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-heading-2">
                  Iniciando sesión
                </CardTitle>
                <CardDescription>Por favor espera...</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
              </CardContent>
            </Card>
          </div>
        );

      case "LOGGING_OUT":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="card-modern w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-heading-2">
                  Cerrando sesión
                </CardTitle>
                <CardDescription>
                  Redirigiendo a la página de login...
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
              </CardContent>
            </Card>
          </div>
        );

      case "REDIRECTING":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="card-modern w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-heading-2">
                  Redirigiendo...
                </CardTitle>
                <CardDescription>Un momento por favor...</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
              </CardContent>
            </Card>
          </div>
        );

      case "UNAUTHENTICATED":
        // Solo mostrar "acceso denegado" si está en ruta privada y no se está redirigiendo
        if (!isPublicRoute(pathname)) {
          return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
              <Card className="card-modern w-full max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-heading-2">
                    Acceso Denegado
                  </CardTitle>
                  <CardDescription>
                    Redirigiendo a la página de login...
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
                </CardContent>
              </Card>
            </div>
          );
        }
        break;

      case "AUTHENTICATED":
        // Si está autenticado pero en ruta de auth, mostrar loading mientras redirige
        if (isPublicRoute(pathname) && pathname !== "/auth/callback") {
          return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
              <Card className="card-modern w-full max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-heading-2">NuberoUpload</CardTitle>
                  <CardDescription>
                    Redirigiendo al dashboard...
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
                </CardContent>
              </Card>
            </div>
          );
        }
        break;
    }

    return null;
  };

  const authComponent = renderAuthState();
  if (authComponent) {
    return authComponent;
  }

  // Si está autenticado o está en ruta pública, mostrar contenido
  return <div suppressHydrationWarning>{children}</div>;
}

// Hook para usar en componentes individuales
// export function useAuthGuard() {
//   const { isAuthenticated, isLoading, user } = useBoundStore();
//   const router = useRouter();
//   const pathname = usePathname();

//   const requireAuth = () => {
//     if (!isLoading && !isAuthenticated) {
//       router.push("/auth");
//       return false;
//     }
//     return true;
//   };

//   const redirectIfAuthenticated = (redirectTo: string = "/") => {
//     if (!isLoading && isAuthenticated) {
//       router.push(redirectTo);
//     }
//   };

//   return {
//     isAuthenticated,
//     isLoading,
//     user,
//     requireAuth,
//     redirectIfAuthenticated,
//     isPublicRoute: isPublicRoute(pathname),
//   };
// }
