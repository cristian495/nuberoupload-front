import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FolderIcon,
  ImageIcon,
  VideoIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MediaFolder } from "@/types/MediaFolder";

interface FolderCardProps {
  folder: MediaFolder;
  onFolderSelect?: (folderId: string) => void;
  className?: string;
}

export function FolderCard({
  folder,
  onFolderSelect,
  className = "",
}: FolderCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleFolderClick = () => {
    if (onFolderSelect) {
      onFolderSelect(folder._id);
    } else {
      router.push(`/folder/${folder._id}`);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={`group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg ${className}`}
      onClick={handleFolderClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={folder.thumbnail || "/placeholder.svg"}
          alt={folder.name}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        {/* Botón de menú */}
        {/* <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={handleMenuClick}>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 bg-white/80 p-0 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
              >
                <MoreVerticalIcon className="h-4 w-4 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        {/* Información de la carpeta en overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <FolderIcon className="h-4 w-4 flex-shrink-0" />
              <h3 className="truncate text-sm font-medium">{folder.name}</h3>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="flex items-center space-x-1">
              <ImageIcon className="h-3 w-3" />
              <span>{folder.imageCount || 0}</span>
            </Badge>

            <Badge variant="outline" className="flex items-center space-x-1">
              <VideoIcon className="h-3 w-3" />
              <span>{folder.videoCount || 0}</span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
