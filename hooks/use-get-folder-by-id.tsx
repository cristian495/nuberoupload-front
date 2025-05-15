import { fetchFolderById } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { useBoundStore } from "@/stores/use-bound-store";
import { MediaFolder } from "@/types/MediaFolder";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useFetchFolderById(folderId: string) {
  // console.log("useFetchFolderById", { folderId });
  // const setSelectedFolder = useBoundStore((s) => s.setSelectedFolder);
  // const setIsLoading = useBoundStore((s) => s.setIsLoading);
  // const setIsError = useBoundStore((s) => s.setIsError);

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["folderDetail", folderId],
  //   queryFn: () => fetchFolderById(folderId),
  //   enabled: !!folderId,
  // });

  // React.useEffect(() => {
  //   console.log({isLoading, isError, data})
  //   setIsLoading(isLoading);
  //   setIsError(isError, error?.message);
  //   if (data) setSelectedFolder(data);
  // }, [isLoading, isError, error, data]);

  return useQuery({
    queryKey: queryKeys.folder(folderId),
    queryFn: () => fetchFolderById(folderId),
    enabled: !!folderId,
  });
}
