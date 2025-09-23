import { PassThrough, Readable } from 'stream';

import { DownloadFileOptions, FileInfo, StorageStats } from '../types';

/**
 * Interface representing a storage service.
 * This interface should be implemented by any storage service.
 */
export interface IBaseStorageService {
  /**
   * Deletes a file from the storage.
   * @param query Information about the file to be deleted.
   * @returns A promise that resolves when the file is successfully deleted.
   */
  delete(query: Omit<FileInfo, 'mimeType'>): Promise<void>;

  /**
   * Downloads a file from the storage.
   * @param query Information about the file to be downloaded.
   * @param options Additional options to download the file.
   * @returns A readable stream representing the downloaded file or null if file doesn't exist.
   */
  download(
    query: Omit<FileInfo, 'mimeType'>,
    options?: DownloadFileOptions,
  ): Promise<Readable | null>;

  /**
   * Retrieves stats from the storage.
   * @returns {Promise<StorageStats>} A promise resolving to an object with stats.
   */
  stats(): Promise<StorageStats>;

  /**
   * Uploads a file to the storage.
   * @param file The buffer containing the file to be uploaded.
   * @param info Information about the file being uploaded.
   * @returns An object with the status of the upload operation.
   */
  upload(
    file: Buffer,
    info: Pick<FileInfo, 'directoryName' | 'filePath' | 'mimeType'>,
  ): Promise<{ status: boolean }>;

  /**
   * Uploads a file stream to the storage.
   * @param file The stream containing the file to be uploaded.
   * @param info Information about the file being uploaded.
   * @returns An object with the status of the upload operation.
   */
  uploadStream(
    file: Readable | PassThrough,
    info: FileInfo,
  ): Promise<{ status: boolean }>;
}
