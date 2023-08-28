module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        indent: [
            'warn',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'warn',
            'single'
        ],
        semi: [
            'warn',
            'never'
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'import/no-anonymous-default-export': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off'
    }
}
