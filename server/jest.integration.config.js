let config = require('./jest.config')
const path = require('path')

config.testMatch = ['**/*.test.ts']
config.testEnvironment = path.join(__dirname, 'prisma', 'prisma-test-environment.js')

module.exports = config
