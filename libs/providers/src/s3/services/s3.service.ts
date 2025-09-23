import { PassThrough, Readable } from 'stream';

import {
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { IBaseStorageService } from '@lib/common/interfaces';
import { DownloadFileOptions, FileInfo, StorageStats } from '@lib/common/types';
import { S3Config } from '@lib/config';
import { ServiceCore } from '@lib/core';

import { S3ClientConfig } from '../s3.enums';

/**
 * Service for interacting with AWS S3 (Simple Storage Service).
 * Implements the IBaseStorageService interface.
 */
export class S3Service extends ServiceCore implements IBaseStorageService {
  /**
   * Name of the S3 bucket.
   */
  private readonly bucketName: string;
  /**
   * AWS S3 client instance.
   */
  private readonly client: S3Client;

  /**
   * Constructs an instance of S3Service.
   * @param {ConfigType<typeof S3Config>} s3Config Configuration for AWS S3.
   */
  constructor(
    @Inject(S3Config.KEY)
    private readonly s3Config: ConfigType<typeof S3Config>,
  ) {
    super();

    this.bucketName = s3Config.bucketName;

    this.client = new S3Client({
      ...(this.s3Config.region && { region: this.s3Config.region }),
      ...(this.s3Config.endpoint && { endpoint: this.s3Config.endpoint }),
      credentials: {
        accessKeyId: this.s3Config.accessKey,
        secretAccessKey: this.s3Config.secretKey,
      },
      ...(this.s3Config.client === S3ClientConfig.MINIO && {
        forcePathStyle: true,
      }),
    });
  }

  /**
   * Deletes a file from the S3 bucket.
   * @param {Pick<FileInfo, 'directoryName' | 'filePath' | 'name'>} data Information about the file to be deleted.
   * @returns {Promise<void>} A promise that resolves when the file is successfully deleted.
   * @throws {Error} If an error occurs during the deletion process.
   */
  async delete(data: Omit<FileInfo, 'mimeType'>): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: this.generateKey(data),
        }),
      );
    } catch (err) {
      this.handleError(err, 'delete', data);

      throw new Error('S3 сервис недоступен.');
    }
  }

  /**
   * Downloads a file from the S3 bucket.
   * @param {Pick<FileInfo, 'directoryName' | 'filePath' | 'name'>} data Information about the file to be downloaded.
   * @param {DownloadFileOptions} [options] Additional options to download the file.
   * @returns {Promise<Readable>} A promise resolving to a readable stream representing the downloaded file or null if file doesn't exist.
   * @throws {Error} If an error occurs during the download process.
   */
  async download(
    data: Omit<FileInfo, 'mimeType'>,
    options?: DownloadFileOptions,
  ): Promise<Readable | null> {
    try {
      const command: GetObjectCommandInput = {
        Bucket: this.bucketName,
        Key: this.generateKey(data),
      };

      if (
        options?.range &&
        (options.range.start != null || options.range.end != null)
      )
        command.Range = `${options.range.unit}=${options.range.start ?? ''}-${
          options.range.end ?? ''
        }`;

      const response = await this.client.send(new GetObjectCommand(command));

      const body = response.Body;

      return body ? (body as Readable) : null;
    } catch (err) {
      this.handleError(err, 'download', data);

      throw new Error('S3 сервис недоступен.');
    }
  }

  /**
   * Retrieves stats from the S3 storage.
   * @returns {Promise<StorageStats>} A promise resolving to an object with stats.
   * @throws {Error} If an error occurs during the stats retrieving process.
   */
  async stats(): Promise<StorageStats> {
    try {
      const metrics = await (
        await fetch(`${this.s3Config.endpoint}/minio/v2/metrics/cluster`)
      ).text();

      const totalBytesMetric = metrics.match(
        /minio_cluster_capacity_usable_total_bytes.* (\d+.*)/,
      );
      const freeBytesMetric = metrics.match(
        /minio_cluster_capacity_usable_free_bytes.* (\d+.*)/,
      );

      if (totalBytesMetric && freeBytesMetric) {
        const total = Number(totalBytesMetric[1]);
        const free = Number(freeBytesMetric[1]);

        return { space: { free, total } };
      } else throw new Error('Метрики хранилища не найдены или невалидны.');
    } catch (err: unknown) {
      this.handleError(err, 'stats');

      throw new Error('S3 сервис недоступен.');
    }
  }

  /**
   * Uploads a file to the S3 bucket.
   * @param {Buffer} file The buffer containing the file to be uploaded.
   * @param {Pick<FileInfo, 'directoryName' | 'filePath' | 'mimeType'>} info Information about the file being uploaded.
   * @returns {Promise<{ status: boolean }>} A promise resolving to an object with the status of the upload operation.
   * @throws {Error} If an error occurs during the upload process.
   */
  async upload(
    file: Buffer,
    info: Pick<FileInfo, 'directoryName' | 'filePath' | 'mimeType'>,
  ): Promise<{ status: boolean }> {
    const { filePath, directoryName, mimeType } = info;
    const upload = new Upload({
      client: this.client,
      params: {
        Key: this.generateKey({ filePath, directoryName }),
        Bucket: this.bucketName,
        Body: file,
        ContentType: mimeType,
      },
    });

    try {
      await upload.done();

      return { status: true };
    } catch (err: unknown) {
      this.handleError(err, 'upload', info);

      throw new Error('S3 сервис недоступен.');
    }
  }

  /**
   * Uploads a file stream to the S3 bucket.
   * @param {Readable | PassThrough} file The stream containing the file to be uploaded.
   * @param {FileInfo} info Information about the file being uploaded.
   * @returns {Promise<{ status: boolean }>} A promise resolving to an object with the status of the upload operation.
   * @throws {Error} If an error occurs during the upload process.
   */
  async uploadStream(
    file: Readable | PassThrough,
    info: FileInfo,
  ): Promise<{ status: boolean }> {
    const { filePath, directoryName, mimeType } = info;
    const upload = new Upload({
      client: this.client,
      params: {
        Key: this.generateKey({ filePath, directoryName }),
        Bucket: this.bucketName,
        Body: file,
        ContentType: mimeType,
      },
    });

    try {
      await upload.done();

      return { status: true };
    } catch (err) {
      this.handleError(err, 'uploadStream', info);

      throw new Error('S3 сервис недоступен.');
    }
  }

  /**
   * Generates a key for the S3 object based on file information.
   * @param {Pick<FileInfo, 'directoryName' | 'filePath'>} data Information about the file.
   * @returns {string} The generated key for the S3 object.
   */
  private generateKey(
    data: Pick<FileInfo, 'directoryName' | 'filePath'>,
  ): string {
    return data?.filePath
      ? `${data?.directoryName || ''}/${data.filePath}`
      : '';
  }
}
