import type { Config } from 'jest'
import globalConfig from '../jest.config'

const config: Config = {
  ...globalConfig,
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests/integration'
  ]
}

export default config
