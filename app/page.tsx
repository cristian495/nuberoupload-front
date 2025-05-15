"use client";
import { Suspense, use } from "react";
import FolderExplorer from "@/components/folder-explorer";
import Sidebar from "@/components/sidebar";
import { Search } from "@/components/search";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HomeIcon,
  SearchIcon as SearchIconLucide,
  PlusSquareIcon,
  HeartIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FoldersProvider, useFolders } from "@/context/folders-context";
import { FolderProvider } from "@/context/folder-contex";
import { useFetchFolders } from "@/hooks/use-get-folders";
import { useBoundStore } from "@/stores/use-bound-store";

export default function Home() {
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
              <h1 className="text-xl font-semibold">MediaVault</h1>
              <div className="flex items-center gap-4">
                <HeartIcon className="h-6 w-6" />
                <PlusSquareIcon className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Header para escritorio */}
            <Header />
            <Suspense fallback={<FolderSkeleton />}>
              <FolderExplorer />
            </Suspense>
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

function FolderSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-md" />
      ))}
    </div>
  );
}

function Header() {
  // const { folders, isLoading, isError } = useFolders();

  const folders = useBoundStore((s) => s.folders);

  const folderCount = folders.length;
  const fileCount = folders.reduce((acc, folder) => acc + folder.count, 0);
  return (
    <div className="hidden md:flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>MV</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold">Mis Colecciones</h1>
          <div className="flex items-center gap-4 text-sm mt-1">
            <div>
              <span className="font-semibold">{folderCount}</span> carpetas
            </div>
            <div>
              <span className="font-semibold">{fileCount}</span> archivos
            </div>
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
}
