module.exports = {
  moduleFileExtensions: [
    'js',
    'json'
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleDirectories: [
      "node_modules",
  ],
  snapshotSerializers: [
  ]
}