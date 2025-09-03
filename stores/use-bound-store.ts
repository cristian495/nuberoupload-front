// stores/useBoundStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { createMediaSlice, MediaSlice } from "./slices/media-slice";
import { createUploadSlice, UploadSlice } from "./slices/upload-slice";
import { createAuthSlice, AuthSlice } from "./slices/auth-slice";

type AppState = MediaSlice & UploadSlice & AuthSlice

export const useBoundStore = create<AppState>()(
  devtools(
    persist(
      (...a) => ({
        ...createMediaSlice(...a),
        ...createUploadSlice(...a),
        ...createAuthSlice(...a),
      }),
      {
        name: 'nuberoupload-storage',
        partialize: (state) => ({
          // Solo persistir datos del auth (el token se guarda por separado en localStorage)
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'nuberoupload-store',
    }
  )
);
