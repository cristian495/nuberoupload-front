import { MediaFile, MediaFolder, StorageProvider } from "@/types";
import { StateCreator } from "zustand";

export interface MediaSlice {
  folders: MediaFolder[];
  files: MediaFile[];
  selectedFolder: MediaFolder | null;
  availableProviders: StorageProvider[];

  isLoading: boolean;
  isError: boolean;
  errorMessage?: string | null | undefined;

  setFolders: (folders: MediaFolder[]) => void;
  setFiles: (files: MediaFile[]) => void;
  setSelectedFolder: (folder: MediaFolder | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsError: (value: boolean, errorMessage?: string | null) => void;
  setAvailableProviders: (providers: StorageProvider[]) => void;
}

export const createMediaSlice: StateCreator<MediaSlice, [], [], MediaSlice> = (
  set
) => ({
  folders: [],
  files: [],
  selectedFolder: null,
  availableProviders: [],

  isLoading: false,
  isError: false,
  errorMessage: null,

  setFolders: (folders) => set({ folders }),
  setFiles: (files) => set({ files }),
  setSelectedFolder: (folder) => set({ selectedFolder: folder }),
  setIsLoading: (value) => set({ isLoading: value }),
  setIsError: (value, message) =>
    set({ isError: value, errorMessage: message }),
  setAvailableProviders: (providers) => set({ availableProviders: providers }),
});
