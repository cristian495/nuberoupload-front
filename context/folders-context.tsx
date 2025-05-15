// context/folders-context.tsx
"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFolders } from "@/lib/api";
import { MediaFolder } from "@/types/MediaFolder";

interface FoldersContextValue {
  folders: MediaFolder[];
  isLoading: boolean;
  isError: boolean;
}

const FoldersContext = createContext<FoldersContextValue | undefined>(
  undefined
);

export function FoldersProvider({ children }: { children: React.ReactNode }) {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<MediaFolder[]>({
    queryKey: ["folders"],
    queryFn: fetchFolders,
    initialData: [],
  });

  return (
    <FoldersContext.Provider value={{ folders: data, isLoading, isError }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context)
    throw new Error("useFolders debe usarse dentro de FoldersProvider");
  return context;
}
