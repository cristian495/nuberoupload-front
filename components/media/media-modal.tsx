"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  FolderIcon,
  XIcon,
  ArrowLeftIcon,
  MoreHorizontalIcon,
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
  ServerIcon,
  ExternalLinkIcon,
  UploadCloudIcon,
  PlusIcon,
  Loader2Icon,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog as DialogPrimitive,
  DialogContent as DialogContentPrimitive,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { MediaFile } from "@/types/MediaFile";
import { StorageProvider } from "@/types/StorageProvider";
import { MediaFolder } from "@/types/MediaFolder";
import { useFolder } from "@/context/folder-contex";
import { useBoundStore } from "@/stores/use-bound-store";

interface MediaModalProps {
  media: MediaFile | null;
  mediaList: MediaFile[];
  isOpen: boolean;
  availableProviders: StorageProvider[];
  onClose: () => void;
  onNavigate: (media: MediaFile) => void;
}

// Datos de ejemplo para carpetas (para mostrar el nombre de la carpeta)
const folders = [
  {
    id: "vacation-2024",
    name: "2024-03 Latina 🏝️",
  },
  {
    id: "ngoc-album",
    name: "Ngọc 🍀 Album",
  },
  {
    id: "family-2023",
    name: "Familia 2023 👨‍👩‍👧",
  },
  {
    id: "work-project",
    name: "Proyecto Trabajo 💼",
  },
  {
    id: "events-2023",
    name: "Eventos 2023 🎭",
  },
  {
    id: "pets-collection",
    name: "Mascotas 🐶🐱",
  },
  {
    id: "travel-europe",
    name: "Viaje Europa 🇪🇺",
  },
  {
    id: "birthday-party",
    name: "Fiesta Cumpleaños 🎂",
  },
];

// Iconos para los proveedores
const providerIcons: Record<string, React.ReactNode> = {
  cloudinary: <CloudIcon className="h-4 w-4" />,
  doodstream: <ServerIcon className="h-4 w-4" />,
  gdrive: <ExternalLinkIcon className="h-4 w-4" />,
};

// Lista de todos los proveedores disponibles en el sistema
// En una aplicación real, esto vendría de una API o configuración
// const allAvailableProviders: StorageProvider[] = [];

export default function MediaModal({
  media,
  mediaList,
  availableProviders,
  isOpen,
  onClose,
  onNavigate,
}: MediaModalProps) {
  const [copied, setCopied] = useState(false);
  const isMobile = useMobile();
  const [showControls, setShowControls] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // Distancia mínima para considerar un swipe
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedProvidersForUpload, setSelectedProvidersForUpload] = useState<
    string[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const folder = useBoundStore((state) => state.selectedFolder);
  // Añadir al principio del componente, justo después de las declaraciones de estado
  const swipeStyles = {
    touchAction: "pan-y", // Permitir scroll vertical pero capturar gestos horizontales
    userSelect: "none", // Evitar selección de texto durante el swipe
  };

  // Encontrar el índice actual del medio en la lista
  useEffect(() => {
    if (media && mediaList.length > 0) {
      const index = mediaList.findIndex((item) => item._id === media._id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [media, mediaList]);

  // Establecer el proveedor predeterminado cuando cambia el medio
  useEffect(() => {
    if (media && media.providers.length > 0) {
      setSelectedProvider(media.providers[0]._id);
    } else {
      setSelectedProvider(null);
    }
  }, [media]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft") {
        navigateToPrevious();
      } else if (e.key === "ArrowRight") {
        navigateToNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, mediaList]);

  // Funciones para manejar eventos táctiles con mejor detección de swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    // Añadir una clase CSS para indicar que el swipe está en progreso
    if (e.currentTarget.classList) {
      e.currentTarget.classList.add("swiping");
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    touchEndX.current = e.touches[0].clientX;

    // Calcular la distancia del swipe en tiempo real
    if (touchStartX.current && touchEndX.current) {
      const distance = touchStartX.current - touchEndX.current;

      // Opcional: Aplicar una transformación para dar feedback visual durante el swipe
      const element = e.currentTarget as HTMLElement;
      if (Math.abs(distance) > 20) {
        element.style.transform = `translateX(${-distance * 0.2}px)`;
        element.style.transition = "transform 0.1s";
      }
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    // Restaurar estilos
    const element = e.currentTarget as HTMLElement;
    element.style.transform = "";
    element.style.transition = "transform 0.3s";

    if (e.currentTarget.classList) {
      e.currentTarget.classList.remove("swiping");
    }

    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateToNext();
    } else if (isRightSwipe) {
      navigateToPrevious();
    }

    // Resetear valores
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const navigateToNext = useCallback(() => {
    if (mediaList.length <= 1) return;

    const nextIndex = (currentIndex + 1) % mediaList.length;
    onNavigate(mediaList[nextIndex]);
  }, [currentIndex, mediaList, onNavigate]);

  const navigateToPrevious = useCallback(() => {
    if (mediaList.length <= 1) return;

    const prevIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
    onNavigate(mediaList[prevIndex]);
  }, [currentIndex, mediaList, onNavigate]);

  // Obtener el proveedor seleccionado actualmente
  const getCurrentProvider = useCallback(() => {
    if (!media || !selectedProvider) return null;
    return (
      media.providers.find((provider) => provider._id === selectedProvider) ||
      null
    );
  }, [media, selectedProvider]);

  // Manejar la selección de proveedores para subir
  const handleProviderSelectionForUpload = useCallback(
    (providerId: string, isSelected: boolean) => {
      setSelectedProvidersForUpload((prev) => {
        if (isSelected) {
          return [...prev, providerId];
        } else {
          return prev.filter((id) => id !== providerId);
        }
      });
    },
    []
  );

  // Simular la subida a los proveedores seleccionados
  const handleUploadToProviders = useCallback(() => {
    if (selectedProvidersForUpload.length === 0 || !media) return;

    setIsUploading(true);

    // Inicializar el progreso para cada proveedor
    const initialProgress: Record<string, number> = {};
    selectedProvidersForUpload.forEach((id) => {
      initialProgress[id] = 0;
    });
    setUploadProgress(initialProgress);

    // Simular el progreso de subida para cada proveedor
    selectedProvidersForUpload.forEach((providerId) => {
      const duration = Math.random() * 3000 + 2000; // Entre 2 y 5 segundos
      const interval = 100; // Actualizar cada 100ms
      const steps = duration / interval;
      let currentStep = 0;

      const updateInterval = setInterval(() => {
        currentStep++;
        const progress = Math.min(Math.floor((currentStep / steps) * 100), 100);

        setUploadProgress((prev) => ({
          ...prev,
          [providerId]: progress,
        }));

        // Verificar si todos los proveedores han terminado
        if (currentStep >= steps) {
          clearInterval(updateInterval);

          // Comprobar si todos los proveedores han terminado
          const allCompleted = Object.values(uploadProgress).every(
            (p) => p >= 100
          );

          if (allCompleted) {
            // Simular la actualización del objeto media con los nuevos proveedores
            setTimeout(() => {
              setIsUploading(false);
              setIsUploadDialogOpen(false);

              // Mostrar mensaje de éxito
              toast({
                title: "Subida completada",
                description: `El archivo se ha subido correctamente a ${selectedProvidersForUpload.length} proveedores.`,
              });

              // Resetear selecciones
              setSelectedProvidersForUpload([]);
              setUploadProgress({});
            }, 500);
          }
        }
      }, interval);
    });
  }, [selectedProvidersForUpload, media, uploadProgress]);

  if (!media) return null;

  // Obtener el nombre de la carpeta
  const folderName = folder?.name;

  // Obtener el proveedor actual
  const currentProvider = getCurrentProvider();

  const handleCopyLink = () => {
    if (!currentProvider) return;

    navigator.clipboard.writeText(currentProvider.url);
    setCopied(true);
    toast({
      title: "Enlace copiado",
      description: "El enlace ha sido copiado al portapapeles",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleProviderChange = (providerId: string) => {
    setSelectedProvider(providerId);
    toast({
      title: "Proveedor cambiado",
      description: `Visualizando desde ${
        media.providers.find((p) => p._id === providerId)?.provider
      }`,
    });
  };

  // Renderizado específico para móvil (estilo Instagram)
  if (isMobile) {
    return (
      <>
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className="max-w-full h-screen p-0 m-0 border-0 rounded-none bg-black">
            <div className="flex flex-col h-full">
              {/* Header para móvil */}
              <div className="flex items-center justify-between p-4 text-white">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:text-white hover:bg-transparent"
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </Button>
                <div className="text-sm font-medium">{media.originalName}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-white hover:bg-transparent"
                    >
                      <MoreHorizontalIcon className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {media.providers.map((provider) => (
                      <DropdownMenuItem
                        key={provider._id}
                        onClick={() => handleProviderChange(provider._id)}
                        className={
                          selectedProvider === provider._id ? "bg-accent" : ""
                        }
                      >
                        <div className="flex items-center">
                          {providerIcons[provider._id] || (
                            <ServerIcon className="h-4 w-4 mr-2" />
                          )}
                          <span className="ml-2">{provider.provider}</span>
                          {/* {provider.quality && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              {provider.quality}
                            </Badge>
                          )} */}
                          {selectedProvider === provider._id && (
                            <CheckIcon className="h-4 w-4 ml-2" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}

                    {availableProviders.length > 0 && (
                      <>
                        <DropdownMenuItem
                          onClick={() => setIsUploadDialogOpen(true)}
                          className="border-t mt-1 pt-1"
                        >
                          <div className="flex items-center">
                            <UploadCloudIcon className="h-4 w-4 mr-2" />
                            <span className="ml-2">
                              Subir a más proveedores
                            </span>
                          </div>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Contenido principal con soporte para swipe */}
              <div
                className="flex-1 flex items-center justify-center relative"
                onClick={() => setShowControls(!showControls)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                // style={swipeStyles}
              >
                {media.type === "image" ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={currentProvider?.url || "/placeholder.svg"}
                      alt={media.originalName}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* En una aplicación real, aquí iría un reproductor de video */}
                    <Image
                      src={media.providers[0].thumbnail || "/placeholder.svg"}
                      alt={media.originalName}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 text-white px-4 py-2 rounded-full">
                        Vista previa de video
                      </div>
                    </div>
                  </div>
                )}

                {/* Flechas de navegación */}
                {showControls && mediaList.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToPrevious();
                      }}
                      className="absolute left-2 text-white hover:text-white hover:bg-black/20 bg-black/10 rounded-full"
                    >
                      <ChevronLeftIcon className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToNext();
                      }}
                      className="absolute right-2 text-white hover:text-white hover:bg-black/20 bg-black/10 rounded-full"
                    >
                      <ChevronRightIcon className="h-8 w-8" />
                    </Button>
                  </>
                )}

                {/* Indicador de posición y proveedor (compacto) */}
                {showControls && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
                    <div className="bg-black/30 rounded-full px-3 py-1 text-white text-xs flex items-center">
                      {currentIndex + 1} / {mediaList.length}
                      {currentProvider && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="ml-2 flex items-center">
                                <span className="mx-1">•</span>
                                {providerIcons[currentProvider._id] || (
                                  <ServerIcon className="h-3 w-3" />
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              {currentProvider.provider}{" "}
                              {/* {currentProvider.quality &&
                                `(${currentProvider.quality})`} */}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer con acciones estilo Instagram */}
              {showControls && (
                <div className="bg-black text-white p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white hover:bg-transparent p-0"
                      >
                        <HeartIcon className="h-7 w-7" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white hover:bg-transparent p-0"
                      >
                        <MessageCircleIcon className="h-7 w-7" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white hover:bg-transparent p-0"
                      >
                        <SendIcon className="h-7 w-7" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-white hover:bg-transparent p-0"
                    >
                      <BookmarkIcon className="h-7 w-7" />
                    </Button>
                  </div>

                  <div className="text-sm mb-2">
                    <span className="font-semibold mr-2">{folderName}</span>
                    <span>{media.originalName}</span>
                  </div>

                  <div className="text-xs text-gray-400">
                    {new Date(media.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Diálogo para subir a nuevos proveedores */}
        <DialogPrimitive
          open={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
        >
          <DialogContentPrimitive className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Subir a nuevos proveedores</DialogTitle>
              <DialogDescription>
                Selecciona los proveedores a los que quieres subir este archivo.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              {availableProviders.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  Este archivo ya está disponible en todos los proveedores.
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {availableProviders.map((provider) => (
                      <div
                        key={provider._id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`provider-${provider._id}`}
                          checked={selectedProvidersForUpload.includes(
                            provider._id
                          )}
                          onCheckedChange={(checked) =>
                            handleProviderSelectionForUpload(
                              provider._id,
                              checked === true
                            )
                          }
                          disabled={isUploading}
                        />
                        <label
                          htmlFor={`provider-${provider._id}`}
                          className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {providerIcons[provider._id] || (
                            <ServerIcon className="h-4 w-4" />
                          )}
                          <span>{provider.name}</span>
                          {/* {provider.quality && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              {provider.quality}
                            </Badge>
                          )} */}
                        </label>

                        {/* Mostrar progreso si está subiendo */}
                        {isUploading &&
                          selectedProvidersForUpload.includes(provider._id) && (
                            <div className="flex-1 ml-2">
                              <Progress
                                value={uploadProgress[provider._id] || 0}
                                className="h-2"
                              />
                              <span className="text-xs text-right block mt-1">
                                {uploadProgress[provider._id] || 0}%
                              </span>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>

                  {isUploading && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      <span>Subiendo archivos...</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isUploading}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={handleUploadToProviders}
                disabled={
                  selectedProvidersForUpload.length === 0 || isUploading
                }
              >
                {isUploading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <UploadCloudIcon className="mr-2 h-4 w-4" />
                    Subir a {selectedProvidersForUpload.length} proveedores
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContentPrimitive>
        </DialogPrimitive>
      </>
    );
  }

  // Renderizado para escritorio (estilo Instagram)
  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[95vw] max-h-[95vh] h-[95vh] overflow-hidden p-0 border-0">
          {/* Contenido a pantalla completa */}
          <div
            className="w-full h-full bg-black flex items-center justify-center relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            // style={swipeStyles}
          >
            {media.type === "image" ? (
              <Image
                src={currentProvider?.url || "/placeholder.svg"}
                alt={media.originalName}
                fill
                className="object-contain"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={media.providers[0].thumbnail || "/placeholder.svg"}
                  alt={media.originalName}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 text-white px-4 py-2 rounded-full">
                    Vista previa de video
                  </div>
                </div>
              </div>
            )}

            {/* Botón para cerrar */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-white hover:bg-black/20 bg-black/10 rounded-full z-10"
            >
              <XIcon className="h-5 w-5" />
            </Button>

            {/* Selector de proveedor */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/30 text-white border-0 hover:bg-black/50 hover:text-white flex items-center gap-1"
                  >
                    {currentProvider && (
                      <>
                        {providerIcons[currentProvider._id] || (
                          <ServerIcon className="h-3 w-3" />
                        )}
                        <span className="ml-1">{currentProvider.provider}</span>
                        {/* {currentProvider.quality && (
                          <span className="text-xs ml-1">
                            ({currentProvider.quality})
                          </span>
                        )} */}
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {media.providers.map((provider) => (
                    <DropdownMenuItem
                      key={provider._id}
                      onClick={() => handleProviderChange(provider._id)}
                      className={
                        selectedProvider === provider._id ? "bg-accent" : ""
                      }
                    >
                      <div className="flex items-center">
                        {providerIcons[provider._id] || (
                          <ServerIcon className="h-4 w-4 mr-2" />
                        )}
                        <span className="ml-2">{provider.provider}</span>
                        {/* {provider.quality && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            {provider.quality}
                          </Badge>
                        )} */}
                        {selectedProvider === provider._id && (
                          <CheckIcon className="h-4 w-4 ml-2" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Botón para subir a más proveedores */}
              {availableProviders.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsUploadDialogOpen(true)}
                  className="bg-black/30 text-white border-0 hover:bg-black/50 hover:text-white"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  <span>Más proveedores</span>
                </Button>
              )}
            </div>

            {/* Información del archivo */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-black/30 px-3 py-2 rounded-md text-white">
                <div className="text-sm font-medium">{media.originalName}</div>
                <div className="text-xs mt-1 flex items-center">
                  <FolderIcon className="h-3 w-3 mr-1" />
                  <span>{folderName}</span>
                </div>
              </div>
            </div>

            {/* Flechas de navegación para escritorio */}
            {mediaList.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={navigateToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-black/20 bg-black/10 rounded-full h-10 w-10"
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={navigateToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-black/20 bg-black/10 rounded-full h-10 w-10"
                >
                  <ChevronRightIcon className="h-8 w-8" />
                </Button>

                {/* Indicador de posición */}
                <div className="absolute bottom-4 right-4 flex justify-center">
                  <div className="bg-black/30 rounded-md px-3 py-1 text-white text-xs">
                    {currentIndex + 1} / {mediaList.length}
                  </div>
                </div>
              </>
            )}

            {/* Acciones rápidas */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="bg-black/30 text-white border-0 hover:bg-black/50 hover:text-white"
              >
                {copied ? (
                  <>
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Copiar enlace
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para subir a nuevos proveedores */}
      <DialogPrimitive
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      >
        <DialogContentPrimitive className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subir a nuevos proveedores</DialogTitle>
            <DialogDescription>
              Selecciona los proveedores a los que quieres subir este archivo.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {availableProviders.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                Este archivo ya está disponible en todos los proveedores.
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {availableProviders.map((provider) => (
                    <div
                      key={provider._id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`provider-${provider._id}`}
                        checked={selectedProvidersForUpload.includes(
                          provider._id
                        )}
                        onCheckedChange={(checked) =>
                          handleProviderSelectionForUpload(
                            provider._id,
                            checked === true
                          )
                        }
                        disabled={isUploading}
                      />
                      <label
                        htmlFor={`provider-${provider._id}`}
                        className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {providerIcons[provider._id] || (
                          <ServerIcon className="h-4 w-4" />
                        )}
                        <span>{provider.name}</span>
                        {/* {provider.quality && (
                          <Badge variant="outline" className="ml-1 text-xs">
                            {provider.quality}
                          </Badge>
                        )} */}
                      </label>

                      {/* Mostrar progreso si está subiendo */}
                      {isUploading &&
                        selectedProvidersForUpload.includes(provider._id) && (
                          <div className="flex-1 ml-2">
                            <Progress
                              value={uploadProgress[provider._id] || 0}
                              className="h-2"
                            />
                            <span className="text-xs text-right block mt-1">
                              {uploadProgress[provider._id] || 0}%
                            </span>
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    <span>Subiendo archivos...</span>
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isUploading}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={handleUploadToProviders}
              disabled={selectedProvidersForUpload.length === 0 || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <UploadCloudIcon className="mr-2 h-4 w-4" />
                  Subir a {selectedProvidersForUpload.length} proveedores
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContentPrimitive>
      </DialogPrimitive>
    </>
  );
}
