module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // Point to the setup file instead of the module directly
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
  testPathIgnorePatterns: ["/node_modules/"],
  // Add clear mapping for the module
  moduleNameMapper: {
    "^@testing-library/jest-dom$": "<rootDir>/node_modules/@testing-library/jest-dom",
  },
}
