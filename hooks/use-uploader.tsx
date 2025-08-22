import { useMutation } from "@tanstack/react-query";
import { generateUploadIdReq, uploadFileToServerReq } from "@/lib/api";
import { useUploadProgress } from "./use-upload-progress";
import { useBoundStore } from "@/stores/use-bound-store";
import { UploadStatus } from "@/types/UploadStatus";
import { UploadFile } from "@/stores/slices/upload-slice";
import { StorageProvider } from "@/types";

export function useUploader() {
  const updateFileProgress = useBoundStore((s) => s.updateFileProgress);
  const updateProviderProgress = useBoundStore((s) => s.updateProviderProgress);
  const updateFileUploadId = useBoundStore((s) => s.updateFileUploadId);
  //   const markCompleted = useBoundStore((s) => s.markCompleted);

  const generateUploadId = useMutation({
    mutationFn: generateUploadIdReq,
  });

  const upload = async (
    file: UploadFile,
    folderName: string,
    selectedProviders: StorageProvider[]
  ) => {
    const uploadId = await generateUploadIdReq();
    updateFileUploadId(file.id, uploadId);
    try {
      await uploadFileToServerReq({
        file: file.file,
        folderName,
        uploadId,
        selectedProviders,
        onProgress: (percent) => {
          console.log("percent", percent);
          let status = UploadStatus.uploading;

          if (percent >= 100) {
            status = UploadStatus.completed;
          }

          updateFileProgress(uploadId, percent, status);
        },
      });
    } catch (error) {
      console.error(error);
      updateFileProgress(uploadId, 0, UploadStatus.error);
    }

    // markCompleted(id);
  };

  return { upload };
}
