import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionHeader from "@/components/layout/section-header";

interface ProvidersPageHeaderProps {
  onCreateProvider: () => void;
}

export function ProvidersPageHeader({ onCreateProvider }: ProvidersPageHeaderProps) {
  return (
    <SectionHeader
      title="Proveedores de Almacenamiento"
      description="Gestiona los servicios donde se almacenan tus archivos"
      action={
        <Button onClick={onCreateProvider}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Proveedor
        </Button>
      }
    />
  );
}