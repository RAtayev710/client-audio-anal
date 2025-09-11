import crypto from 'crypto';

import { CryptoUtil } from './crypto.util';

describe('CryptoUtil', () => {
  describe('encrypt', () => {
    it('Should be correct', () => {
      const str = crypto.randomUUID();
      const encrypted = CryptoUtil.encryptId(str);

      expect(CryptoUtil.decryptId(encrypted)).toEqual(str);
    });
  });
});
