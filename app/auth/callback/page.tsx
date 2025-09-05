'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useBoundStore } from '@/stores/use-bound-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setToken, checkAuth } = useBoundStore()
  
  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token')
      const error = searchParams.get('error')

      if (error) {
        // Error en autenticación con Google
        console.error('Google auth error:', error)
        setTimeout(() => {
          router.push('/auth?error=google_auth_failed')
        }, 2000)
        return
      }

      if (token) {
        try {
          // Guardar token y verificar autenticación
          setToken(token)
          await checkAuth()
          
          // Redirigir al dashboard
          setTimeout(() => {
            router.push('/')
          }, 1500)
        } catch (error) {
          console.error('Failed to process Google auth:', error)
          setTimeout(() => {
            router.push('/auth?error=auth_processing_failed')
          }, 2000)
        }
      } else {
        // No hay token ni error, redirigir a auth
        router.push('/auth')
      }
    }

    handleCallback()
  }, [searchParams, router, setToken, checkAuth])

  const token = searchParams.get('token')
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-modern w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-heading-2">
            {error ? 'Error de Autenticación' : 'Procesando Autenticación'}
          </CardTitle>
          <CardDescription>
            {error ? 
              'Hubo un problema con tu autenticación' : 
              'Configurando tu sesión...'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center py-8">
          {error ? (
            <div className="space-y-4">
              <XCircle className="w-16 h-16 text-destructive mx-auto" />
              <p className="text-body text-muted-foreground">
                Redirigiendo a la página de login...
              </p>
            </div>
          ) : token ? (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-primary mx-auto" />
              <p className="text-body text-muted-foreground">
                ¡Autenticación exitosa! Redirigiendo al dashboard...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
              <p className="text-body text-muted-foreground">
                Procesando tu autenticación...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}