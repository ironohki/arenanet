import {describe, expect, test} from '@jest/globals';
import {asyncForEach, alpha, beta, gamma, delta} from './2-asyncforeach';

describe('asyncronous for each', () => {
  test('runs alpha three times', async () => {
    const data = await asyncForEach([alpha, alpha, alpha]);
    expect(data).toBe('alpha > alpha > alpha > ');
  });

  test('runs alpha, runs beta, does not run alpha', async () => {
    const data = await asyncForEach([alpha, beta, alpha]);
    expect(data).toBe('alpha > beta |');
  });

  test('runs alpha, runs gamma, runs alpha', async () => {
    const data = await asyncForEach([alpha, gamma, alpha]);
    expect(data).toBe('alpha > gamma > alpha > ');
  },3000);

  test('runs alpha, runs delta, does not run alpha', async () => {
    const data = await asyncForEach([alpha, delta, alpha]);
    expect(data).toBe('alpha > delta |');
  },3000);

  test('runs several operations, runs no operations after the first escape operation', async () => {
    const data = await asyncForEach([alpha, gamma, alpha, gamma, delta, alpha, alpha, gamma, gamma]);
    expect(data).toBe('alpha > gamma > alpha > gamma > delta |');
  },5000);
});
