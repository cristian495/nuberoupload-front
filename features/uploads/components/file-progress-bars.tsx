import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadFile } from "@/stores/slices/upload-slice";
import { useUploadProgress } from "@/hooks/use-upload-progress";
import { StorageProvider } from "@/types";
import { cn } from "@/lib/utils";
import { useBoundStore } from "@/stores/use-bound-store";

interface FileProgressBarsProps {
  file: UploadFile;
}

export function FileProgressBars({ file }: FileProgressBarsProps) {
  const { selectedProviders } = useBoundStore((s) => s);
  console.log("FileProgressBars", file.serverFileId)
  useUploadProgress(file.serverFileId ?? "", () => {}); // Se suscribe a eventos de este archivo

  return (
    <div className="mt-2 space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="font-medium">Subida al servidor</span>
          <div className="flex items-center gap-2">
            <span>{file.progress || 0}%</span>
          </div>
        </div>
        <Progress
          value={file.progress || 0}
          className={cn("h-2", {
            "bg-red-500": file.status === "error",
            "bg-green-500": file.status === "completed",
            "bg-blue-500": file.status === "uploading",
          })}
          indicatorClassName={cn({
            "bg-red-500": file.status === "error",
            "bg-green-500": file.status === "completed",
            "bg-blue-500": file.status === "uploading",
          })}
        />
      </div>

      {/* Mostrar barras de proveedores directamente */}
      {selectedProviders.length > 0 && (
        <div className="mt-3 space-y-2 border-t pt-2">
          <div className="flex justify-between text-xs">
            <span className="font-medium">Distribución a proveedores</span>
          </div>
          <div className="space-y-2">
            {selectedProviders.map((provider) => {
              const providerProgress = file.providerProgress[provider._id];
              const progress = providerProgress?.progress || 0;
              const status = providerProgress?.status;
              const error = providerProgress?.error;

              return (
                <div
                  key={`${file.temporaryId}-${provider._id}-inline`}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-1">
                      {provider?.icon}
                      <span>{provider?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {status === "completed" ? (
                        <Badge
                          variant="outline"
                          className="h-5 border-green-200 bg-green-50 text-green-700"
                        >
                          <CheckIcon className="mr-1 h-3 w-3" />
                          Completado
                        </Badge>
                      ) : status === "error" ? (
                        <Badge
                          variant="outline"
                          className="h-5 border-red-200 bg-red-50 text-red-700"
                        >
                          Error
                        </Badge>
                      ) : (
                        <span>{progress}%</span>
                      )}
                    </div>
                  </div>
                  <Progress
                    value={progress}
                    className={cn("h-1.5", {
                      "bg-red-500": status === "error",
                      "bg-green-500": status === "completed",
                      "bg-blue-500": status === "uploading",
                    })}
                    indicatorClassName={cn({
                      "bg-red-500": status === "error",
                      "bg-green-500": status === "completed",
                      "bg-blue-500": status === "uploading",
                    })}
                  />
                  {status === "error" && error && (
                    <div className="mt-1 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                      <span className="font-medium">Error: </span>
                      {error}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
