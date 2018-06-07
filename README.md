# Jest memory leak
When running on node. Tested against:
* jest 23.0.1
* node 8.7.0

Suspecting a leak in [jest-runtime's](https://github.com/facebook/jest/blob/00a8117fd3df64e876041776c29b71fb9749efbb/packages/jest-runtime/src/index.js#L271) module registry.

### 1. Build
`yarn`

### 2. Run yarn
`yarn jest`

(you will see `process.memoryUsage().heapUsed` increasing)

### 3. Run jasmine
`yarn jasmine`

(you will see `process.memoryUsage().heapUsed` is stable)