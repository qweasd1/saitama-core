module.exports = {
  // preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: "node",
  "testRegex": "/test/.*Test[.]ts$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
};
