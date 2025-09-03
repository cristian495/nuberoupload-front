import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";

interface ProvidersEmptyStateProps {
  onCreateProvider: () => void;
}

export function ProvidersEmptyState({ onCreateProvider }: ProvidersEmptyStateProps) {
  return (
    <Card className="card-modern text-center py-12">
      <CardContent>
        <div className="text-muted-foreground mb-4">
          <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-heading-3 mb-2">
            No hay proveedores configurados
          </h3>
          <p className="text-body">
            Agrega tu primer proveedor de almacenamiento para comenzar a
            subir archivos
          </p>
        </div>
        <Button onClick={onCreateProvider}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Primer Proveedor
        </Button>
      </CardContent>
    </Card>
  );
}