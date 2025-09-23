/**
 * Utility class for file-related operations.
 */
export class FileUtil {
  /**
   * Generates the full URL of a file stored in an S3 bucket.
   * @param {string} filePath - The file path within the directory.
   * @returns {string} The full URL of the file.
   */
  static getFullFileUrl(filePath: string): string {
    const baseUrl = process.env.S3_BASE_URL || '';
    const bucket = process.env.S3_BUCKET_NAME || '';

    if (baseUrl) return `${baseUrl}/${bucket}/${filePath}`;

    return '';
  }

  static getLocalFullFileUrl(filePath: string): string {
    const baseUrl = process.env.S3_ENDPOINT || '';
    const bucket = process.env.S3_BUCKET_NAME || '';

    if (baseUrl) return `${baseUrl}/${bucket}/${filePath}`;

    return '';
  }
}
