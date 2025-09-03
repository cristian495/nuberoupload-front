"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  useProviders,
  CreateProviderDialog,
  DeleteProviderDialog,
  ProvidersPageHeader,
  ProvidersLoading,
  ProvidersEmptyState,
  ProvidersGrid,
} from "@/features/providers";
import { StorageProvider } from "@/types/StorageProvider";

export default function ProvidersPage() {
  const providersHook = useProviders();
  
  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState<StorageProvider | null>(null);

  const handleProviderCreated = (newProvider: StorageProvider) => {
    providersHook.addProvider(newProvider);
    setShowCreateDialog(false);
  };

  const handleDeleteProvider = (provider: StorageProvider) => {
    setProviderToDelete(provider);
    setShowDeleteDialog(true);
  };

  const confirmDeleteProvider = async () => {
    if (!providerToDelete) return;

    const success = await providersHook.deleteProvider(providerToDelete._id);
    
    if (success) {
      setShowDeleteDialog(false);
      setProviderToDelete(null);
    }
  };

  if (providersHook.isLoading) {
    return (
      <DashboardLayout>
        <ProvidersPageHeader onCreateProvider={() => setShowCreateDialog(true)} />
        <ProvidersLoading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProvidersPageHeader onCreateProvider={() => setShowCreateDialog(true)} />

      {providersHook.providers.length === 0 ? (
        <ProvidersEmptyState onCreateProvider={() => setShowCreateDialog(true)} />
      ) : (
        <ProvidersGrid
          providers={providersHook.providers}
          templates={providersHook.templates}
          testingProviders={providersHook.testingProviders}
          deletingProviders={providersHook.deletingProviders}
          onTestConnection={providersHook.testProviderConnection}
          onDeleteProvider={handleDeleteProvider}
        />
      )}

      <CreateProviderDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        templates={providersHook.templates}
        onProviderCreated={handleProviderCreated}
      />

      <DeleteProviderDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        providerName={providerToDelete?.name || ""}
        onConfirm={confirmDeleteProvider}
        isDeleting={providerToDelete ? providersHook.deletingProviders.has(providerToDelete._id) : false}
      />
    </DashboardLayout>
  );
}