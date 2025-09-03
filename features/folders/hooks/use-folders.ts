import { useCallback } from "react";
import { useBoundStore } from "@/stores/use-bound-store";
import { useFetchFolders } from "@/hooks/use-get-folders";
import { MediaFolder } from "@/types/MediaFolder";

export function useFolders() {
  // Cargar folders usando el hook global existente
  useFetchFolders();

  // Zustand state y actions
  const {
    folders,
    selectedFolder,
    isLoading,
    isError,
    setSelectedFolder,
  } = useBoundStore((s) => s);

  const selectFolder = useCallback((folderId: string) => {
    const folder = folders.find(f => f._id === folderId);
    if (folder) {
      setSelectedFolder(folder);
    }
  }, [folders, setSelectedFolder]);

  const clearSelection = useCallback(() => {
    setSelectedFolder(null);
  }, [setSelectedFolder]);

  const getFolderById = useCallback((folderId: string): MediaFolder | undefined => {
    return folders.find(f => f._id === folderId);
  }, [folders]);

  // Estadísticas de carpetas
  const totalFolders = folders.length;
  const totalImages = folders.reduce((sum, folder) => sum + (folder.imageCount || 0), 0);
  const totalVideos = folders.reduce((sum, folder) => sum + (folder.videoCount || 0), 0);

  return {
    // State
    folders,
    selectedFolder,
    isLoading,
    isError,
    
    // Stats
    totalFolders,
    totalImages,
    totalVideos,
    
    // Actions
    selectFolder,
    clearSelection,
    getFolderById,
  };
}