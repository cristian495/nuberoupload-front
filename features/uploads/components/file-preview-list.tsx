import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUploadItem } from "./file-upload-item";
import { UploadFile } from "@/stores/slices/upload-slice";
import { StorageProvider } from "@/types";

interface FilePreviewListProps {
  files: UploadFile[];
  onRemoveFile: (fileId: string) => void;
  onToggleExpanded: (fileId: string) => void;
  showProgress: boolean;
}

export function FilePreviewList({
  files,
  onRemoveFile,
  onToggleExpanded,
  showProgress,
}: FilePreviewListProps) {
  return (
    <div className="mt-4">
      <h3 className="mb-3 text-lg font-medium">Vista previa de archivos</h3>
      <ScrollArea className="h-auto rounded-md border p-4">
        <div className="space-y-4">
          {files.map((file) => (
            <FileUploadItem
              key={file.temporaryId}
              file={file}
              onRemoveFile={onRemoveFile}
              onToggleExpanded={onToggleExpanded}
              showProgress={showProgress}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
