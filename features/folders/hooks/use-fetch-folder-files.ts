import { useQuery } from '@tanstack/react-query';
import { filesService } from '@/lib/files-api';
import { MediaFile } from '@/types';

export const useFetchFolderFiles = (folderId: string) => {
  return useQuery({
    queryKey: ['folder-files', folderId],
    queryFn: () => filesService.getFolderFiles(folderId),
    enabled: !!folderId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};