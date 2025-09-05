"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Trash2,
  FileX,
  Shield,
  Loader2,
} from "lucide-react";

interface DeleteProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerName: string;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteProviderDialog({
  open,
  onOpenChange,
  providerName,
  onConfirm,
  isDeleting = false,
}: DeleteProviderDialogProps) {
  const [confirmationText, setConfirmationText] = useState("");
  const expectedText = "ELIMINAR";
  const isConfirmed = confirmationText === expectedText;

  const handleConfirm = async () => {
    if (!isConfirmed) return;
    await onConfirm();
    setConfirmationText("");
  };

  const handleCancel = () => {
    setConfirmationText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Eliminar Proveedor
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Esta acción no se puede deshacer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Proveedor a eliminar */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Trash2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{providerName}</p>
                <p className="text-sm text-muted-foreground">
                  Proveedor de almacenamiento
                </p>
              </div>
            </div>
          </div>

          {/* Advertencias */}
          <Alert>
            <FileX className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <p className="font-medium">
                Al eliminar este proveedor se realizarán las siguientes acciones:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  Se eliminará permanentemente la configuración del proveedor
                </li>
                <li>
                  Se removerán <strong>todas las referencias</strong> a este
                  proveedor de los archivos subidos
                </li>
                <li>
                  Los archivos que solo tenían este proveedor podrían quedar
                  inaccesibles
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Advertencia de seguridad */}
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
            <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <p className="font-medium">Recomendación de seguridad:</p>
              <p className="text-sm mt-1">
                Asegúrate de que los archivos importantes tengan respaldos en
                otros proveedores antes de continuar.
              </p>
            </AlertDescription>
          </Alert>

          {/* Campo de confirmación */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Para confirmar, escribe{" "}
              <Badge variant="destructive" className="font-mono">
                {expectedText}
              </Badge>{" "}
              en el campo de abajo:
            </label>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Escribe ELIMINAR para confirmar"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isDeleting}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isConfirmed || isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Eliminar Proveedor
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}