// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  globalSetup: "<rootDir>/test/setup",
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "test-results/jest", outputName: "results.xml" },
    ],
  ],
  testEnvironment: "node",
};
