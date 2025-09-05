import { StorageProvider } from "../StorageProvider";

export interface UploadFileData {
  file: File;
  folderName: string;
  selectedProviders: StorageProvider[];
  onProgress?: (percent: number) => void;
}
