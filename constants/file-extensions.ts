import {
  Cloud,
  HardDrive,
  Server,
  Database,
  Globe,
  Folder,
  FileImage,
  Video,
  Music,
  FileText,
  Archive,
  Upload,
  Download,
  Settings,
  LucideIcon,
  FileVideo,
  FileAudio,
  VideoIcon,
} from "lucide-react";

export enum FileCategory {
  IMAGE = "image",
  VIDEO = "video",
  DOCUMENT = "document",
  AUDIO = "audio",
}

export const FILE_EXTENSIONS = {
  [FileCategory.IMAGE]: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp",
    ".svg",
  ],
  [FileCategory.VIDEO]: [
    ".mp4",
    ".avi",
    ".mov",
    ".mkv",
    ".wmv",
    ".flv",
    ".webm",
  ],
  [FileCategory.DOCUMENT]: [".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt"],
  [FileCategory.AUDIO]: [".mp3", ".wav", ".flac", ".aac", ".ogg", ".wma"],
} as const;

export const ALL_SUPPORTED_EXTENSIONS = [
  ...FILE_EXTENSIONS.image,
  ...FILE_EXTENSIONS.video,
  ...FILE_EXTENSIONS.document,
  ...FILE_EXTENSIONS.audio,
];

export type FileExtension = (typeof ALL_SUPPORTED_EXTENSIONS)[number];

// Función para determinar las capacidades basadas en extensiones soportadas
export function getProviderCapabilities(
  supportedExtensions: string[],
): FileCategory[] {
  const capabilities: FileCategory[] = [];

  const hasImageSupport = supportedExtensions.some((ext) =>
    FILE_EXTENSIONS[FileCategory.IMAGE].includes(ext),
  );

  const hasVideoSupport = supportedExtensions.some((ext) =>
    FILE_EXTENSIONS[FileCategory.VIDEO].includes(ext),
  );

  const hasDocumentSupport = supportedExtensions.some((ext) =>
    FILE_EXTENSIONS[FileCategory.DOCUMENT].includes(ext),
  );

  const hasAudioSupport = supportedExtensions.some((ext) =>
    FILE_EXTENSIONS[FileCategory.AUDIO].includes(ext),
  );

  if (hasImageSupport) capabilities.push(FileCategory.IMAGE);
  if (hasVideoSupport) capabilities.push(FileCategory.VIDEO);
  if (hasDocumentSupport) capabilities.push(FileCategory.DOCUMENT);
  if (hasAudioSupport) capabilities.push(FileCategory.AUDIO);

  return capabilities;
}

// Iconos para cada categoría
export const CATEGORY_ICONS = {
  [FileCategory.IMAGE]: FileImage,
  [FileCategory.VIDEO]: VideoIcon,
  [FileCategory.DOCUMENT]: FileText,
  [FileCategory.AUDIO]: FileAudio,
} as const;

// Colores para cada categoría
export const CATEGORY_COLORS = {
  [FileCategory.IMAGE]:
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  [FileCategory.DOCUMENT]:
    "bg-amber-100 text-amber-800 dark:bg-blue-900 dark:text-blue-100",
  [FileCategory.AUDIO]:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  [FileCategory.VIDEO]:
    "bg-orange-100 text-orange-800  dark:bg-orange-900 dark:text-orange-100",
} as const;

// Iconos de proveedores basados en código
export const PROVIDER_ICONS: Record<string, LucideIcon> = {
  // Proveedores en la nube
  "aws-s3": Cloud,
  "storj": Cloud,
  "google-drive": Globe,
  dropbox: Cloud,
  onedrive: Cloud,
  mega: Cloud,
  box: Archive,

  // Servicios de video/streaming
  doodstream: Video,
  streamtape: Video,
  mixdrop: Video,
  upstream: Video,
  videobin: Video,
  streamwish: Video,

  // Servicios de archivos generales
  mediafire: Folder,
  zippyshare: Archive,
  rapidgator: Download,
  uploaded: Upload,
  "4shared": Folder,
  turbobit: Archive,

  // Servidores locales/FTP
  ftp: Server,
  sftp: Server,
  local: HardDrive,
  nas: Database,
  ssh: Server,

  // Otros servicios
  imgur: FileImage,
  flickr: FileImage,
  soundcloud: Music,
  "archive-org": Archive,

  // Fallback
  default: Settings,
} as const;

// Función para obtener el icono del proveedor
export function getProviderIcon(providerCode: string): LucideIcon {
  const normalizedCode = providerCode.toLowerCase();
  return PROVIDER_ICONS[normalizedCode] || PROVIDER_ICONS.default;
}

// Función para obtener el nombre legible del proveedor
export function getProviderDisplayName(providerCode: string): string {
  const displayNames: Record<string, string> = {
    "aws-s3": "Amazon S3",
    "google-drive": "Google Drive",
    dropbox: "Dropbox",
    onedrive: "OneDrive",
    mega: "MEGA",
    box: "Box",
    doodstream: "DoodStream",
    streamtape: "StreamTape",
    mixdrop: "MixDrop",
    upstream: "UpStream",
    videobin: "VideoBin",
    streamwish: "StreamWish",
    mediafire: "MediaFire",
    zippyshare: "ZippyShare",
    rapidgator: "RapidGator",
    uploaded: "Uploaded",
    "4shared": "4shared",
    turbobit: "TurboBit",
    ftp: "FTP Server",
    sftp: "SFTP Server",
    local: "Local Storage",
    nas: "NAS Server",
    ssh: "SSH Server",
    imgur: "Imgur",
    flickr: "Flickr",
    soundcloud: "SoundCloud",
    "archive-org": "Internet Archive",
  };

  return displayNames[providerCode.toLowerCase()] || providerCode;
}
