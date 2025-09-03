"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FolderIcon,
  ImageIcon,
  VideoIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { fetchFolders } from "@/lib/api";
import { MediaFolder } from "@/types/MediaFolder";
import { useFolders } from "@/context/folders-context";
import { useFetchFolders } from "@/hooks/use-get-folders";
import { useBoundStore } from "@/stores/use-bound-store";

// Datos de ejemplo para carpetas
// const folders = [
//   {
//     id: "vacation-2024",
//     name: "2024-03 Latina 🏝️",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 24,
//     videoCount: 3,
//     lastUpdated: "2024-03-15",
//   },
//   {
//     id: "ngoc-album",
//     name: "Ngọc 🍀 Album",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 42,
//     videoCount: 0,
//     lastUpdated: "2024-02-28",
//   },
//   {
//     id: "family-2023",
//     name: "Familia 2023 👨‍👩‍👧",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 56,
//     videoCount: 12,
//     lastUpdated: "2023-12-31",
//   },
//   {
//     id: "work-project",
//     name: "Proyecto Trabajo 💼",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 18,
//     videoCount: 5,
//     lastUpdated: "2024-01-20",
//   },
//   {
//     id: "events-2023",
//     name: "Eventos 2023 🎭",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 37,
//     videoCount: 8,
//     lastUpdated: "2023-11-15",
//   },
//   {
//     id: "pets-collection",
//     name: "Mascotas 🐶🐱",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 64,
//     videoCount: 7,
//     lastUpdated: "2024-02-10",
//   },
//   {
//     id: "travel-europe",
//     name: "Viaje Europa 🇪🇺",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 128,
//     videoCount: 15,
//     lastUpdated: "2023-08-22",
//   },
//   {
//     id: "birthday-party",
//     name: "Fiesta Cumpleaños 🎂",
//     coverImage: "/placeholder.svg?height=500&width=500",
//     imageCount: 32,
//     videoCount: 4,
//     lastUpdated: "2024-01-05",
//   },
// ];

interface FolderExplorerProps {
  onFolderSelect?: (folderId: string) => void;
  className?: string;
}

export default function FolderExplorer({
  onFolderSelect,
  className,
}: FolderExplorerProps) {
  const router = useRouter();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  useFetchFolders();

  const folders = useBoundStore((s) => s.folders);
  const isLoading = useBoundStore((s) => s.isLoading);
  const isError = useBoundStore((s) => s.isError);

  if (isLoading) return <p>Cargando carpetas...</p>;
  if (isError) return <p>Error al cargar carpetas</p>;

  // const { folders, isLoading, isError } = useFolders();
  // if (isLoading) return <div>Loading folders...</div>;
  // if (isError || !folders) return <div>Error loading folders</div>;

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    if (onFolderSelect) {
      onFolderSelect(folderId);
    } else {
      router.push(`/folder/${folderId}`);
    }
  };

  return (
    <ScrollArea className={`h-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {folders.map((folder) => (
          <Card
            key={folder._id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleFolderClick(folder._id)}
          >
            <div className="relative aspect-square">
              <Image
                src={folder.thumbnail || "/placeholder.svg"}
                alt={folder.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FolderIcon className="h-4 w-4" />
                    <h3 className="font-medium text-sm truncate">
                      {folder.name}
                    </h3>
                  </div>
                  <ChevronRightIcon className="h-4 w-4" />
                </div>
              </div>
            </div>

            <CardContent className="p-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <ImageIcon className="h-3 w-3" />
                    <span>{folder.imageCount}</span>
                  </Badge>

                  <Badge
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <VideoIcon className="h-3 w-3" />
                    <span>{folder.videoCount}</span>
                  </Badge>
                </div>

                <span className="text-xs text-muted-foreground">
                  {new Date(folder.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
