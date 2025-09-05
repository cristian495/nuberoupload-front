import { fetchAvailableProviders } from "@/lib/api";
import { providersService } from "@/lib/providers-api";
import { queryKeys } from "@/lib/query-keys";
import { useBoundStore } from "@/stores/use-bound-store";
import { StorageProvider } from "@/types/StorageProvider";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function useFetchAvailableProviders() {
  const setAvailableProviders = useBoundStore((s) => s.setAvailableProviders);
  const setIsLoading = useBoundStore((s) => s.setIsLoading);
  const setIsError = useBoundStore((s) => s.setIsError);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.availableProviders(),
    queryFn: () => providersService.getStorageProviders(),
  });

  React.useEffect(() => {
    setIsLoading(isLoading);
    setIsError(isError, error?.message);
    if (data) setAvailableProviders(data);
  }, [isLoading, isError, error, data]);
}
