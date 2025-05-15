// "use client";

// import type React from "react";

// import { useState, useRef, useCallback } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   FolderUp,
//   ImageIcon,
//   VideoIcon,
//   FileIcon,
//   X,
//   Upload,
//   FolderIcon,
//   AlertCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { toast } from "@/components/ui/use-toast";

// interface FileWithPreview extends File {
//   preview?: string;
//   id: string;
//   type: string;
// }

// export default function UploadFolder() {
//   const [files, setFiles] = useState<FileWithPreview[]>([]);
//   const [folderName, setFolderName] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   const handleFileChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const selectedFiles = e.target.files;
//       if (!selectedFiles || selectedFiles.length === 0) return;

//       // Extraer el nombre de la carpeta del primer archivo
//       const firstFilePath = selectedFiles[0].webkitRelativePath;
//       const folderNameFromPath = firstFilePath.split("/")[0];
//       setFolderName(folderNameFromPath);

//       // Convertir FileList a array y agregar propiedades adicionales
//       const newFiles = Array.from(selectedFiles).map((file) => {
//         const fileWithPreview = file as FileWithPreview;
//         fileWithPreview.id = Math.random().toString(36).substring(2, 9);

//         // Generar previsualizaciones para imágenes
//         if (file.type.startsWith("image/")) {
//           fileWithPreview.preview = URL.createObjectURL(file);
//         }

//         return fileWithPreview;
//       });

//       const validMedias = newFiles.filter((file) => {
//         return file.type.startsWith("image/") || file.type.startsWith("video/");
//       });

//       if (validMedias.length === 0) {
//         console.error(
//           "No se encontraron archivos multimedia en la carpeta seleccionada"
//         );
//         toast({
//           title: "No se encontraron archivos multimedia",
//           description: "Por favor selecciona una carpeta con imágenes o videos",
//         });
//         return;
//       }

//       setFiles(validMedias);
//     },
//     []
//   );

//   const handleUpload = useCallback(() => {
//     if (files.length === 0) {
//       toast({
//         title: "No hay archivos para subir",
//         description: "Por favor selecciona una carpeta con archivos",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsUploading(true);

//     // Simulación de progreso de carga
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += 5;
//       setUploadProgress(progress);

//       if (progress >= 100) {
//         clearInterval(interval);
//         setIsUploading(false);
//         toast({
//           title: "Carpeta subida con éxito",
//           description: `Se han subido ${files.length} archivos a la carpeta "${folderName}"`,
//         });

//         // En una aplicación real, aquí redirigirías a la carpeta recién creada
//         setTimeout(() => {
//           router.push("/");
//         }, 1500);
//       }
//     }, 200);
//   }, [files, folderName, router]);

//   const removeFile = useCallback((fileId: string) => {
//     setFiles((prevFiles) => {
//       const updatedFiles = prevFiles.filter((file) => file.id !== fileId);

//       // Si se eliminaron todos los archivos, limpiar el nombre de la carpeta
//       if (updatedFiles.length === 0) {
//         setFolderName("");
//       }

//       return updatedFiles;
//     });
//   }, []);

//   const clearAll = useCallback(() => {
//     // Liberar las URLs de objeto creadas para las previsualizaciones
//     files.forEach((file) => {
//       if (file.preview) {
//         URL.revokeObjectURL(file.preview);
//       }
//     });

//     setFiles([]);
//     setFolderName("");
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   }, [files]);

//   // Contar tipos de archivos
//   const imageCount = files.filter((file) =>
//     file.type.startsWith("image/")
//   ).length;
//   const videoCount = files.filter((file) =>
//     file.type.startsWith("video/")
//   ).length;
//   const otherCount = files.length - imageCount - videoCount;

//   return (
//     <div className="w-full max-w-5xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold mb-2">Subir Carpeta</h1>
//         <p className="text-muted-foreground">
//           Selecciona una carpeta para subir todos sus archivos multimedia
//         </p>
//       </div>

//       {/* Selector de carpeta */}
//       <Card className="mb-6">
//         <CardContent className="pt-6">
//           <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
//             <FolderUp className="h-12 w-12 text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium mb-2">Selecciona una carpeta</h3>
//             <p className="text-sm text-muted-foreground text-center mb-4">
//               Arrastra y suelta una carpeta aquí o haz clic para seleccionar
//             </p>

//             <Input
//               ref={fileInputRef}
//               type="file"
//               webkitdirectory={"true"}
//               directory={""}
//               multiple
//               className="hidden"
//               onChange={handleFileChange}
//               disabled={isUploading}
//             />
//             <Button
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isUploading}
//             >
//               Seleccionar Carpeta
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Resumen de archivos */}
//       {files.length > 0 && (
//         <div className="space-y-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h2 className="text-xl font-semibold flex items-center">
//                 <FolderIcon className="mr-2 h-5 w-5" />
//                 {folderName}
//               </h2>
//               <div className="flex items-center gap-3 mt-2">
//                 <Badge variant="outline" className="flex items-center gap-1">
//                   <ImageIcon className="h-3 w-3" />
//                   <span>{imageCount} imágenes</span>
//                 </Badge>
//                 <Badge variant="outline" className="flex items-center gap-1">
//                   <VideoIcon className="h-3 w-3" />
//                   <span>{videoCount} videos</span>
//                 </Badge>
//                 {otherCount > 0 && (
//                   <Badge variant="outline" className="flex items-center gap-1">
//                     <FileIcon className="h-3 w-3" />
//                     <span>{otherCount} otros</span>
//                   </Badge>
//                 )}
//                 <span className="text-sm text-muted-foreground">
//                   {files.length} archivos en total
//                 </span>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 onClick={clearAll}
//                 disabled={isUploading}
//               >
//                 Limpiar
//               </Button>
//               <Button onClick={handleUpload} disabled={isUploading}>
//                 <Upload className="mr-2 h-4 w-4" />
//                 {isUploading ? "Subiendo..." : "Subir Carpeta"}
//               </Button>
//             </div>
//           </div>

//           {isUploading && (
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span>Progreso de subida</span>
//                 <span>{uploadProgress}%</span>
//               </div>
//               <Progress value={uploadProgress} className="h-2" />
//             </div>
//           )}

//           {!isUploading &&
//             files.some(
//               (file) =>
//                 !file.type.startsWith("image/") &&
//                 !file.type.startsWith("video/")
//             ) && (
//               <Alert>
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertTitle>Archivos no compatibles</AlertTitle>
//                 <AlertDescription>
//                   Algunos archivos no son imágenes ni videos. Solo se mostrarán
//                   los archivos multimedia en la galería.
//                 </AlertDescription>
//               </Alert>
//             )}

//           <div className="mt-4">
//             <h3 className="text-lg font-medium mb-3">
//               Vista previa de archivos
//             </h3>
//             <ScrollArea className="h-[400px] rounded-md border p-4">
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {files.map((file) => (
//                   <div key={file.id} className="relative group">
//                     <Card className="overflow-hidden">
//                       <div className="aspect-square relative bg-muted">
//                         {file.type.startsWith("image/") ? (
//                           <Image
//                             src={file.preview || "/placeholder.svg"}
//                             alt={file.name}
//                             fill
//                             className="object-cover"
//                           />
//                         ) : file.type.startsWith("video/") ? (
//                           <div className="flex h-full items-center justify-center bg-black">
//                             <VideoIcon className="h-10 w-10 text-white" />
//                           </div>
//                         ) : (
//                           <div className="flex h-full items-center justify-center">
//                             <FileIcon className="h-10 w-10 text-muted-foreground" />
//                           </div>
//                         )}
//                       </div>
//                       <CardContent className="p-2">
//                         <p className="text-xs truncate" title={file.name}>
//                           {file.name}
//                         </p>
//                       </CardContent>
//                     </Card>
//                     <Button
//                       variant="destructive"
//                       size="icon"
//                       className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
//                       onClick={() => removeFile(file.id)}
//                       disabled={isUploading}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  FolderUp,
  ImageIcon,
  VideoIcon,
  FileIcon,
  X,
  Upload,
  FolderIcon,
  AlertCircle,
  ServerIcon,
  CloudIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Definir tipos para proveedores
interface Provider {
  id: string
  name: string
  icon: React.ReactNode
  selected?: boolean
  progress?: number
  status?: "pending" | "uploading" | "completed" | "error"
  speed?: string
}

// Modificar la interfaz FileWithPreview para incluir el progreso de carga
interface FileWithPreview extends File {
  preview?: string
  id: string
  type: string
  progress?: number
  status?: "pending" | "uploading" | "completed" | "error"
  uploadSpeed?: string
  providers?: Provider[]
  expanded?: boolean
}

// Lista de proveedores disponibles
const availableProviders: Provider[] = [
  {
    id: "cloudinary",
    name: "Cloudinary",
    icon: <CloudIcon className="h-4 w-4" />,
  },
  {
    id: "gdrive",
    name: "Google Drive",
    icon: <ServerIcon className="h-4 w-4" />,
  },
  {
    id: "s3",
    name: "Amazon S3",
    icon: <ServerIcon className="h-4 w-4" />,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: <ServerIcon className="h-4 w-4" />,
  },
]

export default function UploadFolder() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [folderName, setFolderName] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedProviders, setSelectedProviders] = useState<string[]>(["cloudinary"]) // Por defecto Cloudinary seleccionado
  const [providerProgress, setProviderProgress] = useState<Record<string, Record<string, number>>>({})
  const [providerSpeeds, setProviderSpeeds] = useState<Record<string, Record<string, string>>>({})
  const [providerStatus, setProviderStatus] = useState<Record<string, Record<string, string>>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // Extraer el nombre de la carpeta del primer archivo
    const firstFilePath = selectedFiles[0].webkitRelativePath
    const folderNameFromPath = firstFilePath.split("/")[0]
    setFolderName(folderNameFromPath)

    // Convertir FileList a array y agregar propiedades adicionales
    const newFiles = Array.from(selectedFiles).map((file) => {
      const fileWithPreview = file as FileWithPreview
      fileWithPreview.id = Math.random().toString(36).substring(2, 9)
      fileWithPreview.expanded = false

      // Generar previsualizaciones para imágenes
      if (file.type?.startsWith("image/")) {
        fileWithPreview.preview = URL.createObjectURL(file)
      }

      return fileWithPreview
    })

    setFiles(newFiles)
  }, [])

  const toggleProviderSelection = useCallback((providerId: string) => {
    setSelectedProviders((prev) => {
      if (prev.includes(providerId)) {
        return prev.filter((id) => id !== providerId)
      } else {
        return [...prev, providerId]
      }
    })
  }, [])

  const toggleFileExpanded = useCallback((fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, expanded: !file.expanded } : file)))
  }, [])

  // Función actualizada para manejar la carga
  const handleUpload = useCallback(() => {
    if (files.length === 0) {
      toast({
        title: "No hay archivos para subir",
        description: "Por favor selecciona una carpeta con archivos",
        variant: "destructive",
      })
      return
    }

    if (selectedProviders.length === 0) {
      toast({
        title: "No hay proveedores seleccionados",
        description: "Por favor selecciona al menos un proveedor de almacenamiento",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Inicializar archivos con proveedores seleccionados
    setFiles((prev) =>
      prev.map((file) => ({
        ...file,
        progress: 0,
        status: "pending" as const,
        expanded: true, // Expandir automáticamente al iniciar la carga
        providers: selectedProviders.map((providerId) => {
          const provider = availableProviders.find((p) => p.id === providerId)
          return {
            id: providerId,
            name: provider?.name || providerId,
            icon: provider?.icon || <ServerIcon className="h-4 w-4" />,
            progress: 0,
            status: "pending" as const,
          }
        }),
      })),
    )

    // Inicializar el estado de progreso de los proveedores
    const initialProviderProgress: Record<string, Record<string, number>> = {}
    const initialProviderSpeeds: Record<string, Record<string, string>> = {}
    const initialProviderStatus: Record<string, Record<string, string>> = {}

    files.forEach((file) => {
      initialProviderProgress[file.id] = {}
      initialProviderSpeeds[file.id] = {}
      initialProviderStatus[file.id] = {}

      selectedProviders.forEach((providerId) => {
        initialProviderProgress[file.id][providerId] = 0
        initialProviderSpeeds[file.id][providerId] = "0 KB/s"
        initialProviderStatus[file.id][providerId] = "pending"
      })
    })

    setProviderProgress(initialProviderProgress)
    setProviderSpeeds(initialProviderSpeeds)
    setProviderStatus(initialProviderStatus)

    // Simulación de progreso de carga general
    let overallProgress = 0
    const overallInterval = setInterval(() => {
      overallProgress += 2
      setUploadProgress(overallProgress)

      if (overallProgress >= 100) {
        clearInterval(overallInterval)
        setTimeout(() => {
          setIsUploading(false)
          toast({
            title: "Carpeta subida con éxito",
            description: `Se han subido ${files.length} archivos a la carpeta "${folderName}"`,
          })

          // En una aplicación real, aquí redirigirías a la carpeta recién creada
          // setTimeout(() => {
          //   router.push("/")
          // }, 1500)
        }, 500)
      }
    }, 300)

    // Simulación de progreso para cada archivo
    files.forEach((file) => {
      // Fase 1: Carga al servidor principal
      simulateFileUpload(file.id, () => {
        // Fase 2: Distribución a proveedores
        selectedProviders.forEach((providerId) => {
          simulateProviderUpload(file.id, providerId)
        })
      })
    })
  }, [files, folderName, router, selectedProviders])

  // Simular la carga de un archivo al servidor principal
  const simulateFileUpload = useCallback(
    (fileId: string, onComplete?: () => void) => {
      const file = files.find((f) => f.id === fileId)
      if (!file) return

      // Determinar duración basada en tamaño y tipo
      const isLargeFile = file.size > 5 * 1024 * 1024
      const isImage = file.type?.startsWith("image/") || false
      const uploadDuration = isLargeFile ? (isImage ? 8000 : 15000) : isImage ? 3000 : 6000

      let progress = 0
      const interval = setInterval(() => {
        // Incremento no lineal para simular una carga más realista
        const increment = Math.random() * (progress < 50 ? 5 : progress < 80 ? 3 : 1) + 1
        progress = Math.min(progress + increment, 100)

        // Calcular velocidad simulada
        const speed = Math.floor(Math.random() * 500) + 100
        const speedDisplay = speed > 1000 ? `${(speed / 1000).toFixed(1)} MB/s` : `${speed} KB/s`

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  progress: Math.round(progress),
                  status: progress >= 100 ? "completed" : "uploading",
                  uploadSpeed: speedDisplay,
                }
              : f,
          ),
        )

        if (progress >= 100) {
          clearInterval(interval)
          if (onComplete) {
            setTimeout(onComplete, 500) // Pequeño retraso antes de iniciar la distribución
          }
        }
      }, uploadDuration / 100)
    },
    [files],
  )

  // Simular la distribución a un proveedor específico
  const simulateProviderUpload = useCallback((fileId: string, providerId: string) => {
    // Duración aleatoria entre 2 y 8 segundos para cada proveedor
    const duration = Math.random() * 6000 + 2000

    let progress = 0
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 5 + 1, 100)

      // Calcular velocidad simulada
      const speed = Math.floor(Math.random() * 300) + 50
      const speedDisplay = speed > 1000 ? `${(speed / 1000).toFixed(1)} MB/s` : `${speed} KB/s`

      // Actualizar el progreso del proveedor
      setProviderProgress((prev) => ({
        ...prev,
        [fileId]: {
          ...prev[fileId],
          [providerId]: Math.round(progress),
        },
      }))

      // Actualizar la velocidad del proveedor
      setProviderSpeeds((prev) => ({
        ...prev,
        [fileId]: {
          ...prev[fileId],
          [providerId]: speedDisplay,
        },
      }))

      // Actualizar el estado del proveedor
      setProviderStatus((prev) => ({
        ...prev,
        [fileId]: {
          ...prev[fileId],
          [providerId]: progress >= 100 ? "completed" : "uploading",
        },
      }))

      if (progress >= 100) {
        clearInterval(interval)
      }
    }, duration / 100)
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== fileId)

      // Si se eliminaron todos los archivos, limpiar el nombre de la carpeta
      if (updatedFiles.length === 0) {
        setFolderName("")
      }

      return updatedFiles
    })
  }, [])

  const clearAll = useCallback(() => {
    // Liberar las URLs de objeto creadas para las previsualizaciones
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })

    setFiles([])
    setFolderName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [files])

  // Contar tipos de archivos
  const imageCount = files.filter((file) => file.type?.startsWith("image/")).length
  const videoCount = files.filter((file) => file.type?.startsWith("video/")).length
  const otherCount = files.length - imageCount - videoCount

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Subir Carpeta</h1>
        <p className="text-muted-foreground">Selecciona una carpeta para subir todos sus archivos multimedia</p>
      </div>

      {/* Selector de carpeta */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
            <FolderUp className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Selecciona una carpeta</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Arrastra y suelta una carpeta aquí o haz clic para seleccionar
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              webkitdirectory="true"
              directory=""
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
              Seleccionar Carpeta
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de archivos */}
      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <FolderIcon className="mr-2 h-5 w-5" />
                {folderName}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  <span>{imageCount} imágenes</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <VideoIcon className="h-3 w-3" />
                  <span>{videoCount} videos</span>
                </Badge>
                {otherCount > 0 && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <FileIcon className="h-3 w-3" />
                    <span>{otherCount} otros</span>
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">{files.length} archivos en total</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearAll} disabled={isUploading}>
                Limpiar
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Subiendo..." : "Subir Carpeta"}
              </Button>
            </div>
          </div>

          {/* Selección de proveedores */}
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3">Proveedores de almacenamiento</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Selecciona los proveedores donde quieres almacenar tus archivos
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {availableProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      selectedProviders.includes(provider.id) ? "border-primary bg-primary/5" : "hover:bg-accent"
                    }`}
                    onClick={() => toggleProviderSelection(provider.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedProviders.includes(provider.id)}
                        onCheckedChange={() => {}}
                        id={`provider-${provider.id}`}
                      />
                      <Label htmlFor={`provider-${provider.id}`} className="flex items-center gap-2 cursor-pointer">
                        {provider.icon}
                        <span>{provider.name}</span>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso general</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {!isUploading &&
            files.some((file) => !file.type?.startsWith("image/") && !file.type?.startsWith("video/")) && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Archivos no compatibles</AlertTitle>
                <AlertDescription>
                  Algunos archivos no son imágenes ni videos. Solo se mostrarán los archivos multimedia en la galería.
                </AlertDescription>
              </Alert>
            )}

          {/* Vista previa de archivos con barras de progreso detalladas */}
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-3">Vista previa de archivos</h3>
            <ScrollArea className="h-[500px] rounded-md border p-4">
              <div className="space-y-4">
                {files.map((file) => (
                  <Collapsible
                    key={file.id}
                    open={file.expanded}
                    onOpenChange={() => toggleFileExpanded(file.id)}
                    className="border rounded-md overflow-hidden"
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          {file.type?.startsWith("image/") ? (
                            <Image
                              src={file.preview || "/placeholder.svg"}
                              alt={file.name}
                              fill
                              className="object-cover"
                            />
                          ) : file.type?.startsWith("video/") ? (
                            <div className="flex h-full items-center justify-center bg-black">
                              <VideoIcon className="h-8 w-8 text-white" />
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <FileIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium truncate" title={file.name}>
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {(file.size / 1024 / 1024).toFixed(2)} MB{" "}
                                {file.type ? `• ${file.type.split("/")[1].toUpperCase()}` : ""}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {isUploading && file.status === "completed" && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckIcon className="h-3 w-3 mr-1" />
                                  Completado
                                </Badge>
                              )}

                              {!isUploading && (
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeFile(file.id)
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}

                              <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  {file.expanded ? (
                                    <ChevronUpIcon className="h-4 w-4" />
                                  ) : (
                                    <ChevronDownIcon className="h-4 w-4" />
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>

                          {/* Barra de progreso principal del archivo */}
                          {isUploading && (
                            <div className="mt-2 space-y-3">
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="font-medium">Subida al servidor</span>
                                  <div className="flex items-center gap-2">
                                    <span>{file.progress || 0}%</span>
                                    {file.uploadSpeed && (
                                      <span className="text-muted-foreground">{file.uploadSpeed}</span>
                                    )}
                                  </div>
                                </div>
                                <Progress value={file.progress || 0} className="h-2" />
                              </div>

                              {/* Mostrar barras de proveedores directamente */}
                              {selectedProviders.length > 0 && (
                                <div className="mt-3 space-y-2 border-t pt-2">
                                  <div className="flex justify-between text-xs">
                                    <span className="font-medium">Distribución a proveedores</span>
                                  </div>
                                  <div className="space-y-2">
                                    {selectedProviders.map((providerId) => {
                                      const provider = availableProviders.find((p) => p.id === providerId)
                                      const progress = providerProgress[file.id]?.[providerId] || 0
                                      const speed = providerSpeeds[file.id]?.[providerId] || "0 KB/s"
                                      const status = providerStatus[file.id]?.[providerId] || "pending"

                                      return (
                                        <div key={`${file.id}-${providerId}-inline`} className="space-y-1">
                                          <div className="flex justify-between text-xs">
                                            <div className="flex items-center gap-1">
                                              {provider?.icon}
                                              <span>{provider?.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              {status === "completed" ? (
                                                <Badge
                                                  variant="outline"
                                                  className="h-5 bg-green-50 text-green-700 border-green-200"
                                                >
                                                  <CheckIcon className="h-3 w-3 mr-1" />
                                                  Completado
                                                </Badge>
                                              ) : (
                                                <>
                                                  <span>{progress}%</span>
                                                  <span className="text-muted-foreground">{speed}</span>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                          <Progress
                                            value={progress}
                                            className={`h-1.5 ${status === "completed" ? "bg-green-100" : ""}`}
                                          />
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contenido expandible - ahora solo muestra información adicional */}
                    <CollapsibleContent>
                      <div className="px-3 pb-3 pt-1 bg-accent/20">
                        <h4 className="text-sm font-medium mb-2">Información adicional</h4>
                        <div className="text-xs text-muted-foreground">
                          <p>Nombre completo: {file.name}</p>
                          <p>Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          <p>Tipo: {file.type || "Desconocido"}</p>
                          {!isUploading && (
                            <p className="mt-2">
                              Los archivos se distribuirán a los proveedores seleccionados durante la carga.
                            </p>
                          )}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  )
}
