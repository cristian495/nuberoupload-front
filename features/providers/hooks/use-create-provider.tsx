import { useState } from "react";
import { providersService } from "@/lib/providers-api";
import { toast } from "@/components/ui/use-toast";
import {
  ProviderTemplate,
  StorageProvider,
  CreateProviderFromTemplateData,
} from "@/types/StorageProvider";

export function useCreateProvider() {
  const [selectedTemplate, setSelectedTemplate] = useState<ProviderTemplate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectTemplate = (template: ProviderTemplate) => {
    setSelectedTemplate(template);
  };

  const resetForm = () => {
    setSelectedTemplate(null);
  };

  const createProvider = async (
    data: CreateProviderFromTemplateData,
    onSuccess: (provider: StorageProvider) => void
  ) => {
    try {
      setIsSubmitting(true);
      
      const newProvider = await providersService.createProviderFromTemplate(data);

      toast({
        title: "Proveedor creado",
        description: `${data.name} se ha configurado correctamente`,
      });

      onSuccess(newProvider);
      resetForm();
      
      return true;
    } catch (error: any) {
      console.error("Error creating provider:", error);
      
      toast({
        title: "Error al crear proveedor",
        description: error.response?.data?.message || "Ocurrió un error inesperado",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    selectedTemplate,
    isSubmitting,
    selectTemplate,
    resetForm,
    createProvider,
  };
}