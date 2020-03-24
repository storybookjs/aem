module.exports = {
  cacheDirectory: '.cache/jest',
  clearMocks: true,
  collectCoverageFrom: ['app/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: '.coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  roots: ['<rootDir>/app'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};
