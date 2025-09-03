"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/common/theme-provider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* <FolderProvider> */}
          {children}
          {/*  ← Deja el Toaster *dentro* del ToastProvider *después* de los hijos */}
          <Toaster />
        {/* </FolderProvider> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
