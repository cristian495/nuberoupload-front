import { Suspense } from "react"
import Sidebar from "@/components/sidebar"
import UploadFolder from "@/components/upload-folder"
import { HomeIcon, SearchIcon as SearchIconLucide, PlusSquareIcon, HeartIcon, UserIcon } from "lucide-react"

export default function UploadPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - visible on desktop, hidden on mobile */}
      <div className="hidden md:block w-20 lg:w-64 border-r min-h-screen">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="p-4 md:p-6">
          <Suspense fallback={<div>Cargando...</div>}>
            <UploadFolder />
          </Suspense>
        </div>
      </div>

      {/* Barra de navegación inferior para móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white flex justify-around items-center p-3 z-10">
        <HomeIcon className="h-6 w-6" />
        <SearchIconLucide className="h-6 w-6" />
        <PlusSquareIcon className="h-6 w-6" />
        <HeartIcon className="h-6 w-6" />
        <UserIcon className="h-6 w-6" />
      </div>
    </div>
  )
}
