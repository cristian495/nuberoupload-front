import { MediaFolder } from "../MediaFolder";
import { MediaFile } from "../MediaFile";

export interface FetchFolderByIdResponse {
  files: MediaFile[];
  folder: MediaFolder;
}
