import { StringUtil } from './string.util';

describe('StringUtil', () => {
  describe('emptyToNull', () => {
    test.each`
      input    | expected
      ${''}    | ${null}
      ${'1'}   | ${'1'}
      ${'abc'} | ${'abc'}
    `(
      'emptyToNull method with input $input returns $expected',
      ({ input, expected }) => {
        expect(StringUtil.emptyToNull(input)).toEqual(expected);
      },
    );
  });

  describe('escape', () => {
    test.each`
      input                        | expected
      ${'<div>'}                   | ${'&lt;div&gt;'}
      ${'3 > 2'}                   | ${'3 &gt; 2'}
      ${'https://example.com'}     | ${'https:&#47;&#47;example.com'}
      ${'C:\\Documents\\file.txt'} | ${'C:&#92;Documents&#92;file.txt'}
      ${'Hello World'}             | ${'Hello World'}
      ${''}                        | ${''}
    `(
      'escape method with input $input returns $expected',
      ({ input, expected }) => {
        expect(StringUtil.escape(input)).toEqual(expected);
      },
    );
  });

  describe('escapeSearchQuery', () => {
    test.each`
      input                        | expected
      ${'hello world'}             | ${'hello world'}
      ${'+-=&&||><!{}[]^"~*?:\\/'} | ${'\\+\\-\\=\\&&\\||\\>\\<\\!\\{\\}\\[\\]\\^\\"\\~\\*\\?\\:\\\\\\/'}
      ${''}                        | ${''}
    `(
      'escapeSearchQuery method with input $input returns $expected',
      ({ input, expected }) => {
        expect(StringUtil.escapeSearchQuery(input)).toEqual(expected);
      },
    );
  });

  describe('isNumber', () => {
    test.each`
      input        | expected
      ${1}         | ${true}
      ${0}         | ${true}
      ${-3.14}     | ${true}
      ${'42'}      | ${true}
      ${'0'}       | ${true}
      ${'abc'}     | ${false}
      ${true}      | ${false}
      ${false}     | ${false}
      ${null}      | ${false}
      ${undefined} | ${false}
      ${''}        | ${false}
      ${{}}        | ${false}
    `(
      'isNumber method with input $input returns $expected',
      ({ input, expected }) => {
        expect(StringUtil.isNumber(input)).toEqual(expected);
      },
    );
  });
});
