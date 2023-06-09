/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^(\\.{1,2}/.*)\\.js$": ["ts-jest"],
    },
    globalSetup: "./tests/setup.ts",
    globalTeardown: "./tests/teardown.ts",
};
