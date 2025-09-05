import { useBoundStore } from "@/stores/use-bound-store";
import { UploadStatus } from "@/types/UploadStatus";
import { UploadFile } from "@/stores/slices/upload-slice";
import { StorageProvider } from "@/types";
import { uploadsService } from "@/lib/uploads-api";

export function useUploader() {
  const updateFileProgress = useBoundStore((s) => s.updateFileProgress);
  const setServerFileId = useBoundStore((s) => s.setServerFileId);

  const upload = async (
    file: UploadFile,
    folderName: string,
    selectedProviders: StorageProvider[],
  ) => {
    try {
      // Paso 1: Subir archivo al servidor (guardado temporal)
      const result = await uploadsService.uploadFile({
        file: file.file,
        folderName,
        selectedProviders,
        onProgress: (percent) => {
          console.log("Server upload progress:", percent);
          // Usar temporaryId para mostrar progreso de subida HTTP
          updateFileProgress(file.temporaryId, percent, UploadStatus.uploading);
        },
      });

      // Paso 2: Guardar el fileId real del servidor
      console.log("File uploaded to server, fileId:", result.fileId);
      setServerFileId(file.temporaryId, result.fileId);

      // Ahora los WebSocket events usarán result.fileId para actualizar progreso de providers
      
    } catch (error) {
      console.error("Upload failed:", error);
      updateFileProgress(file.temporaryId, 0, UploadStatus.error);
    }
  };

  return { upload };
}