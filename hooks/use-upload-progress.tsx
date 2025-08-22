import { useBoundStore } from "@/stores/use-bound-store";
import { UploadStatus } from "@/types/UploadStatus";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useUploadProgress(
  uploadId: string,
  onProgress: (
    providerId: string,
    progress: number,
    status: UploadStatus
  ) => void
) {
  const updateProviderProgress = useBoundStore((s) => s.updateProviderProgress);

  useEffect(() => {
    if (!uploadId) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_URL!, {
        transports: ["websocket"],
      });
    }

    const handler = (data: any) => {
      if (data.uploadId !== uploadId) return;

      const {
        providerId,
        progress = 0,
        status,
      }: {
        providerId: string;
        progress: number;
        status: UploadStatus;
      } = data;

      updateProviderProgress(uploadId, providerId, status, progress);
    };

    socket.on("upload-progress", handler);

    return () => {
      socket?.off("upload-progress");
    };
  }, [uploadId]);
}
