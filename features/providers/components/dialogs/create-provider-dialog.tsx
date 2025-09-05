"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProviderTemplate, StorageProvider } from "@/types/StorageProvider";
import { useCreateProvider } from "../../hooks/use-create-provider";
import { TemplateSelection } from "../forms/template-selection";
import { ProviderForm } from "../forms/provider-form";

interface CreateProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: ProviderTemplate[];
  onProviderCreated: (provider: StorageProvider) => void;
}

export function CreateProviderDialog({
  open,
  onOpenChange,
  templates,
  onProviderCreated,
}: CreateProviderDialogProps) {
  const {
    selectedTemplate,
    isSubmitting,
    selectTemplate,
    resetForm,
    createProvider,
  } = useCreateProvider();

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleCreateProvider = async (data: any) => {
    const success = await createProvider(data, onProviderCreated);
    if (success) {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-heading-2">
            Agregar Proveedor de Almacenamiento
          </DialogTitle>
          <DialogDescription>
            Selecciona un template y configura las credenciales para tu proveedor
          </DialogDescription>
        </DialogHeader>

        {!selectedTemplate ? (
          <TemplateSelection
            templates={templates}
            onTemplateSelect={selectTemplate}
          />
        ) : (
          <ProviderForm
            template={selectedTemplate}
            onSubmit={handleCreateProvider}
            onCancel={handleClose}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}