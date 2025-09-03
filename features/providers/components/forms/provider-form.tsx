import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ProviderTemplate,
  CreateProviderFromTemplateData,
} from "@/types/StorageProvider";
import { FormField } from "./form-field";

interface ProviderFormProps {
  template: ProviderTemplate;
  onSubmit: (data: CreateProviderFromTemplateData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ProviderForm({
  template,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProviderFormProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );

  const form = useForm<CreateProviderFromTemplateData>({
    defaultValues: {
      templateId: template._id,
      name: "",
      description: "",
      config: template.fields.reduce((acc, field) => {
        if (field.defaultValue) {
          acc[field.key] = field.defaultValue;
        }
        return acc;
      }, {} as Record<string, any>),
    },
  });

  const togglePasswordVisibility = (fieldKey: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey],
    }));
  };

  const handleSubmit = async (data: CreateProviderFromTemplateData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Nombre del proveedor */}
        <div>
          <Label htmlFor="name">Nombre del Proveedor</Label>
          <Input
            id="name"
            placeholder={`Mi ${template.name}`}
            {...form.register("name", {
              required: "Nombre es requerido",
            })}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <Label htmlFor="description">Descripción (opcional)</Label>
          <Textarea
            id="description"
            placeholder="Descripción de este proveedor..."
            {...form.register("description")}
          />
        </div>

        {/* Campos de configuración */}
        <div className="space-y-4">
          <h4 className="text-heading-4">Configuración</h4>
          {template.fields.map((field) => (
            <FormField
              key={field.key}
              field={field}
              register={form.register}
              setValue={form.setValue}
              showPassword={showPasswords[field.key]}
              onTogglePassword={
                field.type === "password"
                  ? () => togglePasswordVisibility(field.key)
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Proveedor"}
        </Button>
      </div>
    </form>
  );
}
