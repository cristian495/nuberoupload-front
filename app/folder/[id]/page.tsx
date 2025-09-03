"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchFolderById } from "@/hooks/use-get-folder-by-id";
import { useFetchFolderFiles } from "@/features/folders/hooks";
import { FilesGrid } from "@/features/folders/components";
import { DashboardLayout } from "@/components/layout";

export default function FolderPage() {
  const params = useParams();
  const folderId = params?.id as string;

  const {
    isLoading: folderLoading,
    isError: folderError,
    data: folder,
  } = useFetchFolderById(folderId);

  const {
    isLoading: filesLoading,
    isError: filesError,
    data: files = [],
  } = useFetchFolderFiles(folderId);

  if (folderLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <FilesGridSkeleton />
        </div>
      </div>
    );
  }

  if (folderError || !folder) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="mb-2 text-destructive">Error al cargar la carpeta</p>
          <p className="text-sm text-muted-foreground">
            La carpeta no existe o ocurrió un error
          </p>
        </div>
      </div>
    );
  }

  const allFiles = files || [];
  const imageFiles = allFiles.filter((file) => file.category === "image");
  const videoFiles = allFiles.filter((file) => file.category === "video");

  return (
    <DashboardLayout>
    <div className="container mx-auto p-2">
      {/* <SectionHeader
        title={folder.name}
        description={`${folder.imageCount} imágenes • ${folder.videoCount} videos • Actualizado ${new Date(folder.updatedAt).toLocaleDateString()}`}
      /> */}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos ({allFiles.length})</TabsTrigger>
          <TabsTrigger value="photos">Fotos ({imageFiles.length})</TabsTrigger>
          <TabsTrigger value="videos">Videos ({videoFiles.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <FilesGrid
            files={allFiles}
            isLoading={filesLoading}
            isError={filesError}
          />
        </TabsContent>

        <TabsContent value="photos">
          <FilesGrid
            files={imageFiles}
            isLoading={filesLoading}
            isError={filesError}
          />
        </TabsContent>

        <TabsContent value="videos">
          <FilesGrid
            files={videoFiles}
            isLoading={filesLoading}
            isError={filesError}
          />
        </TabsContent>
      </Tabs>
    </div></DashboardLayout>
  );
}

function FilesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-md" />
      ))}
    </div>
  );
}
