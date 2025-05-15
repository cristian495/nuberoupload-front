// context/folders-context.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFolderById, fetchFolders } from "@/lib/api";
import { MediaFolder } from "@/types/MediaFolder";

interface FolderContextValue {
  folder: MediaFolder | null;
  setFolder: (folder: MediaFolder | null) => void;
}

const FolderContext = createContext<FolderContextValue | undefined>(undefined);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folder, setFolder] = useState<MediaFolder | null>(null);

  return (
    <FolderContext.Provider value={{ folder, setFolder: setFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolder() {
  const context = useContext(FolderContext);
  if (!context)
    throw new Error("useFolder debe usarse dentro de FolderProvider");
  return context;
}
