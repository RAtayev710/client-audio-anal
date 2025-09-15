import { HashUtil } from './hash.util';

describe('HashUtil', () => {
  describe('generateHash', () => {
    it('Should be correct', () => {
      const randomString = HashUtil.generateRandomString(16);

      expect(HashUtil.generateHash(randomString)).toMatch(/^[0-9a-fA-F]{32}$/);
      expect(HashUtil.generateHash(randomString)).toBe(
        HashUtil.generateHash(randomString),
      );
    });
  });

  describe('generateRandomString', () => {
    it('Should be correct', () => {
      const length = Math.round(Math.random() * 100) + 1;
      const randomString = HashUtil.generateRandomString(length);

      expect(randomString.length).toBe(length);
      expect(randomString).not.toBe(HashUtil.generateRandomString(length));
    });
  });

  describe('generateRandomString', () => {
    it('Should be correct', () => {
      const uuid = HashUtil.generateUuid();

      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
      expect(uuid).not.toBe(HashUtil.generateUuid());
    });
  });
});
