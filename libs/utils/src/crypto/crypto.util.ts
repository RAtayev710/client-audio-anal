export class CryptoUtil {
  static decryptId(id: string) {
    try {
      let base64 = id
        .replace(/-/g, '+') // - → +
        .replace(/_/g, '/'); // _ → /

      // добавить недостающий padding
      while (base64.length % 4) {
        base64 += '=';
      }

      const decodedBuffer = Buffer.from(base64, 'base64');
      const decodedUuid = decodedBuffer.toString('hex');
      return decodedUuid.replace(
        /(.{8})(.{4})(.{4})(.{4})(.{12})/,
        '$1-$2-$3-$4-$5',
      );
    } catch (error: unknown) {
      console.log(error);

      throw new Error('Invalid id provided.');
    }
  }

  static encryptId(id: string) {
    const buffer = Buffer.from(id.replace(/-/g, ''), 'hex');
    return buffer
      .toString('base64')
      .replace(/\+/g, '-') // + → -
      .replace(/\//g, '_') // / → _
      .replace(/=+$/, '');
  }
}
