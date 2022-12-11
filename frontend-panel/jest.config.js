module.exports = {
	roots: ["src"],
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
	},
	transform: {
		"\\.(js|jsx)?$": "babel-jest",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/fileTransformer.js",
	},
	testEnvironment: "jsdom",
	testMatch: ["**/(*.)test.{js, jsx}"],
	moduleFileExtensions: ["js", "jsx", "json", "node"],
	testPathIgnorePatterns: ["/node_modules/", "/public/"],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
	collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
	coverageReporters: ["html", "text", "text-summary", "cobertura"],
	globalSetup: "./dotenv-test.js",
};
