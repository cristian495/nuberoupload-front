// "use client";

// import { useState, useRef, useCallback } from "react";
// import Image from "next/image";
// import { ImageIcon, VideoIcon } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import MediaModal from "./media-modal";
// import { useMobile } from "@/hooks/use-mobile";
// import { useGetFolderFiles } from "@/hooks/use-get-folder-files";
// import { MediaItem } from "@/types/MediaItem";

// // Datos de ejemplo para archivos multimedia
// const mediaFiles = [
//   // Carpeta: vacation-2024
//   {
//     id: 1,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Playa Latina 1",
//     provider: "Cloudinary",
//     date: "2024-03-10",
//     folderId: "vacation-2024",
//   },
//   {
//     id: 2,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Playa Latina 2",
//     provider: "Cloudinary",
//     date: "2024-03-11",
//     folderId: "vacation-2024",
//   },
//   {
//     id: 3,
//     type: "video",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Video playa",
//     provider: "Doodstream",
//     date: "2024-03-12",
//     folderId: "vacation-2024",
//   },

//   // Carpeta: ngoc-album
//   {
//     id: 4,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Ngọc foto 1",
//     provider: "Cloudinary",
//     date: "2024-02-15",
//     folderId: "ngoc-album",
//   },
//   {
//     id: 5,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Ngọc foto 2",
//     provider: "Cloudinary",
//     date: "2024-02-16",
//     folderId: "ngoc-album",
//   },

//   // Carpeta: family-2023
//   {
//     id: 6,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Reunión familiar",
//     provider: "Cloudinary",
//     date: "2023-12-25",
//     folderId: "family-2023",
//   },
//   {
//     id: 7,
//     type: "video",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Video navidad",
//     provider: "Doodstream",
//     date: "2023-12-24",
//     folderId: "family-2023",
//   },

//   // Carpeta: work-project
//   {
//     id: 8,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Presentación proyecto",
//     provider: "Cloudinary",
//     date: "2024-01-15",
//     folderId: "work-project",
//   },
//   {
//     id: 9,
//     type: "video",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Demo producto",
//     provider: "Doodstream",
//     date: "2024-01-18",
//     folderId: "work-project",
//   },

//   // Más archivos para otras carpetas
//   {
//     id: 10,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Concierto evento",
//     provider: "Cloudinary",
//     date: "2023-11-05",
//     folderId: "events-2023",
//   },
//   {
//     id: 11,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Mi perro Max",
//     provider: "Cloudinary",
//     date: "2024-02-01",
//     folderId: "pets-collection",
//   },
//   {
//     id: 12,
//     type: "image",
//     url: "/placeholder.svg?height=500&width=500",
//     thumbnail: "/placeholder.svg?height=500&width=500",
//     title: "Torre Eiffel",
//     provider: "Cloudinary",
//     date: "2023-08-10",
//     folderId: "travel-europe",
//   },
// ];

// interface MediaGalleryProps {
//   type?: "image" | "video";
//   folderId?: string;
// }

// export default function MediaGallery({ type, folderId }: MediaGalleryProps) {
//   const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
//   const isMobile = useMobile();
//   const [longPressMedia, setLongPressMedia] = useState<MediaItem | null>(null);
//   const touchStartX = useRef<number | null>(null);
//   const touchEndX = useRef<number | null>(null);
//   const minSwipeDistance = 50; // Distancia mínima para considerar un swipe
//   const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [isLongPress, setIsLongPress] = useState(false);

//   const { files, isLoading, isError } = useGetFolderFiles(folderId || "", type);

//   // Filtrar archivos multimedia por tipo y carpeta
//   const filteredMedia = files ?? [];

//   // Función para limpiar la vista previa de long press
//   const clearLongPressMedia = useCallback(() => {
//     setLongPressMedia(null);
//     setIsLongPress(false);
//   }, []);

//   // Funciones para manejar eventos táctiles en la vista previa de long press
//   const handlePreviewSwipe = useCallback(
//     (direction: "left" | "right") => {
//       if (!longPressMedia || filteredMedia.length <= 1) return;

//       const currentIndex = filteredMedia.findIndex(
//         (m) => m._id === longPressMedia._id
//       );
//       if (currentIndex === -1) return;

//       let newIndex;
//       if (direction === "left") {
//         newIndex = (currentIndex + 1) % filteredMedia.length;
//       } else {
//         newIndex =
//           (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
//       }

//       setLongPressMedia(filteredMedia[newIndex]);
//     },
//     [filteredMedia, longPressMedia]
//   );

//   // Función para manejar el long press
//   const handleLongPress = useCallback(
//     (media: MediaItem) => {
//       if (isMobile) {
//         setLongPressMedia(media);
//         setIsLongPress(true);
//       }
//     },
//     [isMobile]
//   );

//   if (isLoading) return <p>Cargando...</p>;
//   if (isError) return <p>Error al cargar los archivos multimedia</p>;
//   if (!files || files.length === 0) return <p>No hay archivos multimedia</p>;

//   return (
//     <>
//       <div className="grid grid-cols-3 gap-1 md:gap-4">
//         {files.map((media) => (
//           <Card
//             key={media._id}
//             className="group overflow-hidden rounded-md cursor-pointer transition-all hover:shadow-md border-0 md:border"
//             onClick={() => {
//               if (!isLongPress) {
//                 setSelectedMedia(media);
//               }
//               setIsLongPress(false);
//             }}
//             // onTouchStart={() => {
//             //   // Iniciar temporizador para long press
//             //   longPressTimerRef.current = setTimeout(() => {
//             //     handleLongPress(media);
//             //   }, 500);
//             // }}
//             onTouchMove={() => {
//               // Cancelar long press si el usuario mueve el dedo
//               if (longPressTimerRef.current) {
//                 clearTimeout(longPressTimerRef.current);
//                 longPressTimerRef.current = null;
//               }
//             }}
//             onTouchEnd={() => {
//               // Limpiar temporizador si el usuario levanta el dedo
//               if (longPressTimerRef.current) {
//                 clearTimeout(longPressTimerRef.current);
//                 longPressTimerRef.current = null;
//               }
//             }}
//           >
//             <div className="relative aspect-square">
//               <Image
//                 src={media.providers[0]?.thumbnail || "/placeholder.svg"}
//                 alt={media.originalName}
//                 fill
//                 className="object-cover transition-transform group-hover:scale-105"
//                 sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

//               <div className="absolute bottom-2 left-2">
//                 <Badge
//                   variant="secondary"
//                   className="flex items-center gap-1 bg-white/90"
//                 >
//                   {media.type === "image" ? (
//                     <ImageIcon className="h-3 w-3" />
//                   ) : (
//                     <VideoIcon className="h-3 w-3" />
//                   )}
//                   <span className="text-xs">
//                     {media.providers.map((p) => p.provider).join(", ")}
//                   </span>
//                 </Badge>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Preview on long press (mobile only) */}
//       {longPressMedia && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
//           onClick={clearLongPressMedia}
//           onTouchStart={(e) => {
//             // Capturar posición inicial del toque
//             touchStartX.current = e.touches[0].clientX;
//           }}
//           onTouchMove={(e) => {
//             // Actualizar posición final del toque
//             touchEndX.current = e.touches[0].clientX;
//           }}
//           onTouchEnd={(e) => {
//             // Si no hay posiciones registradas, tratar como un toque normal
//             if (!touchStartX.current || !touchEndX.current) {
//               clearLongPressMedia();
//               return;
//             }

//             // Calcular la distancia y dirección del swipe
//             const distance = touchStartX.current - touchEndX.current;
//             const isLeftSwipe = distance > minSwipeDistance;
//             const isRightSwipe = distance < -minSwipeDistance;

//             if (isLeftSwipe) {
//               e.stopPropagation(); // Prevenir el cierre
//               handlePreviewSwipe("left");
//             } else if (isRightSwipe) {
//               e.stopPropagation(); // Prevenir el cierre
//               handlePreviewSwipe("right");
//             } else {
//               // Si no fue un swipe claro, cerrar la vista previa
//               clearLongPressMedia();
//             }

//             // Resetear valores
//             touchStartX.current = null;
//             touchEndX.current = null;
//           }}
//           style={{ touchAction: "none" }}
//         >
//           <div className="w-[85vw] h-[85vh] relative">
//             <Image
//               src={longPressMedia.providers[0].thumbnail || "/placeholder.svg"}
//               alt={longPressMedia.originalName}
//               fill
//               className="object-contain media-fade-in"
//             />

//             {/* Indicador de posición */}
//             <div className="absolute bottom-4 left-0 right-0 flex justify-center">
//               <div className="bg-black/30 rounded-full px-3 py-1 text-white text-xs">
//                 {filteredMedia.findIndex((m) => m._id === longPressMedia._id) +
//                   1}{" "}
//                 / {filteredMedia.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Media Modal */}
//       <MediaModal
//         media={selectedMedia}
//         mediaList={filteredMedia}
//         isOpen={!!selectedMedia}
//         onClose={() => setSelectedMedia(null)}
//         onNavigate={(newMedia) => setSelectedMedia(newMedia)}
//       />
//     </>
//   );
// }
"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ImageIcon,
  VideoIcon,
  CloudIcon,
  ServerIcon,
  ExternalLinkIcon,
  CheckIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import MediaModal from "./media-modal";
import { useMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import BatchUploadDialog from "../upload/batch-upload-dialog";
import SelectionToolbar from "./selection-toolbar";
import { useFetchFolderFiles } from "@/hooks/use-get-folder-files";
import { useFetchAvailableProviders } from "@/hooks/use-get-available-providers";
import { MediaFile } from "@/types/MediaFile";
import { useBoundStore } from "@/stores/use-bound-store";

// Tipo para un proveedor de almacenamiento
interface Provider {
  id: string;
  name: string;
  url: string;
  quality?: string;
  speed?: "fast" | "medium" | "slow";
  icon?: React.ReactNode;
}

// interface MediaFile {
//   id: number;
//   type: string;
//   providers: Provider[]; // Ahora cada archivo puede tener múltiples proveedores
//   thumbnail: string;
//   title: string;
//   date: string;
//   folderId: string;
// }

interface MediaGalleryProps {
  type?: "all" | "image" | "video";
  folderId?: string;
  enableSelectionMode?: () => void;
}

// Iconos para los proveedores
const providerIcons: Record<string, React.ReactNode> = {
  cloudinary: <CloudIcon className="h-3 w-3" />,
  doodstream: <ServerIcon className="h-3 w-3" />,
  gdrive: <ExternalLinkIcon className="h-3 w-3" />,
};

export default function MediaGallery({
  type = "all",
  folderId,
  enableSelectionMode,
}: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const isMobile = useMobile();
  const [longPressMedia, setLongPressMedia] = useState<MediaFile | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // Distancia mínima para considerar un swipe
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isBatchUploadDialogOpen, setIsBatchUploadDialogOpen] = useState(false);

  // Estado y función para la selección de proveedores en el diálogo de carga por lotes
  const [selectedProvidersForUpload, setSelectedProvidersForUpload] = useState<
    string[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleProviderSelectionForUpload = (
    providerId: string,
    checked: boolean
  ) => {
    setSelectedProvidersForUpload((prev) => {
      if (checked) {
        return [...prev, providerId];
      } else {
        return prev.filter((id) => id !== providerId);
      }
    });
  };

  const toggleFileSelection = useCallback(
    (fileId: string, event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
      }

      setSelectedFiles((prev) => {
        if (prev.includes(fileId)) {
          return prev.filter((id) => id !== fileId);
        } else {
          return [...prev, fileId];
        }
      });
    },
    []
  );

  const clearSelection = useCallback(() => {
    setSelectedFiles([]);
    setSelectionMode(false);
  }, []);

  // Función para manejar el long press
  const handleLongPress = useCallback(
    (media: MediaFile) => {
      if (isMobile) {
        setLongPressMedia(media);
        setIsLongPress(true);
      }
    },
    [isMobile]
  );

  // Función para limpiar la vista previa de long press
  const clearLongPressMedia = useCallback(() => {
    setLongPressMedia(null);
    setIsLongPress(false);
  }, []);
  useFetchFolderFiles(folderId || "", type);

  const { files } = useBoundStore((s) => s);

  useFetchAvailableProviders();

  const providers = useBoundStore((s) => s.availableProviders);

  // Filtrar archivos multimedia por tipo y carpeta
  const filteredMedia = files ?? [];

  // // Filtrar archivos multimedia por tipo y carpeta
  // const filteredMedia = mediaFiles.filter((media) => {
  //   if (type !== "all" && media.type !== type) return false;
  //   if (folderId && media.folderId !== folderId) return false;
  //   return true;
  // });

  return (
    <TooltipProvider>
      <div className="relative">
        {selectionMode && (
          <SelectionToolbar
            selectedCount={selectedFiles.length}
            onClearSelection={clearSelection}
            onUploadBatch={() => setIsBatchUploadDialogOpen(true)}
          />
        )}

        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {filteredMedia.map((media) => (
            <Card
              key={media._id}
              className={`group overflow-hidden rounded-md cursor-pointer transition-all hover:shadow-md border-0 md:border ${
                selectionMode && selectedFiles.includes(media._id)
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => {
                if (selectionMode) {
                  toggleFileSelection(media._id);
                } else if (!isLongPress) {
                  setSelectedMedia(media);
                }
                setIsLongPress(false);
              }}
              onTouchStart={() => {
                // Iniciar temporizador para long press
                longPressTimerRef.current = setTimeout(() => {
                  handleLongPress(media);
                }, 500);
              }}
              onTouchMove={() => {
                // Cancelar long press si el usuario mueve el dedo
                if (longPressTimerRef.current) {
                  clearTimeout(longPressTimerRef.current);
                  longPressTimerRef.current = null;
                }
              }}
              onTouchEnd={() => {
                // Limpiar temporizador si el usuario levanta el dedo
                if (longPressTimerRef.current) {
                  clearTimeout(longPressTimerRef.current);
                  longPressTimerRef.current = null;
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                if (!selectionMode) {
                  setSelectionMode(true);
                }
                toggleFileSelection(media._id);
              }}
            >
              <div className="relative aspect-square">
                <Image
                  src={media.providers[0].thumbnail || "/placeholder.svg"}
                  alt={media.originalName}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {selectionMode && (
                  <div
                    className="absolute top-2 left-2 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-white"
                    onClick={(e) => toggleFileSelection(media._id, e)}
                  >
                    {selectedFiles.includes(media._id) && (
                      <CheckIcon className="h-3 w-3 text-primary" />
                    )}
                  </div>
                )}

                <div className="absolute bottom-2 left-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-white/90"
                  >
                    {media.type === "image" ? (
                      <ImageIcon className="h-3 w-3" />
                    ) : (
                      <VideoIcon className="h-3 w-3" />
                    )}
                    <span className="text-xs">
                      {media.providers[0].provider}
                    </span>
                  </Badge>
                </div>

                {/* Indicador de múltiples proveedores */}
                {media.providers.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="outline"
                          className="bg-white/90 text-xs"
                        >
                          +{media.providers.length}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <div className="font-medium mb-1">
                          Proveedores disponibles:
                        </div>
                        <ul className="space-y-1">
                          {media.providers.map((provider) => (
                            <li
                              key={provider._id}
                              className="flex items-center gap-1"
                            >
                              {providerIcons[provider._id] || (
                                <ServerIcon className="h-3 w-3" />
                              )}
                              {/* <span>dsfds</span>
                              {provider && (
                                <span className="text-muted-foreground">
                                  400p
                                </span>
                              )} */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Media Modal */}
      <MediaModal
        media={selectedMedia}
        mediaList={filteredMedia}
        isOpen={!!selectedMedia}
        availableProviders={providers ?? []}
        onClose={() => setSelectedMedia(null)}
        onNavigate={(newMedia) => setSelectedMedia(newMedia)}
      />

      {/* Diálogo para subir por lotes a nuevos proveedores */}
      {/* <BatchUploadDialog
        isOpen={isBatchUploadDialogOpen}
        onClose={() => setIsBatchUploadDialogOpen(false)}
        selectedFiles={filteredMedia.filter((media) =>
          selectedFiles.includes(media._id)
        )}
        availableProviders={providers ?? []}
        onClearSelection={clearSelection}
      /> */}
    </TooltipProvider>
  );
}
