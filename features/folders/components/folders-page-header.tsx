import { FolderIcon, ImageIcon, VideoIcon } from "lucide-react";
import SectionHeader from "@/components/layout/section-header";

interface FoldersPageHeaderProps {
  totalFolders: number;
  totalImages: number;
  totalVideos: number;
}

export function FoldersPageHeader({ 
  totalFolders, 
  totalImages, 
  totalVideos 
}: FoldersPageHeaderProps) {
  const statsSubtitle = (
    <div className="flex items-center gap-6 mt-2">
      <div className="flex items-center gap-2 text-sm">
        <FolderIcon className="h-4 w-4 text-blue-500" />
        <span className="font-medium">{totalFolders}</span>
        <span className="text-muted-foreground">carpetas</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <ImageIcon className="h-4 w-4 text-green-500" />
        <span className="font-medium">{totalImages}</span>
        <span className="text-muted-foreground">imágenes</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <VideoIcon className="h-4 w-4 text-purple-500" />
        <span className="font-medium">{totalVideos}</span>
        <span className="text-muted-foreground">videos</span>
      </div>
    </div>
  );

  return (
    <SectionHeader
      title="Mis Carpetas"
      description="Explora y gestiona todas tus carpetas de medios subidos"
      subtitle={statsSubtitle}
    />
  );
}