import Image from "next/image";
import {
  VideoIcon,
  FileIcon,
  X,
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UploadFile } from "@/stores/slices/upload-slice";
import { StorageProvider } from "@/types";
import { FileProgressBars } from "./file-progress-bars";

interface FileUploadItemProps {
  file: UploadFile;
  onRemoveFile: (fileId: string) => void;
  onToggleExpanded: (fileId: string) => void;
  showProgress: boolean;
}

export function FileUploadItem({
  file,
  onRemoveFile,
  onToggleExpanded,
  showProgress,
}: FileUploadItemProps) {
  return (
    <Collapsible
      open={file.expanded}
      onOpenChange={() => onToggleExpanded(file.temporaryId)}
      className="overflow-hidden rounded-md border"
    >
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            {file.type?.startsWith("image/") ? (
              <Image
                src={file.preview || "/placeholder.svg"}
                alt={file.name}
                fill
                className="object-cover"
              />
            ) : file.type?.startsWith("video/") ? (
              <div className="flex h-full items-center justify-center bg-black">
                <VideoIcon className="h-8 w-8 text-white" />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <FileIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="truncate font-medium" title={file.name}>
                  {file.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB{" "}
                  {file.type
                    ? `• ${file.type.split("/")[1].toUpperCase()}`
                    : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {showProgress && file.status === "completed" && (
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    <CheckIcon className="mr-1 h-3 w-3" />
                    Completado
                  </Badge>
                )}

                {!showProgress && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFile(file.temporaryId);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}

                <CollapsibleTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    {file.expanded ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>

            {/* Barra de progreso principal del archivo */}
            {file.serverFileId && <FileProgressBars file={file} />}
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      <CollapsibleContent>
        <div className="bg-accent/20 px-3 pb-3 pt-1">
          <h4 className="mb-2 text-sm font-medium">Información adicional</h4>
          <div className="text-xs text-muted-foreground">
            <p>Nombre completo: {file.name}</p>
            <p>Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <p>Tipo: {file.type || "Desconocido"}</p>
            {!showProgress && (
              <p className="mt-2">
                Los archivos se distribuirán a los proveedores seleccionados
                durante la carga.
              </p>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
