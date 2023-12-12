import {describe, expect, test} from '@jest/globals';
import {objectify} from './3-objectify';

describe('objectify function', () => {
  test('creates an object from a string', () => {
    expect(objectify('alpha.beta.gamma')).toStrictEqual({'alpha':{'beta':{'gamma':{}}}});
  });
  test('creates an object from a string', () => {
    expect(objectify('alpha.beta.gamma.epsilon')).toStrictEqual({'alpha':{'beta':{'gamma':{'epsilon':{}}}}});
  });
  test('creates an object from a string, skipping invalid string segmants', () => {
    expect(objectify('alpha..beta.gamma')).toStrictEqual({'alpha':{'beta':{'gamma':{}}}});
  });
});

