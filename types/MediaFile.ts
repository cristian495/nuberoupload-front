export interface MediaFile {
  _id: string;
  uploadId: string;
  originalName: string;
  folderId: string;
  providers: [
    {
      provider: "doodstream" | "cloudinary";
      url: string;
      thumbnail: string;
      _id: string;
    }
  ];
  type: "image" | "video";
  status: "completed" | "pending" | "failed";
  createdAt: string;
  updatedAt: string;
}
