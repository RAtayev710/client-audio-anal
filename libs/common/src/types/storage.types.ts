export type FileInfo = {
  directoryName: string;
  filePath: string;
  mimeType: string;
  name: string;
};

export type ByteRange = { end?: number; start?: number; unit: string };

export type DownloadFileOptions = { range?: ByteRange };

export type StorageStats = { space: { free: number; total: number } };
