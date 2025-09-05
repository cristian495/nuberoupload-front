import { useState, useEffect } from "react";
import { providersService } from "@/lib/providers-api";
import { ProviderTemplate, StorageProvider } from "@/types/StorageProvider";
import { toast } from "@/components/ui/use-toast";

export function useProviders() {
  // State
  const [providers, setProviders] = useState<StorageProvider[]>([]);
  const [templates, setTemplates] = useState<ProviderTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testingProviders, setTestingProviders] = useState<Set<string>>(new Set());
  const [deletingProviders, setDeletingProviders] = useState<Set<string>>(new Set());

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [providersData, templatesData] = await Promise.all([
        providersService.getStorageProviders(),
        providersService.getProviderTemplates(),
      ]);
      setProviders(providersData);
      setTemplates(templatesData);
    } catch (error) {
      console.error("Error loading providers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Actions
  const addProvider = (newProvider: StorageProvider) => {
    setProviders((prev) => [...prev, newProvider]);
  };

  const removeProvider = (providerId: string) => {
    setProviders((prev) => prev.filter((p) => p._id !== providerId));
  };

  const updateProvider = (providerId: string, updates: Partial<StorageProvider>) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider._id === providerId
          ? { ...provider, ...updates }
          : provider
      )
    );
  };

  const testProviderConnection = async (providerId: string) => {
    try {
      setTestingProviders((prev) => new Set(prev).add(providerId));

      const result = await providersService.testProviderConnection(providerId);

      updateProvider(providerId, {
        isConnectionHealthy: result.isHealthy,
        lastConnectionCheck: new Date().toISOString(),
        connectionError: result.error,
      });

      toast({
        title: result.isHealthy ? "Conexión exitosa" : "Error de conexión",
        description: result.isHealthy 
          ? "El proveedor se conectó correctamente"
          : result.error || "No se pudo conectar al proveedor",
        variant: result.isHealthy ? "default" : "destructive",
      });
    } catch (error: any) {
      console.error("Error testing provider connection:", error);

      updateProvider(providerId, {
        isConnectionHealthy: false,
        lastConnectionCheck: new Date().toISOString(),
        connectionError: error.response?.data?.message || "Error desconocido",
      });

      toast({
        title: "Error de conexión",
        description: error.response?.data?.message || "No se pudo probar la conexión",
        variant: "destructive",
      });
    } finally {
      setTestingProviders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(providerId);
        return newSet;
      });
    }
  };

  const deleteProvider = async (providerId: string) => {
    try {
      setDeletingProviders((prev) => new Set(prev).add(providerId));

      const result = await providersService.deleteProvider(providerId);

      removeProvider(providerId);

      toast({
        title: "Proveedor eliminado",
        description: result.message,
        variant: "default",
      });

      return true;
    } catch (error: any) {
      console.error("Error deleting provider:", error);

      toast({
        title: "Error al eliminar",
        description: error.response?.data?.message || "No se pudo eliminar el proveedor",
        variant: "destructive",
      });

      return false;
    } finally {
      setDeletingProviders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(providerId);
        return newSet;
      });
    }
  };

  return {
    // State
    providers,
    templates,
    isLoading,
    testingProviders,
    deletingProviders,
    
    // Actions
    addProvider,
    removeProvider,
    updateProvider,
    testProviderConnection,
    deleteProvider,
    refreshData: loadData,
  };
}