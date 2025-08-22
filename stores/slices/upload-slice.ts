import { MediaFile, MediaFolder, StorageProvider } from "@/types";
import { UploadStatus } from "@/types/UploadStatus";
import { StateCreator } from "zustand";

interface ProviderProgress {
  [provider: string]: {
    progress: number;
    status: UploadStatus;
  };
}

export interface UploadFile {
  id: string;
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
  providerProgress: Record<string, { progress: number; status: UploadStatus }>;
  uploadId?: string;
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
    uploadId: string,
    progress: number,
    status: UploadStatus
  ) => void;
  updateProviderProgress: (
    uploadId: string,
    providerId: string,
    status: ProviderProgress[string]["status"],
    progress: number
  ) => void;
  updateFileUploadId: (id: string, uploadId: string) => void;
  toggleFileExpanded: (id: string) => void;
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
  updateFileProgress: (uploadId, progress, status) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.uploadId === uploadId ? { ...f, progress, status: status } : f
      ),
    })),
  updateProviderProgress: (uploadId, providerId, status, progress) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.uploadId === uploadId
          ? {
              ...f,
              providerProgress: {
                ...f.providerProgress,
                [providerId]: { progress, status },
              },
            }
          : f
      ),
    })),
  updateFileUploadId: (id: string, uploadId: string) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.id === id ? { ...f, uploadId } : f
      ),
    })),
  toggleFileExpanded: (id) =>
    set((s) => ({
      uploadFiles: s.uploadFiles.map((f) =>
        f.id === id ? { ...f, expanded: !f.expanded } : f
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
      console.log(provider)
      // return selected}
      const selected = state.selectedProviders.some(
        (sp) => sp._id === provider._id
      )
        ? state.selectedProviders.filter((sp) => sp._id !== provider._id)
        : [...state.selectedProviders, provider];

      return { ...state, selectedProviders: selected };
    }),
});
