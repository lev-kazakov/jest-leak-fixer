# Jest Memory Leak Fixer

Inspired by @Telokis [comment](https://github.com/facebook/jest/issues/6399#issuecomment-399888409) in [jest/issues/6399](https://github.com/facebook/jest/issues/6399).

Fixes leaks in: 
* [graceful-fs](https://github.com/isaacs/node-graceful-fs/blob/9ef21483f8ddfdb96bfc6e2855ecb49ede57681f/graceful-fs.js#L36-L54)
* [agent-base](https://github.com/TooTallNate/node-agent-base/blob/f892f87a6cb98137c10e14e40d914575e7f9c502/patch-core.js#L11-L37) (puppeteer dep)

PRs are welcome.

### Install
`yarn add --dev jest-leak-fixer`

### Apply
##### Via CLI
_package.json_
```javascript
{
  ...
  "scripts": {
    ...
    "test": "jest-fixer-apply; yarn test:detect-leaks; jest-fixer-restore",
    "test:detect-leaks": "jest --detectLeaks",
  }
}
```
##### Via `globalSetup`/`globalTeardown` configuration
_globalSetup.js_
```javascript
'use strict'
const jestLeakFixer = require('jest-leak-fixer')
...

module.exports = () => {
    jestLeakFixer.apply()
    ...
}
```

_globalTeardown.js_
```javascript
'use strict'
const jestLeakFixer = require('jest-leak-fixer')
...

module.exports = () => {
    ...
    jestLeakFixer.restore()
}
```