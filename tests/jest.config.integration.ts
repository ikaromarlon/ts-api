import type { Config } from 'jest'
import globalConfig from '../jest.config'

const config: Config = {
  ...globalConfig,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/integration',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.ts'
  ],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests/integration'
  ]
}

export default config
