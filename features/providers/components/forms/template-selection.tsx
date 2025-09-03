import { ProviderTemplate } from "@/types/StorageProvider";
import { TemplateCard } from "./template-card";

interface TemplateSelectionProps {
  templates: ProviderTemplate[];
  onTemplateSelect: (template: ProviderTemplate) => void;
}

export function TemplateSelection({
  templates,
  onTemplateSelect,
}: TemplateSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-heading-3">Seleccionar Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template._id}
            template={template}
            onSelect={onTemplateSelect}
          />
        ))}
      </div>
    </div>
  );
}