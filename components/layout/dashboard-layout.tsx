"use client";

import {
  HomeIcon,
  SearchIcon as SearchIconLucide,
  PlusSquareIcon,
  HeartIcon,
  UserIcon,
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - visible on desktop, hidden on mobile */}
      <div className="hidden md:block w-20 lg:w-64 border-r border-border min-h-screen bg-sidebar">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto p-4 md:p-6 sm:p-2">
          {children}
        </div>
      </div>

      {/* Barra de navegación inferior para móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background flex justify-around items-center p-3 z-10">
        <HomeIcon className="h-6 w-6 text-foreground" />
        <SearchIconLucide className="h-6 w-6 text-foreground" />
        <PlusSquareIcon className="h-6 w-6 text-foreground" />
        <HeartIcon className="h-6 w-6 text-foreground" />
        <UserIcon className="h-6 w-6 text-foreground" />
      </div>
    </div>
  );
}