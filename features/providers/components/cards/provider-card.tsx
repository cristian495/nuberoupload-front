import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trash2, Wifi, Loader2 } from "lucide-react";
import { StorageProvider, ProviderTemplate } from "@/types/StorageProvider";
import { ConnectionStatusBadge } from "./connection-status-badge";
import {
  getProviderCapabilities,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  getProviderIcon,
} from "@/constants/file-extensions";

interface ProviderCardProps {
  provider: StorageProvider;
  template?: ProviderTemplate;
  isTesting?: boolean;
  isDeleting?: boolean;
  onTestConnection: (providerId: string) => void;
  onDelete: (provider: StorageProvider) => void;
}

export function ProviderCard({
  provider,
  template,
  isTesting = false,
  isDeleting = false,
  onTestConnection,
  onDelete,
}: ProviderCardProps) {
  const capabilities = template
    ? getProviderCapabilities(template.supportedExtensions)
    : [];
  const ProviderIcon = getProviderIcon(provider.code);
  const CategoryIcon = CATEGORY_ICONS[capabilities[0]];

  return (
    <Card className="card-modern group min-h-48 overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Header con imagen de preview */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        {/* Icono principal centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-105 dark:bg-gray-800/90">
              <ProviderIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Botones de acción en esquina superior derecha */}
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 w-7 bg-white/80 p-0 text-gray-800 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:text-white/80"
            onClick={() => onTestConnection(provider._id)}
            disabled={isTesting}
            title="Probar conexión"
          >
            {isTesting ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Wifi className="h-3 w-3" />
            )}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="h-7 w-7 bg-white/80 p-0 text-destructive backdrop-blur-sm hover:bg-white hover:text-destructive dark:bg-gray-800/80 dark:hover:bg-gray-800"
            onClick={() => onDelete(provider)}
            disabled={isDeleting}
            title="Eliminar proveedor"
          >
            {isDeleting ? (
              <Loader2 className="w-3 animate-spin" />
            ) : (
              <Trash2 className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Título y descripción */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="line-clamp-1 flex-1 font-semibold text-foreground">
              {provider.name}
            </h3>
            <div className="pointer-events-none">
              <ConnectionStatusBadge
                provider={provider}
                isTesting={isTesting}
              />
            </div>
          </div>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {template?.name}
          </p>
        </div>

        {provider.description && (
          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
            {provider.description}
          </p>
        )}

        {/* Capacidades como badges pequeños */}
        <div className="pointer-events-none mb-3 flex flex-wrap gap-1">
          {capabilities
            // .slice(0, 3)
            .map((capability) => (
              <Badge
                key={capability}
                className={`h-5 px-2 py-0.5 text-xs font-normal ${CATEGORY_COLORS[capability]}`}
                variant="secondary"
              >
                <span className="mr-1">
                  <CategoryIcon className="h-4 w-4" />
                </span>
                {capability}
              </Badge>
            ))}
          {/* {capabilities.length > 3 && (
            <Badge variant="outline" className="h-5 px-2 py-0.5 text-xs">
              +{capabilities.length - 3}
            </Badge>
          )} */}
        </div>

        {/* Config preview */}
        {provider.configLastChars &&
          Object.keys(provider.configLastChars).length > 0 && (
            <div className="mb-3">
              <div className="space-y-2">
                {Object.entries(provider.configLastChars)
                  // .slice(0, 2)
                  .map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-xs capitalize text-muted-foreground">
                        {key}
                      </label>
                      <Input
                        value={String(value)}
                        readOnly
                        className="h-7 border-muted bg-muted/50 font-mono text-xs"
                      />
                    </div>
                  ))}
                {/* {Object.keys(provider.configLastChars).length > 2 && (
                  <div className="pt-1 text-center text-xs text-muted-foreground">
                    +{Object.keys(provider.configLastChars).length - 2} campos
                    más
                  </div>
                )} */}
              </div>
            </div>
          )}

        {/* Footer con extensiones */}
        <div className="mt-3 pt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex gap-1">
              {template?.supportedExtensions.slice(0, 10).map((ext) => (
                <span
                  key={ext}
                  className="rounded bg-muted px-1.5 py-0.5 text-xs"
                >
                  {ext}
                </span>
              ))}
              {template && template.supportedExtensions.length > 10 && (
                <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  +{template.supportedExtensions.length - 10}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
