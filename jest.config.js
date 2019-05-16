const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
	"preset": "react-native",
	"testRegex": "(/__tests__/.*| (\\.| /)(test|spec))\\.(ts?|tsx?)$",
	"transform": {
		"^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
		"^.+\\.tsx?$": "ts-jest"
	},
	"moduleFileExtensions": [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
	],
	"roots": [
		"<rootDir>"
	],
	"modulePathIgnorePatterns": ["<rootDir>/example"],
	"globals": {
		"ts-jest": {
			"tsConfig": "./tsconfig.json"
		}
	},
	"moduleNameMapper": pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
	"modulePaths": [
		"<rootDir>"
	],
	"testEnvironment": "jsdom",
	"setupFiles": [
		"./setupTests.ts"
	],
	"setupFilesAfterEnv": ["<rootDir>/setupTests.ts"]
};
