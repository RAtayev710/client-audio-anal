import crypto from 'crypto';

/**
 * Utility class for hashing, encryption, and decryption operations.
 */
export class HashUtil {
  /**
   * Decrypts data using a private key.
   * @param {string} privateKey - The private key for decryption.
   * @param {string} data - The data to decrypt.
   * @returns {Promise<string>} A promise that resolves to the decrypted data.
   */
  static decryptData(privateKey: string, data: string): Promise<string> {
    return new Promise<string>((resolve) =>
      resolve(
        crypto
          .privateDecrypt(privateKey, Buffer.from(data, 'hex'))
          .toString('utf8'),
      ),
    );
  }

  /**
   * Encrypts data using a public key.
   * @param {string} publicKey - The public key for encryption.
   * @param {string} data - The data to encrypt.
   * @returns {Promise<string>} A promise that resolves to the encrypted data.
   */
  static encryptData(publicKey: string, data: string): Promise<string> {
    return new Promise<string>((resolve) =>
      resolve(
        crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('hex'),
      ),
    );
  }

  /**
   * Generates a hash of the given string using the specified algorithm.
   * @param {string} str - The string to hash.
   * @param {'md5'} [algo='md5'] - The hash algorithm to use. Default is 'md5'.
   * @returns {string} The generated hash.
   */
  static generateHash(str: string, algo: 'md5' = 'md5'): string {
    return crypto.createHash(algo).update(str).digest('hex');
  }

  /**
   * Generates a RSA key pair.
   * @returns {Promise<{ privateKey: string; publicKey: string }>} A promise that resolves to an object containing the generated private and public keys.
   */
  static generateRSAKeyPair(): Promise<{
    privateKey: string;
    publicKey: string;
  }> {
    return new Promise<{ privateKey: string; publicKey: string }>(
      (resolve, reject) => {
        const modulusLength = 2048; // The size of the key modulus in bits
        const keyEncoding = {
          type: 'pkcs1', // The type of encoding for the public key
          format: 'pem', // The output format
        } as const;

        return crypto.generateKeyPair(
          'rsa',
          {
            modulusLength,
            publicKeyEncoding: keyEncoding,
            privateKeyEncoding: keyEncoding,
          },
          (err, publicKey, privateKey) => {
            if (err) reject(err);

            return resolve({ privateKey, publicKey });
          },
        );
      },
    );
  }

  /**
   * Generates a random string of the specified length.
   * @param {number} length - The length of the random string to generate.
   * @returns {string} The generated random string.
   */
  static generateRandomString(length: number): string {
    const randomString = crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex');

    return randomString.slice(0, length);
  }

  /**
   * Generates a UUID (Universally Unique Identifier).
   * @returns {string} The generated UUID.
   */
  static generateUuid(): string {
    return crypto.randomUUID();
  }
}
