import { MediaFolder } from "@/types/MediaFolder";
import { MediaFile } from "@/types/MediaFile";
import { StorageProvider } from "@/types/StorageProvider";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function fetchFolders(): Promise<MediaFolder[]> {
  const res = await api.get("/media/folders");
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
  const res: any = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: "1",
            name: "Google Drive",
            icon: "/images/google-drive.png",
          },
          {
            id: "2",
            name: "Dropbox",
            icon: "/images/dropbox.png",
          },
          {
            id: "3",
            name: "OneDrive",
            icon: "/images/onedrive.png",
          },
        ],
      });
    });
  });
  return res.data;
}
