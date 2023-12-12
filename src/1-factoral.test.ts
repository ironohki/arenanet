import {describe, expect, test} from '@jest/globals';
import {factoral} from './1-factoral';

describe('factoral function', () => {
  test('returns factoral of 1 as 1', () => {
    expect(factoral(1)).toBe(1);
  });
  test('returns factoral of 0 as 1', () => {
    expect(factoral(0)).toBe(1);
  });
  test('returns factoral of 3 as 6', () => {
    expect(factoral(3)).toBe(6);
  });
  test('returns factoral of 10 as 3628800', () => {
    expect(factoral(10)).toBe(3628800);
  });
  test('returns input of -5 to be invalid, indicated as -1', () => {
    expect(factoral(-5)).toBe(-1);
  });
  test('returns input of a string to be invalid, indicated as -1', () => {
    expect(factoral('Hello')).toBe(-1);
  });
  test('returns input of no value to be invalid, indicated as -1', () => {
    expect(factoral()).toBe(-1);
  });
});

