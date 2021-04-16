module.export = {
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect', 
    '@testing-library/react/cleanup-after-each'
  ] // setupFiles before the tests are ran
};