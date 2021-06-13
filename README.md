# better-wait

[![Deploy](https://github.com/mdovhopo/better-wait/workflows/build/badge.svg)](https://github.com/mdovhopo/better-wait/actions)
[![Coverage Status](https://coveralls.io/repos/github/mdovhopo/better-wait/badge.svg?branch=master)](https://coveralls.io/github/mdovhopo/better-wait?branch=master)

Convenient delay function with human friendly interface

Installation:

```sh
npm i better-wait
yarn add better-wait
```

## Usage

```ts
import { wait } from 'better-wait';

await wait('3s'); // use human readable values for delay
await wait(1000); // use milliseconds if you feel more like a machine
await wait('1 hour', { reject: true }); // promise will reject
await wait('1 year', { returnValue: 'your custom return value' }); // you can also return anything you want
```

Bootstrapped with: [create-ts-lib-gh](https://github.com/glebbash/create-ts-lib-gh)

This project is [Mit Licensed](LICENSE).
