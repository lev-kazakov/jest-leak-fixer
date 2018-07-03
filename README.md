# Jest Memory Leak Fixer

Inspired by @Telokis [comment](https://github.com/facebook/jest/issues/6399#issuecomment-399888409) in [jest/issues/6399](https://github.com/facebook/jest/issues/6399).

### Install
`yarn add --dev jest-leak-fixer`

### Apply
##### Via CLI
_package.json_
```json
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