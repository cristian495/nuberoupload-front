// stores/useBoundStore.ts
import { create } from "zustand";
import { createMediaSlice, MediaSlice } from "./slices/media-slice";
// import { createUploadSlice, UploadSlice } from './slices/upload-slice'; // futuro

type AppState = MediaSlice; // | UploadSlice | AuthSlice | ...

export const useBoundStore = create<AppState>()((...a) => ({
  ...createMediaSlice(...a),
  // ...createUploadSlice(...a),
}));
