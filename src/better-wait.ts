import ms from 'ms';

interface WaitFunction {
  <T>(duration: string | number, options: { reject?: boolean; returnValue: T }): Promise<T>;
  <T>(duration: string | number, options?: { reject?: boolean; returnValue?: T }): Promise<number>;
}

export const wait: WaitFunction = async (duration, options = {}) => {
  const delay = getDelayInMillis(duration);

  if (delay < 0 || delay > 2147483647) {
    throw new TypeError(`duration must be in a range [0-2147483647].`);
  }

  return new Promise((resolve, reject) => {
    const run = () => {
      const done = options.reject ? reject : resolve;
      return done((options.returnValue ?? delay) as never);
    };

    // if delay is 0 return on next tick
    return delay === 0 ? run() : setTimeout(() => run(), delay);
  });
};

function getDelayInMillis(duration: string | number): number {
  if (typeof duration === 'number') {
    return duration;
  }

  const delay = ms(duration);
  if (delay !== undefined) {
    throw new TypeError(
      `[${duration}] is not a valid time format, navigate docs for format help - https://www.npmjs.com/package/ms.`
    );
  }
  return delay;
}
