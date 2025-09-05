import { UploadFileData } from "@/types/requests/UploadFileData";
import { createApiClient } from "./api-client";

// Crear cliente específico para auth con prefijo /auth
const uploadsApi = createApiClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/uploads`,
});

export const uploadsService = {
  async uploadFile({
    file,
    folderName,
    selectedProviders,
    onProgress,
  }: UploadFileData): Promise<{ fileId: string; file: any; folder: any }> {
    console.log({
      file,
      folderName,
      selectedProviders,
      onProgress,
    });
    const form = new FormData();
    form.append("file", file);
    form.append("folderName", folderName);
    for (let i = 0; i < selectedProviders.length; i++) {
      form.append(`providerIds[${i}]`, selectedProviders[i]._id);
    }

    const response = await uploadsApi.post("/file", form, {
      headers: {
        "Content-Type": undefined, // Dejar que el browser maneje el multipart/form-data
      },
      onUploadProgress: (event) => {
        if (!event.total) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress?.(percent);
      },
    });

    return response.data;
  },
};
