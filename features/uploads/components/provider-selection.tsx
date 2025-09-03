import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { StorageProvider } from "@/types";
import { useBoundStore } from "@/stores/use-bound-store";

interface ProviderSelectionProps {
  onToggleProvider: (provider: StorageProvider) => void;
}

export function ProviderSelection({
  onToggleProvider,
}: ProviderSelectionProps) {
  const { selectedProviders, availableProviders } = useBoundStore((s) => s);
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="mb-3 text-lg font-medium">
          Proveedores de almacenamiento
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Selecciona los proveedores donde quieres almacenar tus archivos. Ten
          en cuenta que algunos proveedores solo soportan ciertos tipos de
          archivos.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {availableProviders.map((provider) => (
            <div
              key={provider._id}
              className={`cursor-pointer rounded-md border p-4 transition-colors ${
                selectedProviders.some((prov) => prov._id === provider._id)
                  ? "border-primary bg-primary/5"
                  : "hover:bg-accent"
              }`}
              onClick={() => onToggleProvider(provider)}
            >
              <div className="mb-2 flex items-center gap-2">
                <Checkbox
                  checked={selectedProviders.some(
                    (prov) => prov._id === provider._id,
                  )}
                  onCheckedChange={() => {}}
                  id={`provider-${provider._id}`}
                />
                <Label
                  htmlFor={`provider-${provider._id}`}
                  className="flex cursor-pointer items-center gap-2 font-medium"
                >
                  {provider.icon}
                  <span>{provider.name}</span>
                </Label>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
