import { MediaFolder } from "@/types/MediaFolder";
import { MediaFile } from "@/types/MediaFile";
import { StorageProvider } from "@/types/StorageProvider";
import { apiClient } from "./api-client";

// Usar el cliente base compartido
export const api = apiClient;

export async function fetchFolders(): Promise<MediaFolder[]> {
  const res = await api.get("/files/folders");
  console.log(res.data);
  return res.data;
}

export async function fetchFolderById(id: string): Promise<MediaFolder> {
  const res = await api.get(`/media/folders/${id}`);
  console.log(res.data);
  return res.data;
}

export async function fetchFolderFiles(
  id: string,
  type?: "image" | "video"
): Promise<MediaFile[]> {
  const res = await api.get(`/media/folders/${id}/files`, {
    params: {
      type,
    },
  });
  console.log("fetchFolderFiles", res.data);
  return res.data;
}

export async function fetchAvailableProviders(): Promise<StorageProvider[]> {
  const res = await api.get(`/storage-providers/`, {});
  console.log("fetchAvailableProviders", res.data);
  return res.data;
}

export async function generateUploadIdReq(): Promise<string> {
  const res = await api.get(`/media/upload-id`);
  console.log("generateUploadId", res.data);
  return res.data;
}

interface UploadFileToServerOptions {
  file: File;
  folderName: string;
  uploadId: string;
  selectedProviders: StorageProvider[];
  onProgress?: (percent: number) => void;
}

export async function uploadFileToServerReq({
  file,
  folderName,
  uploadId,
  selectedProviders,
  onProgress,
}: UploadFileToServerOptions): Promise<void> {
  const form = new FormData();
  form.append("file", file);
  form.append("folderName", folderName);
  form.append("uploadId", uploadId);
  for (let i = 0; i < selectedProviders.length; i++) {
    form.append(`providerIds[${i}]`, selectedProviders[i]._id);
  }

  await api.post("/uploads/media", form, {
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress?.(percent);
    },
  });
}
