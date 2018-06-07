const heavyDep1 = require('webpack')
const heavyDep2 = require('react')
const heavyDep3 = require('lodash')

it('print memory usage', () => {
  console.log(`${process.memoryUsage().heapUsed / 1024 ** 2} MB`)
})