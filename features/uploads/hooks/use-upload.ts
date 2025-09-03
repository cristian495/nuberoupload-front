import { useRef, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUploader } from "@/hooks/use-uploader";
import { UploadStatus } from "@/types/UploadStatus";
import { StorageProvider } from "@/types";
import { useBoundStore } from "@/stores/use-bound-store";
import { useFetchAvailableProviders } from "@/hooks/use-get-available-providers";

export function useUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar providers usando el hook global existente
  useFetchAvailableProviders();

  // Zustand state y actions
  const {
    uploadFiles: files,
    folderName,
    isUploading,
    showProgress,
    selectedProviders,
    addUploadFiles,
    setFolderName,
    setIsUploading,
    setShowProgress,
    clearAllUploadFiles,
    toggleFileExpanded,
    toggleProviderSelection,
  } = useBoundStore((s) => s);

  const { upload: uploadFile } = useUploader();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles || selectedFiles.length === 0) return;

      // Extraer el nombre de la carpeta del primer archivo
      const firstFilePath = selectedFiles[0].webkitRelativePath;
      const folderNameFromPath = firstFilePath.split("/")[0];
      setFolderName(folderNameFromPath);

      // Convertir FileList a array y agregar propiedades adicionales
      const newFiles = Array.from(selectedFiles).map((file) => {
        // Generar previsualizaciones para imágenes
        let preview;
        if (file.type?.startsWith("image/")) {
          preview = URL.createObjectURL(file);
        }

        return {
          temporaryId: Math.random().toString(36).substring(2, 9),
          expanded: false,
          preview,
          name: file.name,
          type: file.type,
          size: file.size,
          progress: 0,
          status: UploadStatus.starting,
          providerProgress: {},
          file: file,
          lastModified: file.lastModified,
          webkitRelativePath: file.webkitRelativePath,
        };
      });

      // Filtrar solo archivos válidos
      const validFiles = newFiles.filter((f) => {
        const type = f.type;
        return (
          type === "image/png" ||
          type === "image/jpg" ||
          type === "image/jpeg" ||
          type === "video/mp4" ||
          type === "video/avi"
        );
      });

      addUploadFiles(validFiles);
    },
    [],
  );

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      toast({
        title: "No hay archivos para subir",
        description: "Por favor selecciona una carpeta con archivos",
        variant: "destructive",
      });
      return;
    }

    if (selectedProviders.length === 0) {
      toast({
        title: "No hay proveedores seleccionados",
        description:
          "Por favor selecciona al menos un proveedor de almacenamiento",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setShowProgress(true);

    try {
      await Promise.all(
        files.map(async (f) => {
          await uploadFile(f, folderName, selectedProviders);
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  }, [
    files,
    selectedProviders,
    folderName,
    uploadFile,
    setIsUploading,
    setShowProgress,
  ]);

  const removeFile = useCallback((fileId: string) => {
    // TODO: Implementar removeUploadFile en Zustand
    console.log("Remove file", fileId);
  }, []);

  const clearAll = useCallback(() => {
    // Liberar las URLs de objeto creadas para las previsualizaciones
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    clearAllUploadFiles();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [files, clearAllUploadFiles]);

  // toggleFileExpanded y toggleProviderSelection ya vienen de Zustand

  // Contar tipos de archivos
  const imageCount = files.filter((file) =>
    file.type?.startsWith("image/"),
  ).length;
  const videoCount = files.filter((file) =>
    file.type?.startsWith("video/"),
  ).length;
  const otherCount = files.length - imageCount - videoCount;

  return {
    // State
    files,
    folderName,
    isUploading,
    showProgress,
    selectedProviders,
    fileInputRef,

    // Counts
    imageCount,
    videoCount,
    otherCount,

    // Actions
    handleFileChange,
    handleUpload,
    removeFile,
    clearAll,
    toggleFileExpanded,
    toggleProviderSelection,
  };
}
