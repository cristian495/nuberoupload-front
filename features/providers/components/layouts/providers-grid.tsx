import { StorageProvider, ProviderTemplate } from "@/types/StorageProvider";
import { ProviderCard } from "../cards/provider-card";

interface ProvidersGridProps {
  providers: StorageProvider[];
  templates: ProviderTemplate[];
  testingProviders: Set<string>;
  deletingProviders: Set<string>;
  onTestConnection: (providerId: string) => void;
  onDeleteProvider: (provider: StorageProvider) => void;
}

export function ProvidersGrid({
  providers,
  templates,
  testingProviders,
  deletingProviders,
  onTestConnection,
  onDeleteProvider,
}: ProvidersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {providers.map((provider) => {
        const template = templates.find((t) => t._id === provider.templateId);
        
        return (
          <ProviderCard
            key={provider._id}
            provider={provider}
            template={template}
            isTesting={testingProviders.has(provider._id)}
            isDeleting={deletingProviders.has(provider._id)}
            onTestConnection={onTestConnection}
            onDelete={onDeleteProvider}
          />
        );
      })}
    </div>
  );
}