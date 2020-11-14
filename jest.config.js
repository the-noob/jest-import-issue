// can be extended at package level
// https://hackernoon.com/one-vs-many-why-we-moved-from-multiple-git-repos-to-a-monorepo-and-how-we-set-it-up-f4abb0cfe469
const vers = process.versions.node.split(".").map(Number);

if (vers[0] > 14) {
  console.warn(`
    You are not using the production / staging / test version of Node.
    Please use Node 14 to make sure that your tests still work on the test environment,
    in case you are using new ES features.
    Major version detected: ${vers[0]}
  `);
}

if (vers[0] < 14) {
  console.error(`
    You are not using the production / staging / test version of Node.
    Please upgrade to Node 14.
    Major version detected: ${vers[0]}
  `);
  process.exit(1);
}

module.exports = {
  setupFilesAfterEnv: ["./utils/jestSetup.js"],
  resetMocks: true,
  verbose: true,
  testEnvironment: "node",
  // Only test actual test files
  testMatch: ["**/__tests__/**/(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.history/"],
  reporters: [
    "default",
    ["jest-junit", { output: "reports/js-test-results.xml" }],
  ],
  collectCoverage: false,
  collectCoverageFrom: ["**/*.{js,jsx}", "!**/node_modules/**"],
  coverageReporters: ["json", "html"],
  coverageDirectory: "reports/coverage",
};
