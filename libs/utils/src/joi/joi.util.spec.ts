import { ConfigToken } from '@lib/common/enums';
import { JoiConfig } from '@lib/config';

import { JoiUtil } from './joi.util';

describe('JoiUtil', () => {
  const config: JoiConfig<
    { admin: string; superadmin: string; user: string },
    string
  > = {
    user: { value: 'user', joi: JoiUtil.schema.string() },
    admin: { value: 'admin', joi: JoiUtil.schema.string() },
    superadmin: { value: 'superadmin', joi: JoiUtil.schema.string() },
  };

  describe('extractByPropName', () => {
    it('Should be correct', () => {
      const result = JoiUtil.extractByPropName(config, 'joi');

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('admin');
      expect(result).toHaveProperty('superadmin');

      expect(JoiUtil.extractByPropName(config, 'value')).toStrictEqual({
        user: 'user',
        admin: 'admin',
        superadmin: 'superadmin',
      });
    });
  });

  describe('validate', () => {
    it('Should be correct', () => {
      expect(JoiUtil.validate(ConfigToken.APP, config)).toStrictEqual({
        user: 'user',
        admin: 'admin',
        superadmin: 'superadmin',
      });
    });

    it('Should throw an error', () => {
      const invalidConfig: JoiConfig<
        { admin: string; superadmin: string; user: string },
        string
      > = {
        user: { value: 'user', joi: JoiUtil.schema.string() },
        admin: { value: 'admin', joi: JoiUtil.schema.string() },
        superadmin: { value: 'superadmin', joi: JoiUtil.schema.number() },
      };

      expect(() => JoiUtil.validate(ConfigToken.APP, invalidConfig)).toThrow(
        new Error(
          'Wrong "app.superadmin" variable; Value: "superadmin" is invalid. "superadmin" must be a number',
        ),
      );
    });
  });
});
