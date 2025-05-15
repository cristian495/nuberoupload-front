export const queryKeys = {
  folders: () => ["folders"] as const,

  folder: (id: string) => ["folder", id] as const,

  folderFiles: (id: string, type?: "image" | "video" | "all") =>
    ["folder-files", id, { type }] as const,

  uploadStatus: (uploadId: string) => ["upload-status", uploadId] as const,

  storageProviders: () => ["storage-providers"] as const,

  mediaById: (mediaId: string) => ["media", mediaId] as const,

  availableProviders: () => ["available-providers"] as const,
};
