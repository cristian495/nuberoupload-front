import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Loader2, HelpCircle } from "lucide-react";
import { StorageProvider } from "@/types/StorageProvider";

interface ConnectionStatusBadgeProps {
  provider: StorageProvider;
  isTesting?: boolean;
}

export function ConnectionStatusBadge({ provider, isTesting = false }: ConnectionStatusBadgeProps) {
  if (isTesting) {
    return (
      <Badge
        variant="secondary"
        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      >
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        Probando
      </Badge>
    );
  }

  if (provider.isConnectionHealthy === true) {
    return (
      <Badge
        variant="secondary"
        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      >
        <Wifi className="w-3 h-3 mr-1" />
        Conectado
      </Badge>
    );
  }

  if (provider.isConnectionHealthy === false) {
    return (
      <Badge
        variant="secondary"
        className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
        title={provider.connectionError || "Sin conexión"}
      >
        <WifiOff className="w-3 h-3 mr-1" />
        Desconectado
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    >
      <HelpCircle className="w-3 h-3 mr-1" />
      Sin probar
    </Badge>
  );
}