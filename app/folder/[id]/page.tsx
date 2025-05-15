"use client";
import { Suspense, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import MediaGallery from "@/components/media-gallery";
import Sidebar from "@/components/sidebar";
import { Search } from "@/components/search";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderIcon,
  HomeIcon,
  SearchIcon as SearchIconLucide,
  PlusSquareIcon,
  HeartIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchFolderById } from "@/hooks/use-get-folder-by-id";
import { useBoundStore } from "@/stores/use-bound-store";

export default function FolderPage() {
  const params = useParams();
  const folderId = params?.id as string;

  const { isLoading, isError, data: folder } = useFetchFolderById(folderId);
  const setSelectedFolder = useBoundStore((s) => s.setSelectedFolder);

  useEffect(() => {
    if (folder) setSelectedFolder(folder);
  }, [folder]);

  if (isLoading) return <p></p>;
  if (isError) return <p>Ocurrio un error...</p>;

  if (!folder) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - visible on desktop, hidden on mobile */}
      <div className="hidden md:block w-20 lg:w-64 border-r min-h-screen">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Header para móvil */}
          <div className="md:hidden border-b sticky top-0 bg-white z-10">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FolderIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                <h1 className="text-xl font-semibold">{folder.name}</h1>
              </div>
              <div className="flex items-center gap-4">
                <HeartIcon className="h-6 w-6" />
                <PlusSquareIcon className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Header para escritorio */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={folder.thumbnail || "/placeholder.svg"}
                    alt={folder.name}
                  />
                  <AvatarFallback>
                    <FolderIcon className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold">{folder.name}</h1>
                  <div className="flex items-center gap-4 text-sm mt-1">
                    <div className="flex items-center">
                      <span className="font-semibold mr-1">
                        {folder.imageCount}
                      </span>
                      imágenes
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-1">
                        {folder.videoCount}
                      </span>
                      videos
                    </div>
                    <div className="text-muted-foreground">
                      Actualizado:{" "}
                      {new Date(folder.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <Search />
            </div>

            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="photos">Fotos</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Suspense fallback={<GallerySkeleton />}>
                  <MediaGallery folderId={folderId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="photos">
                <Suspense fallback={<GallerySkeleton />}>
                  <MediaGallery type="image" folderId={folderId} />
                </Suspense>
              </TabsContent>
              <TabsContent value="videos">
                <Suspense fallback={<GallerySkeleton />}>
                  <MediaGallery type="video" folderId={folderId} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Barra de navegación inferior para móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white flex justify-around items-center p-3 z-10">
        <HomeIcon className="h-6 w-6" />
        <SearchIconLucide className="h-6 w-6" />
        <PlusSquareIcon className="h-6 w-6" />
        <HeartIcon className="h-6 w-6" />
        <UserIcon className="h-6 w-6" />
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-md" />
      ))}
    </div>
  );
}
