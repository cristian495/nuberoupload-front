"use client";

import React, { useState } from "react";
import { MediaFile } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlayCircle, ChevronDownIcon, CheckIcon, Loader2 } from "lucide-react";
import {
  getProviderIcon,
  getProviderDisplayName,
} from "@/constants/file-extensions";
import { StorageProvidersCodes } from "@/types/storage-providers-codes";
import { useSecureVideo } from "@/hooks/use-secure-video";

interface FileCardProps {
  file: MediaFile;
  className?: string;
}

export function FileCard({ file, className = "" }: FileCardProps) {
  const [selectedProviderId, setSelectedProviderId] = useState(
    file.uploads?.[0]?.providerId || null,
  );

  const selectedUpload =
    file.uploads?.find((u) => u.providerId === selectedProviderId) ||
    file.uploads?.[0];

  // Hook para video seguro (solo para Storj)
  const {
    videoUrl,
    loading: videoLoading,
    error: videoError,
  } = useSecureVideo({
    fileId: file._id,
    providerId: selectedProviderId || "",
    enabled: selectedUpload?.providerCode === StorageProvidersCodes.STORJ,
  });

  if (!selectedUpload) {
    return (
      <Card
        className={`flex aspect-square items-center justify-center bg-muted ${className}`}
      >
        <p className="text-sm text-muted-foreground">Sin URL disponible</p>
      </Card>
    );
  }

  if (file.category === "video") {
    return (
      <Card className={`relative overflow-hidden ${className}`}>
        <div className="aspect-video bg-black">
          {selectedUpload.providerCode === StorageProvidersCodes.DOODSTREAM && (
            <iframe
              src={selectedUpload.url}
              className="h-full w-full object-cover"
            >
              Tu navegador no soporta iframes HTML5.
            </iframe>
          )}
          {selectedUpload.providerCode === StorageProvidersCodes.STORJ && (
            <>
              {videoLoading && (
                <div className="flex h-full w-full items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              {videoError && (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-sm text-red-400">Error: {videoError}</p>
                </div>
              )}
              {videoUrl && !videoLoading && (
                <video
                  src={videoUrl}
                  className="h-full w-full object-cover"
                  controls
                />
              )}
            </>
          )}
        </div>
        {/* Provider selector for multiple uploads */}
        {file.uploads.length > 1 && (
          <div className="absolute right-2 top-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-0 bg-black/30 px-2 text-white hover:bg-black/50 hover:text-white"
                >
                  {React.createElement(
                    getProviderIcon(selectedUpload.providerCode),
                    {
                      className: "h-3 w-3",
                    },
                  )}
                  <ChevronDownIcon className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {file.uploads.map((upload) => {
                  const ProviderIcon = getProviderIcon(upload.providerCode);
                  return (
                    <DropdownMenuItem
                      key={upload.providerId}
                      onClick={() => setSelectedProviderId(upload.providerId)}
                      className={`${selectedProviderId === upload.providerId ? "bg-accent" : ""}}`}
                    >
                      <div className="flex items-center text-black dark:text-white">
                        <ProviderIcon className="mr-2 h-4 w-4" />
                        <span>
                          {getProviderDisplayName(upload.providerCode)}
                        </span>
                        {selectedProviderId === upload.providerId && (
                          <CheckIcon className="ml-2 h-4 w-4" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="p-3">
          <p className="truncate text-sm font-medium" title={file.originalName}>
            {file.originalName}
          </p>
          <p className="text-xs capitalize text-muted-foreground">
            {file.category}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="aspect-square">
        <img
          src={
            selectedUpload.providerCode === StorageProvidersCodes.DOODSTREAM
              ? selectedUpload.url
              : videoUrl || ""
          }
          alt={file.originalName}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      {/* Provider selector for multiple uploads */}
      {file.uploads.length > 1 && (
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-0 bg-black/30 px-2 text-white hover:bg-black/50 hover:text-white"
              >
                {React.createElement(
                  getProviderIcon(selectedUpload.providerCode),
                  {
                    className: "h-3 w-3",
                  },
                )}
                <ChevronDownIcon className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {file.uploads.map((upload) => {
                const ProviderIcon = getProviderIcon(upload.providerCode);
                return (
                  <DropdownMenuItem
                    key={upload.providerId}
                    onClick={() => setSelectedProviderId(upload.providerId)}
                    className={
                      selectedProviderId === upload.providerId
                        ? "bg-accent"
                        : ""
                    }
                  >
                    <div className="flex items-center">
                      <ProviderIcon className="mr-2 h-4 w-4" />
                      <span>{getProviderDisplayName(upload.providerCode)}</span>
                      {selectedProviderId === upload.providerId && (
                        <CheckIcon className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="p-3">
        <p className="truncate text-sm font-medium" title={file.originalName}>
          {file.originalName}
        </p>
        <p className="text-xs capitalize text-muted-foreground">
          {file.category}
        </p>
      </div>
    </Card>
  );
}
