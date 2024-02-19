import type { Config } from 'jest'
import globalConfig from '../jest.config'

const config: Config = {
  ...globalConfig,
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests/integration'
  ],
  collectCoverage: false,
  coverageDirectory: '<rootDir>/coverage/integration',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.ts',
    '<rootDir>/src/modules/**/*.ts'
  ]
}

export default config
