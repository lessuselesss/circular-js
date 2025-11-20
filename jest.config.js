module.exports = {
    testEnvironment: 'jsdom',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    transform: {},
};
