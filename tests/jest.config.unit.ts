import type { Config } from 'jest'
import globalConfig from '../jest.config'

const config: Config = {
  ...globalConfig,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/unit',
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*service*.ts',
    '<rootDir>/src/modules/**/*controller*.ts'
  ],
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests/unit'
  ]
}

export default config
