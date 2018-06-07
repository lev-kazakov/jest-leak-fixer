const hugeDependency = require('./huge.json')

it('print memory usage', () => {
  console.log(`${process.memoryUsage().heapUsed / 1024 ** 2} MB`)
})