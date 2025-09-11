import { DateUtil } from './date.util';

describe('DateUtil', () => {
  describe('addMilliseconds', () => {
    test.each`
      input                         | milliseconds | expected
      ${'2023-03-31T11:00:00.000Z'} | ${1000}      | ${'2023-03-31T11:00:01.000Z'}
      ${'2023-03-31T11:00:00.000Z'} | ${20000}     | ${'2023-03-31T11:00:20.000Z'}
      ${'2023-03-31T11:00:00.000Z'} | ${86400000}  | ${'2023-04-01T11:00:00.000Z'}
    `(
      'addMilliseconds method with inputs $input and $milliseconds returns $expected',
      ({ input, milliseconds, expected }) => {
        expect(DateUtil.addMilliseconds(input, milliseconds)).toEqual(
          new Date(Date.parse(expected)),
        );
      },
    );
  });

  describe('addMonths', () => {
    test.each`
      input                         | months | expected
      ${'2023-03-31T11:00:00.000Z'} | ${1}   | ${'2023-04-30T11:00:00.000Z'}
      ${'2023-03-31T11:00:00.000Z'} | ${2}   | ${'2023-05-31T11:00:00.000Z'}
      ${'2023-03-31T11:00:00.000Z'} | ${3}   | ${'2023-06-30T11:00:00.000Z'}
    `(
      'addMonths method with inputs $input and $months returns $expected',
      ({ input, months, expected }) => {
        expect(DateUtil.addMonths(input, months)).toEqual(
          new Date(Date.parse(expected)),
        );
      },
    );
  });

  describe('diff', () => {
    test.each`
      from                          | to                            | expected
      ${'2023-03-31T11:00:00.000Z'} | ${'2023-04-30T11:00:00.000Z'} | ${2592000}
      ${'2023-03-31T11:00:00.000Z'} | ${'2023-05-31T11:00:00.000Z'} | ${5270400}
      ${'2023-03-31T11:00:00.000Z'} | ${'2023-06-30T11:00:00.000Z'} | ${7862400}
    `(
      'diff method with inputs $from and $to returns $expected',
      ({ from, to, expected }) => {
        expect(DateUtil.diff(from, to)).toEqual(expected);
      },
    );
  });

  describe('isSame', () => {
    test.each`
      inputA                        | inputB                        | expected
      ${'2023-06-10'}               | ${'2023-06-10'}               | ${true}
      ${'2023-03-11T19:00:00.000Z'} | ${'2023-03-12'}               | ${true}
      ${'2023-03-12T07:00:00.000Z'} | ${'2023-03-12'}               | ${false}
      ${'2023-06-10'}               | ${'2023-06-11'}               | ${false}
      ${'2023-06-11'}               | ${'2023-06-10'}               | ${false}
      ${'2023-06-12T11:00:00.000Z'} | ${'2023-06-11T11:00:00.000Z'} | ${false}
    `(
      'isSame method with inputs $inputA and $inputB returns $expected',
      ({ inputA, inputB, expected }) => {
        expect(DateUtil.isSame(inputA, inputB)).toEqual(expected);
      },
    );
  });

  describe('toDate', () => {
    test.each`
      input
      ${'2023-06-10T11:00:00.000Z'}
      ${'2023-12-21T02:45:00+08:00'}
    `('toDate method with input $input returns valid date', ({ input }) => {
      expect(DateUtil.toDate(input)).toEqual(new Date(Date.parse(input)));
    });
  });

  describe('toMs', () => {
    test.each`
      input   | expected
      ${'1d'} | ${86400000}
      ${'1h'} | ${3600000}
    `(
      'toMs method with input $input returns $expected',
      ({ input, expected }) => {
        expect(DateUtil.toMs(input)).toEqual(expected);
      },
    );
  });

  describe('toUnix', () => {
    test.each`
      input                          | expected
      ${'2023-06-10T11:00:00.000Z'}  | ${1686394800}
      ${'2020-12-21T02:45:00+08:00'} | ${1608489900}
    `(
      'toUnix method with input $input returns $expected',
      ({ input, expected }) => {
        expect(DateUtil.toUnix(input)).toEqual(expected);
      },
    );
  });
});
