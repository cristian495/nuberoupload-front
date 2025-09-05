import { MediaFile } from "@/types";
import { createApiClient } from "./api-client";

// Crear cliente específico para auth con prefijo /auth
const filesApi = createApiClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/files`,
});

export const filesService = {
  getFolderFiles: async (folderId: string): Promise<MediaFile[]> => {
    const response = await filesApi.get(`/folders/${folderId}/`);
    return response.data;
  },

  streamFile: async (fileId: string, providerId: string): Promise<Blob> => {
    const response = await filesApi.get(`/${fileId}/stream`, {
      params: { provider: providerId },
      responseType: 'blob', // Importante para manejar el stream como blob
    });
    return response.data;
  },
};
