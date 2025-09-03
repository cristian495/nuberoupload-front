import { FolderIcon, ImageIcon, VideoIcon, FileIcon, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FileSummaryProps {
  folderName: string;
  imageCount: number;
  videoCount: number;
  otherCount: number;
  totalFiles: number;
  isUploading: boolean;
  onClearAll: () => void;
  onUpload: () => void;
}

export function FileSummary({
  folderName,
  imageCount,
  videoCount,
  otherCount,
  totalFiles,
  isUploading,
  onClearAll,
  onUpload,
}: FileSummaryProps) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h2 className="flex items-center text-xl font-semibold">
          <FolderIcon className="mr-2 h-5 w-5" />
          {folderName}
        </h2>
        <div className="mt-2 flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <ImageIcon className="h-3 w-3" />
            <span>{imageCount} imágenes</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <VideoIcon className="h-3 w-3" />
            <span>{videoCount} videos</span>
          </Badge>
          {otherCount > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <FileIcon className="h-3 w-3" />
              <span>{otherCount} otros</span>
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">
            {totalFiles} archivos en total
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClearAll} disabled={isUploading}>
          Limpiar
        </Button>
        <Button onClick={onUpload} disabled={isUploading}>
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Subiendo..." : "Subir Carpeta"}
        </Button>
      </div>
    </div>
  );
}