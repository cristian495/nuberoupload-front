"use client";
import {
  // FolderIcon,
  HomeIcon,
  // ImageIcon,
  // VideoIcon,
  SearchIcon,
  // PlusSquareIcon,
  FolderUpIcon,
  Palette,
  LogOut,
  Server,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { useBoundStore } from "@/stores/use-bound-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Datos de ejemplo para carpetas
// const folders: {
//   id: string;
//   name: string;
// } = [];

export default function Sidebar() {
  const { user, logout } = useBoundStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-full flex flex-col py-6">
      <div className="flex items-center justify-between mb-10 px-4">
        <div className="text-xl font-bold">NuberoUpload</div>
        <ThemeToggle />
      </div>

      {/* User Info */}
      {user && (
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 lg:block hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )}

      <TooltipProvider delayDuration={300}>
        <nav className="space-y-1 mb-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-4 lg:inline hidden">Inicio</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Inicio</TooltipContent>
          </Tooltip>

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                  <SearchIcon className="h-6 w-6" />
                  <span className="ml-4 lg:inline hidden">Buscar</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Buscar</TooltipContent>
          </Tooltip> */}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/upload">
                  <FolderUpIcon className="h-6 w-6" />
                  <span className="ml-4 lg:inline hidden">Subir Carpeta</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Subir Carpeta</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/providers">
                  <Server className="h-6 w-6" />
                  <span className="ml-4 lg:inline hidden">Proveedores</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Proveedores de Almacenamiento
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/design-system">
                  <Palette className="h-6 w-6" />
                  <span className="ml-4 lg:inline hidden">Design System</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Sistema de Diseño</TooltipContent>
          </Tooltip>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto px-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-6 w-6" />
                <span className="ml-4 lg:inline hidden">Cerrar Sesión</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Cerrar Sesión</TooltipContent>
          </Tooltip>
        </div>
        {/* 
        <div className="font-medium text-sm text-muted-foreground mb-2 px-4 lg:block hidden">
          Carpetas
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 pr-2 px-4">
            {folders.map((folder) => (
              <Tooltip key={folder.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <Link href={`/folder/${folder.id}`}>
                      <FolderIcon className="h-5 w-5 flex-shrink-0" />
                      <span className="ml-2 truncate lg:inline hidden">
                        {folder.name}
                      </span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden block">
                  {folder.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </ScrollArea> */}
      </TooltipProvider>
    </div>
  );
}
