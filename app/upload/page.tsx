"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DashboardLayout } from "@/components/layout";
import { useUpload } from "@/features/uploads/hooks/use-upload";
import {
  UploadsPageHeader,
  FolderSelector,
  FileSummary,
  ProviderSelection,
  FilePreviewList,
} from "@/features/uploads/components";

export default function UploadsPage() {
  const {
    files,
    folderName,
    isUploading,
    showProgress,
    fileInputRef,
    imageCount,
    videoCount,
    otherCount,
    handleFileChange,
    handleUpload,
    removeFile,
    clearAll,
    toggleFileExpanded,
    toggleProviderSelection,
  } = useUpload();

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-5xl">
        <UploadsPageHeader />

        <FolderSelector
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          isUploading={isUploading}
        />

        {files.length > 0 && (
          <div className="space-y-6">
            <FileSummary
              folderName={folderName}
              imageCount={imageCount}
              videoCount={videoCount}
              otherCount={otherCount}
              totalFiles={files.length}
              isUploading={isUploading}
              onClearAll={clearAll}
              onUpload={handleUpload}
            />

            <ProviderSelection onToggleProvider={toggleProviderSelection} />

            {!isUploading &&
              files.some(
                (file) =>
                  !file.type?.startsWith("image/") &&
                  !file.type?.startsWith("video/"),
              ) && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Archivos no compatibles</AlertTitle>
                  <AlertDescription>
                    Algunos archivos no son imágenes ni videos. Solo se
                    mostrarán los archivos multimedia en la galería.
                  </AlertDescription>
                </Alert>
              )}

            <FilePreviewList
              files={files}
              onRemoveFile={removeFile}
              onToggleExpanded={toggleFileExpanded}
              showProgress={showProgress}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
