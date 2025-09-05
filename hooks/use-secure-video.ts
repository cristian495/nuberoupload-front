import { useState, useEffect, useRef } from 'react';
import { filesService } from '@/lib/files-api';

interface UseSecureVideoOptions {
  fileId: string;
  providerId: string;
  enabled?: boolean;
}

interface SecureVideoState {
  videoUrl: string | null;
  loading: boolean;
  error: string | null;
}

export function useSecureVideo({ 
  fileId, 
  providerId, 
  enabled = true 
}: UseSecureVideoOptions): SecureVideoState {
  const [state, setState] = useState<SecureVideoState>({
    videoUrl: null,
    loading: false,
    error: null
  });
  
  const currentUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !fileId || !providerId) {
      return;
    }

    const createSecureVideoUrl = async () => {
      // Limpiar URL anterior
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = null;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Usar el servicio de files-api que maneja automáticamente la autenticación
        const blob = await filesService.streamFile(fileId, providerId);
        
        // Crear URL del blob para el video
        const videoUrl = URL.createObjectURL(blob);
        
        currentUrlRef.current = videoUrl;
        setState({
          videoUrl,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Error loading secure video:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Error al cargar video'
        }));
      }
    };

    createSecureVideoUrl();

    // Cleanup function
    return () => {
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = null;
      }
    };
  }, [fileId, providerId, enabled]);

  // Cleanup cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
      }
    };
  }, []);

  return state;
}