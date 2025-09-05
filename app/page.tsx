"use client";
import { Suspense } from "react";
import { Search } from "@/components/common/search";
import { Skeleton } from "@/components/ui/skeleton";
import { useBoundStore } from "@/stores/use-bound-store";
import DashboardLayout from "@/components/layout/dashboard-layout";
import SectionHeader from "@/components/layout/section-header";
import FoldersPage from "./folders/page";

export default function Home() {
  return <FoldersPage />;
}

function FolderSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-md" />
      ))}
    </div>
  );
}

function Header() {
  const folders = useBoundStore((s) => s.folders);
  const folderCount = folders.length;
  const fileCount = folders.reduce((acc, folder) => acc + folder.totalFiles, 0);

  const statsSubtitle = (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div>
        <span className="font-semibold text-foreground">{folderCount}</span>{" "}
        carpetas
      </div>
      <div>
        <span className="font-semibold text-foreground">{fileCount}</span>{" "}
        archivos
      </div>
    </div>
  );

  return (
    <SectionHeader
      title="Mis Colecciones"
      subtitle={statsSubtitle}
      action={<Search />}
      className="hidden md:flex"
    />
  );
}
