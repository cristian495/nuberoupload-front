"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ServerIcon,
  UploadCloudIcon,
  Loader2Icon,
  FileIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { MediaFile } from "@/types/MediaFile";
import { StorageProvider } from "@/types/StorageProvider";

// Iconos para los proveedores
const providerIcons: Record<string, React.ReactNode> = {
  cloudinary: <FileIcon className="h-4 w-4" />,
  doodstream: <FileIcon className="h-4 w-4" />,
  gdrive: <FileIcon className="h-4 w-4" />,
  s3: <FileIcon className="h-4 w-4" />,
  dropbox: <FileIcon className="h-4 w-4" />,
};

interface BatchUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFiles: MediaFile[];
  availableProviders: StorageProvider[];
  onClearSelection: () => void;
}

export default function BatchUploadDialog({
  isOpen,
  onClose,
  selectedFiles,
  availableProviders,
  onClearSelection,
}: BatchUploadDialogProps) {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

  // Limpiar selección de proveedores al abrir el diálogo
  useEffect(() => {
    if (isOpen) {
      setSelectedProviders([]);
      setIsUploading(false);
      setUploadProgress({});
    }
  }, [isOpen]);

  const handleProviderSelection = (providerId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProviders((prev) => [...prev, providerId]);
    } else {
      setSelectedProviders((prev) => prev.filter((id) => id !== providerId));
    }
  };

  const handleBatchUpload = () => {
    if (selectedFiles.length === 0 || selectedProviders.length === 0) return;

    setIsUploading(true);

    // Inicializar el progreso para cada combinación de archivo y proveedor
    const initialProgress: Record<string, number> = {};
    selectedFiles.forEach((file) => {
      selectedProviders.forEach((providerId) => {
        initialProgress[`${file._id}-${providerId}`] = 0;
      });
    });
    setUploadProgress(initialProgress);

    // Simular el progreso de carga
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        let allComplete = true;

        Object.keys(newProgress).forEach((key) => {
          if (newProgress[key] < 100) {
            // Incrementar aleatoriamente entre 5-15%
            newProgress[key] += Math.floor(Math.random() * 10) + 5;
            if (newProgress[key] > 100) newProgress[key] = 100;
            if (newProgress[key] < 100) allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            onClose();
            onClearSelection();
            toast({
              title: "Carga por lotes completada",
              description: `Se han subido ${selectedFiles.length} archivos a ${selectedProviders.length} proveedores.`,
            });
          }, 500);
        }

        return newProgress;
      });
    }, 200);
  };

  // Calcular el progreso total
  const calculateTotalProgress = () => {
    if (Object.keys(uploadProgress).length === 0) return 0;
    const totalItems = selectedFiles.length * selectedProviders.length;
    const totalProgress = Object.values(uploadProgress).reduce(
      (acc, val) => acc + val,
      0
    );
    return Math.round(totalProgress / totalItems);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Subir archivos a nuevos proveedores</DialogTitle>
          <DialogDescription>
            Selecciona los proveedores a los que quieres subir los{" "}
            {selectedFiles.length} archivos seleccionados.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Archivos seleccionados: {selectedFiles.length}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              disabled={isUploading}
            >
              Limpiar selección
            </Button>
          </div>

          <div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
            <div className="grid grid-cols-6 gap-2">
              {selectedFiles.map((file) => (
                <div
                  key={file._id}
                  className="relative aspect-square rounded-md overflow-hidden"
                >
                  <Image
                    src={file.providers[0].thumbnail || "/placeholder.svg"}
                    alt={file.originalName}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Proveedores disponibles</h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
              {availableProviders.map((provider) => (
                <div key={provider._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`batch-provider-${provider._id}`}
                    checked={selectedProviders.includes(provider._id)}
                    onCheckedChange={(checked) =>
                      handleProviderSelection(provider._id, checked === true)
                    }
                    disabled={isUploading}
                  />
                  <label
                    htmlFor={`batch-provider-${provider._id}`}
                    className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {providerIcons[provider._id] || (
                      <ServerIcon className="h-4 w-4" />
                    )}
                    <span>{provider.name}</span>
                    {/* {provider.quality && (
                      <Badge variant="outline" className="ml-1 text-xs">
                        {provider.quality}
                      </Badge>
                    )} */}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Progreso de carga</h3>
              <div className="space-y-2">
                <Progress value={calculateTotalProgress()} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Subiendo {selectedFiles.length} archivos a{" "}
                    {selectedProviders.length} proveedores
                  </span>
                  <span>{calculateTotalProgress()}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isUploading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleBatchUpload}
            disabled={
              selectedFiles.length === 0 ||
              selectedProviders.length === 0 ||
              isUploading
            }
          >
            {isUploading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <UploadCloudIcon className="mr-2 h-4 w-4" />
                Subir {selectedFiles.length} archivos a{" "}
                {selectedProviders.length} proveedores
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
