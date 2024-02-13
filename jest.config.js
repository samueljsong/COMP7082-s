/** @type {import('jest').Config} */
const config = {
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
  coverageThreshold: {
    global: {
      lines: 50,
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

module.exports = config;
