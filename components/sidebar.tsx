import {
  // FolderIcon,
  HomeIcon,
  // ImageIcon,
  // VideoIcon,
  SearchIcon,
  // PlusSquareIcon,
  FolderUpIcon,
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

// Datos de ejemplo para carpetas
// const folders: {
//   id: string;
//   name: string;
// } = [];

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col py-6">
      <div className="text-xl font-bold mb-10 px-4">NuberoUpload</div>

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
        </nav>
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
