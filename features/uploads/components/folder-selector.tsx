import { FolderUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface FolderSelectorProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
}

export function FolderSelector({
  fileInputRef,
  onFileChange,
  isUploading,
}: FolderSelectorProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center rounded-lg p-6">
          <FolderUp className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-medium">Selecciona una carpeta</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Arrastra y suelta una carpeta aquí o haz clic para seleccionar
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            webkitdirectory="true"
            directory=""
            multiple
            className="hidden"
            onChange={onFileChange}
            disabled={isUploading}
          />
          <Button
            onClick={() => fileInputRef?.current?.click()}
            disabled={isUploading}
          >
            Seleccionar Carpeta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
