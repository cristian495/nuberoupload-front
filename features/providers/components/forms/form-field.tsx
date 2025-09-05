import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { CredentialField } from "@/types/StorageProvider";

interface FormFieldProps {
  field: CredentialField;
  register: UseFormRegister<any>;
  setValue: (name: string, value: any) => void;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export function FormField({
  field,
  register,
  setValue,
  showPassword = false,
  onTogglePassword,
}: FormFieldProps) {
  const renderField = () => {
    switch (field.type) {
      case "password":
        return (
          <div className="relative">
            <Input
              id={field.key}
              type={showPassword ? "text" : "password"}
              placeholder={field.placeholder}
              {...register(`config.${field.key}`, {
                required: field.required ? `${field.label} es requerido` : false,
              })}
            />
            {onTogglePassword && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={onTogglePassword}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        );

      case "select":
        return (
          <Select onValueChange={(value) => setValue(`config.${field.key}`, value)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={field.key}
            placeholder={field.placeholder}
            {...register(`config.${field.key}`, {
              required: field.required ? `${field.label} es requerido` : false,
            })}
          />
        );

      default:
        return (
          <Input
            id={field.key}
            type="text"
            placeholder={field.placeholder}
            {...register(`config.${field.key}`, {
              required: field.required ? `${field.label} es requerido` : false,
            })}
          />
        );
    }
  };

  return (
    <div>
      <Label htmlFor={field.key}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      {renderField()}
      
      {field.description && (
        <p className="text-xs text-muted-foreground mt-1">
          {field.description}
        </p>
      )}
    </div>
  );
}