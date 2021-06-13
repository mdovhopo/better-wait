import { performance } from 'perf_hooks';

import { wait } from './better-wait';

describe('wait', () => {
  it('fails, if duration value is invalid', async () => {
    await expect(wait('invalid')).rejects.toThrow(
      new TypeError(
        `[invalid] is not a valid time format, navigate docs for format help - https://www.npmjs.com/package/ms.`
      )
    );

    await expect(wait('-1h')).rejects.toThrow(
      new TypeError(`duration must be in a range [0-2147483647].`)
    );

    await expect(wait(-1)).rejects.toThrow(
      new TypeError(`duration must be in a range [0-2147483647].`)
    );

    await expect(wait(2147483648)).rejects.toThrow(
      new TypeError(`duration must be in a range [0-2147483647].`)
    );
  });

  it('resolves after delay', async () => {
    const start = performance.now();
    await expect(wait('3s')).resolves.toEqual(3000);
    const end = performance.now();
    const diff = start - end;
    expect(diff - 3000).toBeLessThan(10);
  });

  it('rejects after delay', async () => {
    const start = performance.now();
    await expect(wait('3s', { reject: true })).rejects.toEqual(3000);
    const end = performance.now();
    const diff = start - end;
    expect(diff - 3000).toBeLessThan(10);
  });

  it('returns custom return value', async () => {
    const resolvedValue = { resolved: 'value' };
    await expect(
      wait('0.5s', {
        returnValue: resolvedValue,
      })
    ).resolves.toEqual(resolvedValue);

    const error = new Error('error');
    await expect(
      wait('0.5s', {
        reject: true,
        returnValue: error,
      })
    ).rejects.toEqual(error);
  });
});
