import { useBoundStore } from "@/stores/use-bound-store";
import { useQuery } from "@tanstack/react-query";
import { fetchFolders } from "@/lib/api";
import React from "react";

export function useFetchFolders() {
  const setFolders = useBoundStore((s) => s.setFolders);
  const setIsLoading = useBoundStore((s) => s.setIsLoading);
  const setIsError = useBoundStore((s) => s.setIsError);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });

  React.useEffect(() => {
    setIsLoading(isLoading);
    setIsError(isError, error?.message);
    if (data) setFolders(data);
  }, [isLoading, isError, error, data]);
}