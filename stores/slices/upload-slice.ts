import { MediaFile, MediaFolder, StorageProvider } from "@/types";
import { UploadStatus } from "@/types/UploadStatus";
import { StateCreator } from "zustand";

interface ProviderProgress {
  [provider: string]: {
    progress: number;
    status: UploadStatus;
    error?: string;
  };
}

export interface UploadFile {
  temporaryId: string; // ID generado en frontend para UI mientras se sube
  serverFileId?: string; // ID real de MongoDB una vez creado en servidor
  expanded: boolean;
  preview?: string;
  file: File; // ← el verdadero archivo
  name: string;
  type: string;
  size: number;
  lastModified: number;
  webkitRelativePath: string;
  progress: number;
  status: UploadStatus;
  providerProgress: Record<string, { progress: number; status: UploadStatus; error?: string }>;
}

export interface UploadSlice {
  uploadFiles: UploadFile[];
  folderName: string;
  isUploading: boolean;
  showProgress: boolean;
  selectedProviders: StorageProvider[];

  setIsUploading: (value: boolean) => void;
  setShowProgress: (value: boolean) => void;
  setFolderName: (name: string) => void;
  addUploadFile: (file: UploadFile) => void;
  addUploadFiles: (files: UploadFile[]) => void;
  updateFileProgress: (
    temporaryId: string,
    progress: number,
    status: UploadStatus,
  ) => void;
  setServerFileId: (temporaryId: string, serverFileId: string) => void;
  updateProviderProgress: (
    serverFileId: string,
    providerId: string,
    status: UploadStatus,
    progress: number,
    error?: string,
  ) => void;
  toggleFileExpanded: (temporaryId: string) => void;
  clearAllUploadFiles: () => void;
  toggleProviderSelection: (provider: StorageProvider) => void;
}

export const createUploadSlice: StateCreator<
  UploadSlice,
  [],
  [],
  UploadSlice
> = (set) => ({
  uploadFiles: [],
  folderName: "",
  isUploading: false,
  showProgress: false,
  selectedProviders: [],

  setIsUploading: (value) => set((s) => ({ isUploading: value })),
  setShowProgress: (value) => set((s) => ({ showProgress: value })),
  setFolderName: (name) => set((s) => ({ folderName: name })),
  addUploadFile: (file) =>
    set((s) => ({ uploadFiles: [...s.uploadFiles, file] })),
  addUploadFiles: (files) =>
    set((s) => ({ uploadFiles: [...s.uploadFiles, ...files] })),
  updateFileProgress: (temporaryId, progress, status) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.temporaryId === temporaryId ? { ...f, progress, status: status } : f,
      ),
    })),
  setServerFileId: (temporaryId, serverFileId) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.temporaryId === temporaryId ? { ...f, serverFileId } : f,
      ),
    })),
  updateProviderProgress: (serverFileId, providerId, status, progress, error) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.serverFileId === serverFileId
          ? {
              ...f,
              providerProgress: {
                ...f.providerProgress,
                [providerId]: { progress, status, error },
              },
            }
          : f,
      ),
    })),
  toggleFileExpanded: (temporaryId) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.temporaryId === temporaryId ? { ...f, expanded: !f.expanded } : f,
      ),
    })),
  clearAllUploadFiles: () =>
    set((state) => {
      // Libera objetos URL si es necesario
      state.uploadFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });

      return {
        uploadFiles: [],
        folderName: "",
      };
    }),
  toggleProviderSelection: (provider) =>
    set((state) => {
      console.log(provider);
      // return selected}
      const selected = state.selectedProviders.some(
        (sp) => sp._id === provider._id,
      )
        ? state.selectedProviders.filter((sp) => sp._id !== provider._id)
        : [...state.selectedProviders, provider];

      return { ...state, selectedProviders: selected };
    }),
});
