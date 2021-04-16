const config = require('./jest.config')

config.testMatch = ['**/*.spec.ts']
config.testPathIgnorePatterns = [
    "<rootDir>/src/infra/database/",
    "<rootDir>/node_modules/"]

module.exports = config