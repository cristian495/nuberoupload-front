import { ScrollArea } from "@/components/ui/scroll-area";
import { MediaFolder } from "@/types/MediaFolder";
import { FolderCard } from "./folder-card";

interface FoldersGridProps {
  folders: MediaFolder[];
  onFolderSelect?: (folderId: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export function FoldersGrid({ 
  folders, 
  onFolderSelect, 
  isLoading = false, 
  isError = false,
  className = "" 
}: FoldersGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Cargando carpetas...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Error al cargar carpetas</p>
          <p className="text-sm text-muted-foreground">
            Por favor, intenta recargar la página
          </p>
        </div>
      </div>
    );
  }

  if (folders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">No hay carpetas disponibles</p>
          <p className="text-sm text-muted-foreground">
            Sube algunos archivos para crear tus primeras carpetas
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className={`h-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-1">
        {folders.map((folder) => (
          <FolderCard
            key={folder._id}
            folder={folder}
            onFolderSelect={onFolderSelect}
            className="rounded-md"
          />
        ))}
      </div>
    </ScrollArea>
  );
}