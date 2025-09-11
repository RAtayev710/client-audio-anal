export class B64UUtil {
  static fromBase64Url(b64u: string): string {
    return (
      b64u.replace(/-/g, '+').replace(/_/g, '/') +
      '='.repeat((4 - (b64u.length % 4)) % 4)
    );
  }

  static toBase64Url(b64: string): string {
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}
