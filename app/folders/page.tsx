"use client";

import { DashboardLayout } from "@/components/layout";
import { useFolders } from "@/features/folders";
import {
  FoldersPageHeader,
  FoldersGrid,
} from "@/features/folders/components";

export default function FoldersPage() {
  const {
    folders,
    selectedFolder,
    isLoading,
    isError,
    totalFolders,
    totalImages,
    totalVideos,
    selectFolder,
    clearSelection,
  } = useFolders();

  const handleFolderSelect = (folderId: string) => {
    selectFolder(folderId);
    // Navegar a la página individual de la carpeta
    window.location.href = `/folder/${folderId}`;
  };

  const handleNavigateHome = () => {
    clearSelection();
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl">
        <FoldersPageHeader
          totalFolders={totalFolders}
          totalImages={totalImages}
          totalVideos={totalVideos}
        />

        <FoldersGrid
          folders={folders}
          onFolderSelect={handleFolderSelect}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </DashboardLayout>
  );
}
