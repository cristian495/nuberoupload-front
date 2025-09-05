import { useBoundStore } from "@/stores/use-bound-store";
import { UploadStatus } from "@/types/UploadStatus";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useUploadProgress(
  serverFileId: string,
  onProgress: (
    providerId: string,
    progress: number,
    status: UploadStatus
  ) => void
) {
  const updateProviderProgress = useBoundStore((s) => s.updateProviderProgress);
  
  useEffect(() => {
    console.log("1 useUploadProgress",  serverFileId);
    if (!serverFileId) return;
    
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_URL!, {
        transports: ["websocket"],
      });
    }

    const handler = (data: any) => {
      console.log("2 useUploadProgress", data, serverFileId);
      if (data.fileId !== serverFileId) return;

      const {
        providerId,
        progress = 0,
        status,
        error,
      }: {
        providerId: string;
        progress: number;
        status: UploadStatus;
        error?: string;
      } = data;

      updateProviderProgress(serverFileId, providerId, status, progress, error);
    };

    socket.on("upload-progress", handler);

    return () => {
      socket?.off("upload-progress", handler);
    };
  }, [serverFileId]);
}
