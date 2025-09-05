import { ScrollArea } from "@/components/ui/scroll-area";
import { MediaFile } from "@/types";
import { FileCard } from "./file-card";

interface FilesGridProps {
  files: MediaFile[];
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export function FilesGrid({ 
  files, 
  isLoading = false, 
  isError = false,
  className = "" 
}: FilesGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Cargando archivos...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Error al cargar archivos</p>
          <p className="text-sm text-muted-foreground">
            Por favor, intenta recargar la página
          </p>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">No hay archivos en esta carpeta</p>
          <p className="text-sm text-muted-foreground">
            Los archivos aparecerán aquí una vez que sean subidos
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className={`h-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 p-1">
        {files.map((file) => (
          <FileCard
            key={file._id}
            file={file}
            className="rounded-md"
          />
        ))}
      </div>
    </ScrollArea>
  );
}