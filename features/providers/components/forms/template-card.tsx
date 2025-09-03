import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProviderTemplate } from "@/types/StorageProvider";
import {
  getProviderIcon,
  getProviderCapabilities,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
} from "@/constants/file-extensions";

interface TemplateCardProps {
  template: ProviderTemplate;
  onSelect: (template: ProviderTemplate) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const TemplateIcon = getProviderIcon(template.code);
  const capabilities = getProviderCapabilities(template.supportedExtensions);
  const CategoryIcon = CATEGORY_ICONS[capabilities[0]];

  return (
    <Card
      className="cursor-pointer card-modern group hover:shadow-lg transition-all duration-200 overflow-hidden"
      onClick={() => onSelect(template)}
    >
      {/* Header con imagen de preview */}
      <div className="relative h-24 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 overflow-hidden">
        {/* Imagen de fondo decorativa */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(148 163 184 / 0.05)%27%3e%3cpath d=%27m0 2 30 0 0 30 -30 0 z%27/%3e%3c/svg%3e')] opacity-40"></div>
        
        {/* Icono principal centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <TemplateIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-3">
        {/* Título y descripción */}
        <div className="mb-2">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1 text-sm">
            {template.name}
          </h3>
          {template.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {template.description}
            </p>
          )}
        </div>
        
        {/* Capacidades como badges pequeños */}
        <div className="flex flex-wrap gap-1 mb-2">
          {capabilities.slice(0, 3).map((capability) => (
            <Badge 
              key={capability} 
              className={`${CATEGORY_COLORS[capability]} text-xs px-2 py-0.5 h-4`}
              variant="secondary"
            >
              <CategoryIcon className="w-2.5 h-2.5 mr-1" />
              {capability}
            </Badge>
          ))}
          {capabilities.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 h-4">
              +{capabilities.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Footer con extensiones */}
        <div className="pt-2 mt-2">
          <div className="flex flex-wrap gap-1">
            {template.supportedExtensions.slice(0, 6).map((ext) => (
              <span key={ext} className="bg-muted px-1.5 py-0.5 rounded text-xs">
                {ext}
              </span>
            ))}
            {template.supportedExtensions.length > 6 && (
              <span className="bg-muted px-1.5 py-0.5 rounded text-xs">
                +{template.supportedExtensions.length - 6}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}