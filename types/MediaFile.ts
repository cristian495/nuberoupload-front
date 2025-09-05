import { StorageProvidersCodes } from "./storage-providers-codes";

export interface MediaFile {
  _id: string;
  uploadId: string;
  originalName: string;
  folderId: string;
  uploads: [
    {
      providerCode: StorageProvidersCodes;
      url: string;
      thumbnail: string;
      providerId: string;
    }
  ];
  category: "image" | "video";
  status: "completed" | "pending" | "failed";
  createdAt: string;
  updatedAt: string;
}
