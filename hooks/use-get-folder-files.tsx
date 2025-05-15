import { fetchFolderFiles } from "@/lib/api";
import { MediaFile } from "@/types/MediaFile";
import { useQuery } from "@tanstack/react-query";

// export function useGetFolderFiles(
//   folderId: string,
//   type: "image" | "video" | "all"
// ) {
//   const {
//     data: files,
//     isLoading,
//     isError,
//   } = useQuery<MediaFile[]>({
//     queryKey: ["files", folderId],
//     queryFn: () => fetchFolderFiles(folderId, type == "all" ? undefined : type),
//     enabled: !!folderId,
//     staleTime: 5 * 60 * 1000, // 5 minutos
//   });
//   return {
//     files,
//     isLoading,
//     isError,
//   };
// }

import { useBoundStore } from "@/stores/use-bound-store";
import React from "react";

export function useFetchFolderFiles(
  folderId: string,
  type: "image" | "video" | "all"
) {
  console.log("useFetchFolderFiles");
  const setFiles = useBoundStore((s) => s.setFiles);
  const setIsLoading = useBoundStore((s) => s.setIsLoading);
  const setIsError = useBoundStore((s) => s.setIsError);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => fetchFolderFiles(folderId, type == "all" ? undefined : type),
  });

  React.useEffect(() => {
    setIsLoading(isLoading);
    setIsError(isError, error?.message);
    if (data) setFiles(data);
  }, [isLoading, isError, error, data]);
  // return useQuery<MediaFile[]>({
  //   queryKey: ["files", folderId],
  //   enabled: !!folderId,
  //   queryFn: () => fetchFolderFiles(folderId, type == "all" ? undefined : type),
  // });
}
