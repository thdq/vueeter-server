const config = require('./jest.config')
const path = require('path')

config.testMatch = ['**/*.db.spec.ts']
config.testEnvironment = path.join(__dirname, 'prisma', 'prisma-test-environment.js')

module.exports = config