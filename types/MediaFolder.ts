export interface MediaFolder {
  _id: string;
  name: string;
  imageCount: number;
  videoCount: number;
  count: number;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}
