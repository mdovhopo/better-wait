import ms from 'ms';

export interface WaitOptions<T> {
  returnValue?: T;
  reject?: boolean;
}

export async function wait<T = number>(
  duration: string | number,
  options: WaitOptions<T> = {}
): Promise<T> {
  let delay = duration;
  if (typeof duration === 'string') {
    delay = ms(duration);
    if (!delay) {
      throw new TypeError(
        `[${duration}] is not a valid time format, navigate docs for format help - https://www.npmjs.com/package/ms.`
      );
    }
  }
  if (delay < 0 || delay > 2147483647) {
    throw new TypeError(`duration must be in a range [0-2147483647].`);
  }
  return new Promise((resolve, reject) => {
    const run = () => {
      const done = options.reject ? reject : resolve;
      if (options.returnValue) {
        return done(options.returnValue);
      }
      // @ts-expect-error if no returnValue is provided, T will default to number,
      // and function will return number, ts does not like my idea though...
      return done(delay);
    };
    // return on net tick instead of waiting for timers to complete
    if (delay === 0) {
      return run();
    }
    setTimeout(() => run(), delay as number);
  });
}
