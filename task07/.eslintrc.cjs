module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    plugins: ['@typescript-eslint', 'react-refresh', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react-refresh/recommended',
        'plugin:prettier/recommended'
    ],
    ignorePatterns: ['node_modules'],
    rules: {}
}