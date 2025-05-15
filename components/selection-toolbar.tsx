"use client"

import { Button } from "@/components/ui/button"
import { UploadCloudIcon, XIcon } from "lucide-react"

interface SelectionToolbarProps {
  selectedCount: number
  onClearSelection: () => void
  onUploadBatch: () => void
}

export default function SelectionToolbar({ selectedCount, onClearSelection, onUploadBatch }: SelectionToolbarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white py-2 mb-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onClearSelection} className="text-muted-foreground">
          <XIcon className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <span className="text-sm font-medium">
          {selectedCount} {selectedCount === 1 ? "archivo seleccionado" : "archivos seleccionados"}
        </span>
      </div>
      {selectedCount > 0 && (
        <Button size="sm" onClick={onUploadBatch}>
          <UploadCloudIcon className="h-4 w-4 mr-2" />
          Subir a proveedores
        </Button>
      )}
    </div>
  )
}
